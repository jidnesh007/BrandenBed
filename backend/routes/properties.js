import express from "express";
import Property from "../models/Property.js";

const router = express.Router();

// Test route to verify router is working
router.get("/test", (req, res) => {
  res.json({ message: "Properties routes are working!" });
});

// GET /api/properties - Get all properties
router.get("/", async (req, res) => {
  try {
    console.log("📝 GET /api/properties called");

    const properties = await Property.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: properties,
      message: "Properties fetched successfully",
    });
  } catch (error) {
    console.error("❌ Error fetching properties:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
      error: error.message,
    });
  }
});

// GET /api/properties/:id - Get single property
router.get("/:id", async (req, res) => {
  try {
    console.log(`📝 GET /api/properties/${req.params.id} called`);

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.json({
      success: true,
      data: property,
      message: "Property fetched successfully",
    });
  } catch (error) {
    console.error("❌ Error fetching property:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch property",
      error: error.message,
    });
  }
});

// POST /api/properties - Create new property
router.post("/", async (req, res) => {
  try {
    console.log("📝 POST /api/properties called with data:", req.body);

    const propertyData = {
      ...req.body,
      rent: Number(req.body.rent),
      lastPayment: req.body.lastPayment ? new Date(req.body.lastPayment) : null,
    };

    const property = new Property(propertyData);
    const savedProperty = await property.save();

    console.log("✅ Property saved:", savedProperty);

    res.status(201).json({
      success: true,
      data: savedProperty,
      message: "Property created successfully",
    });
  } catch (error) {
    console.error("❌ Error creating property:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create property",
      error: error.message,
    });
  }
});

// PUT /api/properties/:id - Update property
router.put("/:id", async (req, res) => {
  try {
    console.log(
      `📝 PUT /api/properties/${req.params.id} called with data:`,
      req.body
    );

    const updateData = {
      ...req.body,
      rent: Number(req.body.rent),
      lastPayment: req.body.lastPayment ? new Date(req.body.lastPayment) : null,
    };

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    console.log("✅ Property updated:", property);

    res.json({
      success: true,
      data: property,
      message: "Property updated successfully",
    });
  } catch (error) {
    console.error("❌ Error updating property:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update property",
      error: error.message,
    });
  }
});

// DELETE /api/properties/:id - Delete property
router.delete("/:id", async (req, res) => {
  try {
    console.log(`📝 DELETE /api/properties/${req.params.id} called`);

    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    console.log("✅ Property deleted:", property.name);

    res.json({
      success: true,
      message: "Property deleted successfully",
      data: property,
    });
  } catch (error) {
    console.error("❌ Error deleting property:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete property",
      error: error.message,
    });
  }
});

export default router;
