import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Import routes
import propertyRoutes from "./routes/properties.js";
import paymentRoutes from "./routes/payments.js";
import employeeRoutes from "./routes/employees.js";

// Load environment variables
dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Add logging middleware to see all requests
app.use((req, res, next) => {
  console.log(`📍 ${req.method} ${req.path}`);
  next();
});

// MongoDB Connection - REMOVED deprecated options
const mongoURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/BrandenBeds";

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "🚀 BrandenBeds API is running...",
    version: "1.0.0",
    endpoints: {
      properties: "/api/properties",
      test: "/api/properties/test",
    },
  });
});

// Mount the properties routes
app.use("/api/properties", propertyRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/employees", employeeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

// 404 handler - MUST be last
app.use((req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📍 API Endpoints available:`);
  console.log(`   - GET  http://localhost:${PORT}/`);
  console.log(`   - GET  http://localhost:${PORT}/api/properties`);
  console.log(`   - POST http://localhost:${PORT}/api/properties`);
});
