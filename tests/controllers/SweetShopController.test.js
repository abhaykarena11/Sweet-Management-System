/**
 * @fileoverview Tests for SweetShopController
 * @description Test suite for HTTP endpoints
 */

const request = require("supertest");
const app = require("../../src/app");

describe("SweetShop API", () => {
  describe("POST /api/sweets", () => {
    test("should create a new sweet", async () => {
      const sweetData = {
        name: "Rasgulla",
        category: "Milk-Based",
        price: 15,
        quantity: 30,
      };

      const response = await request(app)
        .post("/api/sweets")
        .send(sweetData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe("Rasgulla");
    });

    test("should return 400 for invalid data", async () => {
      const invalidData = {
        name: "",
        category: "Milk-Based",
        price: -5,
        quantity: 30,
      };

      const response = await request(app)
        .post("/api/sweets")
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
    });
  });

  describe("GET /api/sweets", () => {
    test("should retrieve all sweets", async () => {
      const response = await request(app).get("/api/sweets").expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });
});
