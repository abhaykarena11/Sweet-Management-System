/**
 * @fileoverview Tests for SweetShopService
 * @description Test suite for sweet shop business logic
 */

const SweetShopService = require("../../src/services/SweetShopService");

describe("SweetShopService", () => {
  let sweetShopService;

  beforeEach(() => {
    sweetShopService = new SweetShopService();
  });

  describe("Adding sweets", () => {
    test("should add a sweet to the shop", () => {
      const sweetData = {
        name: "Gulab Jamun",
        category: "Milk-Based",
        price: 10,
        quantity: 50,
      };

      const result = sweetShopService.addSweet(sweetData);

      expect(result).toBeDefined();
      expect(result.name).toBe("Gulab Jamun");
      expect(sweetShopService.getAllSweets()).toHaveLength(1);
    });

    test("should not add sweet with duplicate name", () => {
      const sweetData = {
        name: "Gulab Jamun",
        category: "Milk-Based",
        price: 10,
        quantity: 50,
      };

      sweetShopService.addSweet(sweetData);

      expect(() => sweetShopService.addSweet(sweetData)).toThrow(
        "Sweet with this name already exists"
      );
    });
  });

  describe("Searching sweets", () => {
    beforeEach(() => {
      sweetShopService.addSweet({
        name: "Kaju Katli",
        category: "Nut-Based",
        price: 50,
        quantity: 20,
      });

      sweetShopService.addSweet({
        name: "Gulab Jamun",
        category: "Milk-Based",
        price: 10,
        quantity: 50,
      });
    });

    test("should search sweets by name", () => {
      const results = sweetShopService.searchByName("Kaju");

      expect(results).toHaveLength(1);
      expect(results[0].name).toBe("Kaju Katli");
    });

    test("should search sweets by category", () => {
      const results = sweetShopService.searchByCategory("Milk-Based");

      expect(results).toHaveLength(1);
      expect(results[0].category).toBe("Milk-Based");
    });
  });

  describe("Purchasing sweets", () => {
    beforeEach(() => {
      sweetShopService.addSweet({
        name: "Kaju Katli",
        category: "Nut-Based",
        price: 50,
        quantity: 20,
      });
    });

    test("should purchase sweet when stock is available", () => {
      const result = sweetShopService.purchaseSweet("Kaju Katli", 5);

      expect(result.success).toBe(true);
      expect(result.remainingQuantity).toBe(15);
    });

    test("should throw error when insufficient stock", () => {
      expect(() => sweetShopService.purchaseSweet("Kaju Katli", 25)).toThrow(
        "Insufficient stock available"
      );
    });
  });
});
