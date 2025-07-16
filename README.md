# Sweet Shop Management System

A Test-Driven Development (TDD) implementation of a sweet shop management system built with Node.js and Express.js.

## Features

- ✅ Add new sweets to inventory
- ✅ View all available sweets
- ✅ Search sweets by name or category
- ✅ Purchase sweets (with stock validation)
- ✅ Restock sweets
- ✅ Delete sweets from inventory
- ✅ Comprehensive error handling
- ✅ Full test coverage

## API Endpoints


## Installation and Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run tests: `npm test`
4. Start development server: `npm run dev`
5. Start production server: `npm start`

## Testing

The project follows TDD principles with comprehensive test coverage:

- Unit tests for models and services
- Integration tests for API endpoints
- Error handling tests
- Edge case testing



### POST /api/sweets
Add a new sweet to the shop.

**Request Body:**



### GET /api/sweets
Retrieve all sweets in the shop.

### GET /api/sweets/search
Search sweets by name or category.

**Query Parameters:**
- `name` - Search by sweet name
- `category` - Search by category

### POST /api/sweets/:name/purchase
Purchase a specific quantity of sweets.

**Request Body:**



### POST /api/sweets/:name/restock
Restock a sweet with additional quantity.

**Request Body:**



### DELETE /api/sweets/:name
Delete a sweet from the inventory.


## Development Workflow

This project was built following strict TDD principles:

1. Write failing tests first (Red)
2. Write minimal code to pass tests (Green)
3. Refactor code while keeping tests passing (Refactor)
4. Repeat for each feature

## Technologies Used

- Node.js
- Express.js
- Jest (Testing Framework)
- Supertest (HTTP testing)
