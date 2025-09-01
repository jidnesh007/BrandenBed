import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    propertyName: {
      type: String,
      required: true,
    },
    tenant: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentType: {
      type: String,
      required: true,
      enum: ["UPI", "Bank Transfer", "Card", "Cash"],
    },
    transactionId: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Paid", "Pending", "Failed"],
      default: "Pending",
    },
    note: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Payment", paymentSchema);
