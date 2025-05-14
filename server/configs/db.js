import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () =>
      console.log("✅ Database Connected")
    );

    // 🚫 DO NOT append anything to the URI
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};

export default connectDB;
