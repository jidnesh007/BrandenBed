import express from "express";
import Payment from "../models/Payment.js";

const router = express.Router();

// GET /api/payments - Get all payments
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch payments",
      error: error.message,
    });
  }
});

// POST /api/payments - Create new payment
router.post("/", async (req, res) => {
  try {
    const payment = new Payment(req.body);
    const savedPayment = await payment.save();

    res.status(201).json({
      success: true,
      data: savedPayment,
      message: "Payment created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create payment",
      error: error.message,
    });
  }
});

// PUT /api/payments/:id - Update payment
router.put("/:id", async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.json({
      success: true,
      data: payment,
      message: "Payment updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update payment",
      error: error.message,
    });
  }
});

export default router;
