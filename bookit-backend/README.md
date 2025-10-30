# BookIt - Travel Booking API

This is the backend server for the BookIt web application, built with Node.js, Express, and MongoDB. It provides a RESTful API for managing travel experiences, slots, and user bookings.

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v16 or later)
* [MongoDB](https://www.mongodb.com/try/download/community) (running locally or a connection string)

### Setup & Installation

1.  **Clone the repository:**
    ```sh
    git clone <https://github.com/Rugwed01/bookIt-travel-app>
    cd bookit-backend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Create your environment file:**
    Create a `.env` file in the root of the project and add your configuration:
    ```
    PORT=5001
    MONGO_URI=mongodb://username:password@host1:port1,host2:port2/database?option1=value1&option2=value2
    ```

### Running the Application

1.  **Start the server:**
    ```sh
    npm start
    ```

2.  **Run in development mode (with hot-reloading):**
    ```sh
    npm run dev
    ```
    The server will be available at `http://localhost:5001`.

3.  **Seed the database (Optional):**
    To populate the database with sample experiences, slots, and promo codes, run:
    ```sh
    npm run seed
    ```

## 📜 API Endpoints

All endpoints are prefixed with `/api`.

### Experiences

#### `GET /api/experiences`
Returns a list of all available experiences with basic info.
* **Response (200 OK):**
    ```json
    {
      "success": true,
      "data": [
        {
          "_id": "60d...",
          "title": "Paris Eiffel Tower Summit Tour",
          "price": 120,
          "thumbnailUrl": "https://...",
          "location": "Paris, France",
          "duration": "3 hours"
        }
      ]
    }
    ```

#### `GET /api/experiences/:id`
Returns the full details for a single experience, including a list of its available (i.e., not full and in the future) slots.
* **Response (200 OK):**
    ```json
    {
      "success": true,
      "data": {
        "_id": "60d...",
        "title": "Paris Eiffel Tower Summit Tour",
        "description": "...",
        "price": 120,
        "imageUrls": ["..."],
        "slots": [
          {
            "_id": "60e...",
            "experience": "60d...",
            "startTime": "2025-10-30T10:00:00.000Z",
            "totalCapacity": 20,
            "bookedCount": 5
          }
        ]
      }
    }
    ```

### Bookings

#### `POST /api/bookings`
Creates a new booking. This endpoint validates slot availability and prevents double-booking.
* **Request Body:**
    ```json
    {
      "userEmail": "customer@example.com",
      "userName": "John Doe",
      "experienceId": "60d...",
      "slotId": "60e...",
      "numberOfGuests": 2
    }
    ```
* **Response (201 Created):**
    ```json
    {
      "success": true,
      "message": "Booking confirmed!",
      "data": {
        "_id": "60f...",
        "userEmail": "customer@example.com",
        "bookingReference": "BKT-A1B2C3D4",
        "totalPrice": 240,
        "status": "confirmed",
        ...
      }
    }
    ```
* **Response (409 Conflict):** (If slot is full)
    ```json
    {
      "success": false,
      "message": "Not enough capacity for this slot. Please try a different slot or fewer guests."
    }
    ```

### Promo Codes

#### `POST /api/promo/validate`
Validates a promo code and returns its discount details.
* **Request Body:**
    ```json
    {
      "code": "SAVE10"
    }
    ```
* **Response (200 OK):**
    ```json
    {
      "success": true,
      "isValid": true,
      "data": {
        "code": "SAVE10",
        "discountType": "percentage",
        "discountValue": 10
      }
    }
    ```
* **Response (404 Not Found):** (If code is invalid or expired)
    ```json
    {
      "success": false,
      "isValid": false,
      "message": "Invalid or expired promo code"
    }
    ```
