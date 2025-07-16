/**
 * @fileoverview Sweet Shop Service for business logic
 * @description Service class handling sweet shop operations
 */

const Sweet = require("../models/Sweet");

class SweetShopService {
  /**
   * Creates a new SweetShopService instance
   */
  constructor() {
    this.sweets = new Map();
  }

  /**
   * Adds a new sweet to the shop
   * @param {Object} sweetData - Sweet data to add
   * @returns {Sweet} The created sweet
   * @throws {Error} When sweet already exists
   */
  addSweet(sweetData) {
    const existingSweet = this.findSweetByName(sweetData.name);

    if (existingSweet) {
      throw new Error("Sweet with this name already exists");
    }

    const sweet = new Sweet(sweetData);
    this.sweets.set(sweet.id, sweet);

    return sweet;
  }

  /**
   * Retrieves all sweets from the shop
   * @returns {Array<Sweet>} Array of all sweets
   */
  getAllSweets() {
    return Array.from(this.sweets.values());
  }

  /**
   * Finds a sweet by its name
   * @param {string} name - Name to search for
   * @returns {Sweet|undefined} Found sweet or undefined
   */
  findSweetByName(name) {
    return this.getAllSweets().find(
      (sweet) => sweet.name.toLowerCase() === name.toLowerCase()
    );
  }

  /**
   * Searches sweets by name (partial match)
   * @param {string} searchTerm - Search term
   * @returns {Array<Sweet>} Matching sweets
   */
  searchByName(searchTerm) {
    return this.getAllSweets().filter((sweet) =>
      sweet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  /**
   * Searches sweets by category
   * @param {string} category - Category to search for
   * @returns {Array<Sweet>} Matching sweets
   */
  searchByCategory(category) {
    return this.getAllSweets().filter(
      (sweet) => sweet.category.toLowerCase() === category.toLowerCase()
    );
  }

  /**
   * Purchases a sweet from the shop
   * @param {string} sweetName - Name of sweet to purchase
   * @param {number} quantity - Quantity to purchase
   * @returns {Object} Purchase result
   * @throws {Error} When sweet not found or insufficient stock
   */
  purchaseSweet(sweetName, quantity) {
    const sweet = this.findSweetByName(sweetName);

    if (!sweet) {
      throw new Error("Sweet not found");
    }

    if (sweet.quantity < quantity) {
      throw new Error("Insufficient stock available");
    }

    sweet.updateQuantity(sweet.quantity - quantity);

    return {
      success: true,
      remainingQuantity: sweet.quantity,
      purchasedQuantity: quantity,
    };
  }

  /**
   * Restocks a sweet in the shop
   * @param {string} sweetName - Name of sweet to restock
   * @param {number} quantity - Quantity to add
   * @returns {Object} Restock result
   * @throws {Error} When sweet not found
   */
  restockSweet(sweetName, quantity) {
    const sweet = this.findSweetByName(sweetName);

    if (!sweet) {
      throw new Error("Sweet not found");
    }

    sweet.updateQuantity(sweet.quantity + quantity);

    return {
      success: true,
      newQuantity: sweet.quantity,
    };
  }

  /**
   * Deletes a sweet from the shop
   * @param {string} sweetName - Name of sweet to delete
   * @returns {boolean} True if deleted, false if not found
   */
  deleteSweet(sweetName) {
    const sweet = this.findSweetByName(sweetName);

    if (!sweet) {
      return false;
    }

    this.sweets.delete(sweet.id);
    return true;
  }
}

module.exports = SweetShopService;
