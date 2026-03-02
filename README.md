# 🛠️ Admin Dashboard (React + Vite)

A modern Admin Dashboard built using React and Vite.  
This project includes authentication, category management, and product management features.

🚀 Live Demo: (Add Netlify/Vercel link here if deployed)

---

## 📖 Features

- 🔐 Login Authentication
- 🔒 Protected Routes (Private Routing)
- 📦 Product Management
  - Add Product
  - Update Product
  - View Product
  - Product List
- 🗂️ Category Management
  - Add Category
  - Update Category
  - View Category
  - Category List
- 🧭 Sidebar Navigation
- 📊 Dashboard Layout with Topbar
- ⚡ Fast performance using Vite

---

## 🛠️ Tech Stack

- React.js
- Vite
- React Router
- CSS
- JavaScript (ES6+)

---

## 📁 Project Structure
src/
├── components/
│ ├── pages/
│ │ ├── AddCategory.jsx
│ │ ├── AddProduct.jsx
│ │ ├── CategoryList.jsx
│ │ ├── CategoryView.jsx
│ │ ├── Login.jsx
│ │ ├── PrivateRoute.jsx
│ │ ├── ProductList.jsx
│ │ ├── ProductView.jsx
│ │ ├── UpdateCategory.jsx
│ │ ├── UpdateProduct.jsx
│ │ ├── Sidebar.jsx
│ │ └── Topbar.jsx
├── App.jsx
├── main.jsx


---

## 🔐 Authentication Flow

- User logs in
- Token or login state stored
- PrivateRoute component restricts unauthorized access
- Redirects to Login if not authenticated

---

## 🚀 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/abhishekmourya739-beep/Dashboard.git

Install dependencies:

npm install

Run the project:

npm run dev
