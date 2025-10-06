🛒 Dedestore — React Frontend for Laravel E-Commerce API

Dedestore is a React-based frontend developed during Bootcamp to connect with a Laravel E-Commerce backend API.
It demonstrates how modern React applications interact with REST APIs to perform CRUD operations, manage authentication, and handle image uploads — all within a responsive, user-friendly interface.

🧠 Overview

This project was built as the frontend companion to a Laravel-powered e-commerce backend.
It enables vendors to add, view, and manage products while connecting to the backend via HTTP requests (fetch API).

The project also emphasizes:

State management with React Hooks (useState)

API integration

Image validation and upload

Error handling and dynamic UI updates

Clean modular components and reusable layouts

This was a major step in learning full-stack development, combining backend API design with frontend integration.

⚙️ Core Features

🧾 Product Management

Create new products using an interactive form.

Upload and preview product images before submission.

Automatic field validation and inline error messages.

📸 Image Upload & Validation

Supports JPG, JPEG, and PNG formats.

Prevents upload of files larger than 5MB.

Previews image immediately using URL.createObjectURL.

🔄 API Integration

Connects to Laravel backend via fetch() POST request.

Sends product data (name, description, prices, category, quantity, and vendor ID).

Displays success and error messages dynamically based on API response.

🔐 Vendor Integration

Captures vendor information from localStorage (stored on login).

Associates each product with its respective vendor (vendor_id).

💅 Responsive UI with MDB React UI Kit

Uses MDB React UI Kit (Material Design for Bootstrap) components for styling.

Clean, responsive layout optimized for both desktop and mobile.

🧩 Tech Stack

Layer	Technology

Frontend Framework	React 18

UI Library	MDB React UI Kit

Language	JavaScript (ES6+)

Routing	React Router DOM 

Backend API	Laravel (localhost:8000)

Package Manager	npm / yarn

Build Tool	Vite or Create React App

📁 Project Structure


dedestore-front/

│

├── public/                # Static assets

├── src/

│   ├── Assets/            # Images and icons

│   ├── components/        # Shared UI components (e.g., Header, Footer)

│   ├── pages/             # Product, Login, Dashboard, etc.

│   ├── App.js             # Main app router and layout

│   ├── index.js           # Entry point

│   ├── setupTests.js      # Test setup (Jest)

│   ├── reportWebVitals.js # Performance tracking

│
├── .gitignore

├── package.json

├── package-lock.json

├── README.md


🚀 Getting Started

🧰 Prerequisites

Node.js (v16+)

npm or yarn

Backend running on http://localhost:8000 (Laravel API)

⚙️ Installation

Clone the Repository

git clone https://github.com/tmp-cloud7/dedestore-front.git

cd dedestore-front


Install Dependencies

npm install


Start the Development Server

npm start


Your app should now run at
👉 http://localhost:3000

Connect to Backend

Make sure your Laravel backend API is running on
http://localhost:8000/api/

🔗 API Endpoint Example

Add Product

await fetch("http://localhost:8000/api/addproduct", {
  method: "POST",
  body: formData,
});


Form Data Includes:

formData.append("product_name", productName);

formData.append("product_desc", productDesc);

formData.append("initial_price", productInitialPrice);

formData.append("selling_price", productSellingPrice);

formData.append("quantity", productQuantity);

formData.append("category", productCategory);

formData.append("product_image", file);

formData.append("vendor_id", vendor_id);

🧠 Bootcamp Learning Outcomes:

How to build and structure a React application.

How to use React Hooks for managing form states.

How to connect React to a Laravel REST API.

Handling file uploads and image previews in React.

Validating user inputs and managing error states.

Building responsive UIs using MDB React UI Kit.

📸 Screens & Components

Component	Description

Header	Top navigation bar with brand and menu links

Product Page	Vendor product upload form

Dashboard	List of products with CRUD operations

Login / Register	Vendor authentication (connected to Laravel backend)


🧰 Tools Used

VS Code – Code editor

Git & GitHub – Version control

Postman – API testing

Chrome DevTools – Debugging frontend requests

MDB React UI Kit – Styling and UI components

🏁 Conclusion

The Dedestore project represents a practical exercise in React-Laravel integration, showing how frontend and backend communicate in a full-stack application.
It demonstrates essential frontend skills like state management, data validation, and REST API communication — making it a solid foundation for larger e-commerce applications.
