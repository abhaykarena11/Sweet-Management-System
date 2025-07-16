/**
 * @fileoverview Main Express application
 * @description Sweet Shop Management System API
 */

const express = require("express");
const SweetShopService = require("./services/SweetShopService");

const app = express();

// Middleware
app.use(express.json());

// Service instance
const sweetShopService = new SweetShopService();

/**
 * Error handling middleware
 * @param {Error} err - Error object
 * @param {express.Request} req - Express request
 * @param {express.Response} res - Express response
 * @param {express.NextFunction} next - Next middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal server error",
  });
};

// Routes
app.post("/api/sweets", (req, res, next) => {
  try {
    const sweet = sweetShopService.addSweet(req.body);
    res.status(201).json({
      success: true,
      data: sweet,
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

app.get("/api/sweets", (req, res, next) => {
  try {
    const sweets = sweetShopService.getAllSweets();
    res.json({
      success: true,
      data: sweets,
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/sweets/search", (req, res, next) => {
  try {
    const { name, category } = req.query;
    let results = [];

    if (name) {
      results = sweetShopService.searchByName(name);
    } else if (category) {
      results = sweetShopService.searchByCategory(category);
    } else {
      results = sweetShopService.getAllSweets();
    }

    res.json({
      success: true,
      data: results,
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/sweets/:name/purchase", (req, res, next) => {
  try {
    const { name } = req.params;
    const { quantity } = req.body;

    const result = sweetShopService.purchaseSweet(name, quantity);
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

app.post("/api/sweets/:name/restock", (req, res, next) => {
  try {
    const { name } = req.params;
    const { quantity } = req.body;

    const result = sweetShopService.restockSweet(name, quantity);
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

app.delete("/api/sweets/:name", (req, res, next) => {
  try {
    const { name } = req.params;
    const deleted = sweetShopService.deleteSweet(name);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: "Sweet not found",
      });
    }

    res.json({
      success: true,
      message: "Sweet deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;
