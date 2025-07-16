/**
 * @fileoverview Tests for Sweet model
 * @description Test suite for Sweet model validation and functionality
 */

const Sweet = require("../../src/models/Sweet");

describe("Sweet Model", () => {
  describe("Sweet creation", () => {
    test("should create a sweet with valid data", () => {
      const sweetData = {
        name: "Kaju Katli",
        category: "Nut-Based",
        price: 50,
        quantity: 20,
      };

      const sweet = new Sweet(sweetData);

      expect(sweet.name).toBe("Kaju Katli");
      expect(sweet.category).toBe("Nut-Based");
      expect(sweet.price).toBe(50);
      expect(sweet.quantity).toBe(20);
      expect(sweet.id).toBeDefined();
    });

    test("should throw error when name is missing", () => {
      const sweetData = {
        category: "Nut-Based",
        price: 50,
        quantity: 20,
      };

      expect(() => new Sweet(sweetData)).toThrow("Sweet name is required");
    });

    test("should throw error when price is negative", () => {
      const sweetData = {
        name: "Kaju Katli",
        category: "Nut-Based",
        price: -10,
        quantity: 20,
      };

      expect(() => new Sweet(sweetData)).toThrow("Price must be positive");
    });
  });
});
