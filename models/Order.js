import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Order', orderSchema);
