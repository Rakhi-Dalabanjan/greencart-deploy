import express from 'express';
import { loginDeliveryPerson, registerDeliveryPerson, isAuth, getAssignedOrders, markOrderAsDelivered } from '../controllers/deliverysController.js';
import authUser from '../middlewares/authUser.js';

const deliveryRouter = express.Router();

// Login route for delivery person
deliveryRouter.post('/login', loginDeliveryPerson);
deliveryRouter.post('/register', registerDeliveryPerson);
deliveryRouter.post('/mark-delivered', markOrderAsDelivered);
deliveryRouter.get('/is-auth', authUser, isAuth);
deliveryRouter.get('/orders/:user_id', getAssignedOrders)

export default deliveryRouter;
