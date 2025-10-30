# BookIt: Experiences & Slots

A fullstack travel booking web application to explore, select, and book travel experiences with dynamic slots.  
Built as an assignment to demonstrate strong React, Node.js, MongoDB, and API integration skills with production-ready UI.

---

## 🌟 Live Demo

**Frontend:** [https://bookit-frontend-travel-app.vercel.app](https://bookit-frontend-travel-app.vercel.app)  
**Backend API:** [https://book-it-travel-app.vercel.app](https://book-it-travel-app.vercel.app)

- **NOTE**: Must refresh if you face any error.
---

## 📦 Project Structure

```
bookit-frontend/ # React + TypeScript + TailwindCSS SPA
bookit-backend/ # Node.js + Express + MongoDB REST API
```


- **bookit-frontend**: Implements pixel-perfect Figma-based UI for Home, Details, Checkout, Result flows. Responsive across all devices.
- **bookit-backend**: REST API to manage experiences, slot bookings, payments, and promo code validation.

---

## 🚀 Features

- **Browse Experiences:** Home page lists travel experiences fetched dynamically from the backend.
- **Detailed View:** See experience details, available dates, and selectable slots.
- **Booking Checkout:** Fill booking form, apply promo codes, and review price summaries.
- **Booking Result:** Confirm or fail bookings with clear feedback, reference ID, and easy navigation.
- **Fully Responsive & Accessible:** Mobile-first, dark mode-ready, semantic markup.
- **Form Validation:** All inputs (name, email, date, slots) are validated with instant feedback.
- **Prevents Double-Booking:** Robust logic ensures no user can book the same slot twice.
- **Royalty-Free Images:** Integrated from Unsplash or Pexels for demo content.
- **End-to-End Integration:** Seamless experience from browsing to confirmation.

---

## 🛠️ Tech Stack

**Frontend:**  
- [React](https://react.dev) with [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com), [Axios](https://axios-http.com/)
- [Vite](https://vitejs.dev)
- Responsive implementation from [Figma](#) designs

**Backend:**  
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com)
- RESTful API endpoints: experiences, bookings, promo validation
- CORS enabled for frontend-backend communication

---

## 📂 Setup & Installation

### 1. Clone the Repo
```
git clone https://github.com/Rugwed01/bookit-project.git
cd bookit-project
```


### 2. Backend Setup
```
cd bookit-backend
npm install

Set up MongoDB connection in .env (see .env.example)
npm run dev

Optional: Seed demo data
node data/seed.js
```


### 3. Frontend Setup
```
cd bookit-frontend
npm install
npm run dev
```


- Visit `http://localhost:3000` (or `5173`) for frontend; backend runs on `http://localhost:5001`
- Set environment variables (`.env`) as needed for local or cloud deployment

---

## 📝 Usage

- **Browse experiences** and select date/slot.
- **Book an experience** through checkout form.
- **Enter promo code** for discounts (<code>SAVE10</code>, <code>FLAT100</code> etc).
- **View booking result** with confirmation, reference ID, and "Back to Home" navigation.

---

## 🌐 Deployment

This project is [live on Vercel](https://vercel.com/).  

## ⚙️ API Reference

### Experiences
- `GET /experiences` – Get all experiences
- `GET /experiences/:id` – Get details, available slots

### Bookings
- `POST /bookings` – Book slot, validate, prevent double booking

### Promo Codes
- `POST /promo/validate` – Validate code, return discount

See [bookit-backend/README.md](bookit-backend) for more info.

---

## 🎨 Design

All designs inspired by [Figma](https://figma.com/)  
Strictly matches the assignment spec and mobile-first UX/UI principles.

---

## 👨‍💻 Author & Credits

- **Developed by:** [Rugwed Yawalkar](https://github.com/Rugwed01)
- Images from [Unsplash](https://unsplash.com) & [Pexels](https://www.pexels.com)
- Special thanks to [Cursor](https://cursor.so), [Bolt.new](https://bolt.new), [Gemini](https://gemini.google.com)

## 🗒️ Additional Notes

- Prevents double-booking: Backend ensures no slot is confirmed twice for same user.
- Uses TailwindCSS utility classes strictly (no custom CSS).
- Fully dynamic and ready for deployment or further development.
