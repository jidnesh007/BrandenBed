import express from "express";
import Employee from "../models/Employee.js";

const router = express.Router();

// GET /api/employees - Get all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find({ isActive: true }).sort({
      createdAt: -1,
    });
    res.json({
      success: true,
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch employees",
      error: error.message,
    });
  }
});

// POST /api/employees - Create new employee
router.post("/", async (req, res) => {
  try {
    const employee = new Employee(req.body);
    const savedEmployee = await employee.save();

    res.status(201).json({
      success: true,
      data: savedEmployee,
      message: "Employee created successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create employee",
      error: error.message,
    });
  }
});

// PUT /api/employees/:id - Update employee
router.put("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.json({
      success: true,
      data: employee,
      message: "Employee updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update employee",
      error: error.message,
    });
  }
});

// DELETE /api/employees/:id - Delete employee (soft delete)
router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.json({
      success: true,
      message: "Employee removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove employee",
      error: error.message,
    });
  }
});

export default router;
