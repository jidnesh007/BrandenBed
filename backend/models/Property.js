import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    rent: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ["Vacant", "Occupied", "Maintenance"],
      default: "Vacant",
    },
    tenant: {
      type: String,
      trim: true,
      default: null,
    },
    lastPayment: {
      type: Date,
      default: null,
    },
    notes: {
      type: String,
      trim: true,
      maxLength: 1000,
    },
    photos: [
      {
        type: String, // URLs of uploaded images
      },
    ],
    photo: {
      type: String, // Main photo URL for backward compatibility
      default:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=870&q=80",
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
propertySchema.index({ status: 1 });
propertySchema.index({ rent: 1 });
propertySchema.index({ name: "text", location: "text", tenant: "text" });

export default mongoose.model("Property", propertySchema);
