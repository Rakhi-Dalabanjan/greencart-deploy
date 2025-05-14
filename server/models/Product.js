
// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: Array, required: true },
//     price: { type: Number, required: true },
//     offerPrice: { type: Number, required: true },
//     image: { type: Array, required: true },
//     category: { type: String, required: true },
//     inStock: { type: Boolean, default: true },

//     // New fields for delivery tracking:
//     assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "DeliveryPerson" },
//     delivered: { type: Boolean, default: false }

// }, { timestamps: true });

// const Product = mongoose.models.product || mongoose.model('product', productSchema);

// export default Product;


import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: Array, required: true },
  price: { type: Number, required: true },
  offerPrice: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  inStock: { type: Boolean, default: true },

  // Delivery tracking
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "DeliveryPerson" },
  delivered: { type: Boolean, default: false },

  // Expiry date
  expiryDate: { type: Date, required: true },
}, { timestamps: true });

const Product = mongoose.models.product || mongoose.model('product', productSchema);

export default Product;
