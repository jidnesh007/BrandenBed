import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
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
    role: {
      type: String,
      required: true,
      enum: ["Admin", "Manager", "Staff"],
      default: "Staff",
    },
    department: {
      type: String,
      trim: true,
    },
    permissions: [
      {
        type: String,
        enum: [
          "View Properties",
          "Edit Properties",
          "Manage Tenants",
          "Approve Payments",
          "Manage Employees",
          "View Reports",
        ],
      },
    ],
    joiningDate: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Employee", employeeSchema);
