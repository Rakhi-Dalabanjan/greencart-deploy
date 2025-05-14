// import cookieParser from 'cookie-parser';
// import express from 'express';
// import cors from 'cors';
// import connectDB from './configs/db.js';
// import 'dotenv/config';
// import userRouter from './routes/userRoute.js';
// import sellerRouter from './routes/sellerRoute.js';
// import connectCloudinary from './configs/cloudinary.js';
// import productRouter from './routes/productRoute.js';
// import cartRouter from './routes/cartRoute.js';
// import addressRouter from './routes/addressRoute.js';
// import orderRouter from './routes/orderRoute.js';
// import { stripeWebhooks } from './controllers/orderController.js';

// const app = express();
// const port = process.env.PORT || 4000;

// await connectDB()
// await connectCloudinary()

// // Allow multiple origins
// // const allowedOrigins = ['http://localhost:5173', '']
// const allowedOrigins = ['http://localhost:5173'];  


// app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks)

// // Middleware configuration
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({origin: allowedOrigins, credentials: true}));


// app.get('/', (req, res) => res.send("API is Working"));
// app.use('/api/user', userRouter)
// app.use('/api/seller', sellerRouter)
// app.use('/api/product', productRouter)
// app.use('/api/cart', cartRouter)
// app.use('/api/address', addressRouter)
// app.use('/api/order', orderRouter)

// app.listen(port, ()=>{
//     console.log(`Server is running on http://localhost:${port}`)
// })





import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebhooks } from './controllers/orderController.js';
import deliveryRouter from './routes/deliveryRoute.js';
import "./cron/cronj.js"

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB database
await connectDB();

// Connect to Cloudinary for file management (if you're using Cloudinary)
await connectCloudinary();

// Define allowed origins for CORS (You can update this list)
const allowedOrigins = ['http://localhost:5173', 'http://your-production-url.com']; 

// Stripe Webhook for handling payments
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

// Middleware configuration
app.use(express.json());
app.use(cookieParser());

// Set up CORS policy allowing the specified origins
app.use(cors({
  origin: allowedOrigins,
  credentials: true // Allow cookies to be sent with requests
}));

// Test route to check if the API is working
app.get('/', (req, res) => res.send("API is Working"));

// Define API routes
app.use('/api/user', userRouter);        // User authentication and management
app.use('/api/seller', sellerRouter);    // Seller authentication and management
app.use('/api/product', productRouter);  // Product-related routes (like listing products)
app.use('/api/cart', cartRouter);        // Cart-related actions (add/update/remove items)
app.use('/api/address', addressRouter);  // Address-related routes (for shipping, etc.)
app.use('/api/order', orderRouter);      // Order-related actions (place/view orders)
app.use('/api/delivery', deliveryRouter); 

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
