/**
 * @fileoverview Sweet model for managing sweet items
 * @description Model class for representing sweet items in the shop
 */

class Sweet {
  /**
   * Creates a new Sweet instance
   * @param {Object} sweetData - The sweet data
   * @param {string} sweetData.name - Name of the sweet
   * @param {string} sweetData.category - Category of the sweet
   * @param {number} sweetData.price - Price of the sweet
   * @param {number} sweetData.quantity - Quantity in stock
   * @throws {Error} When validation fails
   */
  constructor({ name, category, price, quantity }) {
    this.validateInput({ name, category, price, quantity });

    this.id = this.generateUniqueId();
    this.name = name;
    this.category = category;
    this.price = price;
    this.quantity = quantity;
  }

  /**
   * Validates input data for sweet creation
   * @param {Object} data - Input data to validate
   * @throws {Error} When validation fails
   * @private
   */
  validateInput({ name, category, price, quantity }) {
    if (!name || typeof name !== "string") {
      throw new Error("Sweet name is required");
    }

    if (price < 0) {
      throw new Error("Price must be positive");
    }

    if (quantity < 0) {
      throw new Error("Quantity must be positive");
    }
  }

  /**
   * Generates a unique ID for the sweet
   * @returns {string} Unique identifier
   * @private
   */
  generateUniqueId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Updates the quantity of the sweet
   * @param {number} newQuantity - New quantity value
   * @throws {Error} When quantity is negative
   */
  updateQuantity(newQuantity) {
    if (newQuantity < 0) {
      throw new Error("Quantity cannot be negative");
    }
    this.quantity = newQuantity;
  }

  /**
   * Checks if sweet is available in stock
   * @returns {boolean} True if available, false otherwise
   */
  isAvailable() {
    return this.quantity > 0;
  }
}

module.exports = Sweet;
