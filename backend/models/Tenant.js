import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      default: null,
    },
    leaseStartDate: {
      type: Date,
    },
    leaseEndDate: {
      type: Date,
    },
    securityDeposit: {
      type: Number,
      default: 0,
    },
    emergencyContact: {
      name: String,
      phone: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Tenant", tenantSchema);
