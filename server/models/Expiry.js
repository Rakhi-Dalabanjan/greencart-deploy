import mongoose from 'mongoose';

const expiryScheduleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: String,
  quantity: Number,
  expiresOn: Date, // Calculated or assumed expiry date
  notified: { type: Boolean, default: false } // For tracking if reminder was sent
}, { timestamps: true });

export default mongoose.models.ExpirySchedule || mongoose.model('ExpirySchedule', expiryScheduleSchema);
