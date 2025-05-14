import mongoose from "mongoose";

const deliveryPersonSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  isIdle: { type: Boolean, required: true, default: true },
});

const DeliveryPerson = mongoose.models.DeliveryPerson || mongoose.model('DeliveryPerson', deliveryPersonSchema)

export default DeliveryPerson
