import DeliveryPerson from '../models/DeliveryPerson.js';  // Import the model
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/User.js";
import Order from '../models/Order.js'
import Address from '../models/Address.js';
import Product from '../models/Product.js';
import ExpirySchedule from '../models/Expiry.js';

// Controller for logging in a delivery person
export const loginDeliveryPerson = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the delivery person exists in the database
    const deliveryPerson = await DeliveryPerson.findOne({ email });

    // If the delivery person is not found, send a 404 error
    if (!deliveryPerson) {
      return res.status(404).json({ success: false, message: 'Delivery person not found' });
    }

    // Compare the password entered by the user with the hashed password in the database
    const isMatch = await bcrypt.compare(password, deliveryPerson.password);

    // If the password does not match, send a 400 error
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // If the credentials match, generate a JWT token
    const token = jwt.sign({ id: deliveryPerson._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return a success response with the JWT token
    return res.json({ success: true, token, user: deliveryPerson });
  } catch (error) {
    // Catch any errors and return a 500 error
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Controller for registering a delivery person (if needed)
export const registerDeliveryPerson = async (req, res) => {
  const { name, email, password, isIdle } = req.body;

  try {
    // Check if the email is already in use
    const existingDeliveryPerson = await DeliveryPerson.findOne({ email });
    if (existingDeliveryPerson) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new delivery person
    const newDeliveryPerson = new DeliveryPerson({
      name,
      email,
      password: hashedPassword,
      isIdle
    });

    // Save the new delivery person to the database
    await newDeliveryPerson.save();

    // Return a success message
    return res.status(201).json({ success: true, message: 'Delivery person registered successfully' });
  } catch (error) {
    // Catch any errors and return a 500 error
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const isAuth = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId).select("-password")
    return res.json({ success: true, user })

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

export const getAssignedOrders = async (req, res) => {
  const { user_id } = req.params;

  try {
    const orders = await Order.find({ deliveryPersonId: user_id, isDelivered: false });

    if (orders.length === 0) {
      return res.status(200).json({ success: false, message: "No orders found for this delivery person" });
    }

    const enrichedOrders = await Promise.all(
      orders.map(async (order) => {
        const addrDetails = await Address.findById(order.address);
        return {
          ...order.toObject(),
          addrDetails,
        };
      })
    );

    return res.json({ success: true, orders: enrichedOrders });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const markOrderAsDelivered = async (req, res) => {
  const { orderId } = req.body;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Update order
    order.status = "Delivered";
    order.isDelivered = true;
    if (order.paymentType === "COD") order.isPaid = true;
    await order.save();

    // Mark delivery person as idle
    const deliveryPerson = await DeliveryPerson.findById(order.deliveryPersonId);
    if (deliveryPerson) {
      deliveryPerson.isIdle = "true";
      await deliveryPerson.save();
    }

    // For each product in order, create expiry schedule
    for (const item of order.items) {
      const product = await Product.findById(item.product);
      if (!product) continue;

      await ExpirySchedule.create({
        userId: order.userId,
        orderId: order._id,
        productId: product._id,
        productName: product.name,
        quantity: item.quantity,
        expiresOn: product.expiryDate,
      });
    }

    return res.json({ success: true, message: "Order marked as delivered, expiry schedules created" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};