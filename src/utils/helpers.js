/**
 * @fileoverview Helper functions for Sweet Shop
 * @description Contains utility functions used across the project
 */

/**
 * Produces a unique identifier for a sweet based on timestamp and randomness
 * @returns {string} Unique ID
 */
function generateUniqueId() {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}

/**
 * Capitalizes the first letter of each word (e.g., Kaju Katli)
 * @param {string} str - The input string
 * @returns {string} - Title-cased string
 */
function toTitleCase(str) {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Checks whether a number is positive
 * @param {number} num
 * @returns {boolean}
 */
function isPositiveNumber(num) {
  return typeof num === "number" && num >= 0;
}

module.exports = {
  generateUniqueId,
  toTitleCase,
  isPositiveNumber,
};
