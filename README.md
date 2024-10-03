<!-- My React Shopping Cart Project

This is a React and Node.js based application that implements a shopping cart with product management functionality. The app fetches products from a backend API, allows users to search, add, edit, and delete products, and provides a cart system with live updates on the total number of items.
Features

    Product Search: Search for products dynamically by name from the search bar.
    Add/Edit Products: Admin can add or edit products with fields such as name, description, price, quantity, and image URL.
    Product List: Display a list of all available products fetched from the backend.
    Cart Management: Users can add items to the cart and the cart count is updated dynamically in the navbar.
    Update/Delete Products: Admin can update product details and delete products.
    Responsive Design: The app is responsive and works well on different screen sizes.

Tech Stack
Frontend:

    React: Handles the UI and state management.
    Fetch API: For fetching product data from the backend.
    Axios: For making API requests to edit products.
    TailwindCSS: For styling and responsive design.
    daisyUI: For responsive react components.

Backend:

    Node.js: Backend server for handling API requests.
    MongoDB: Database used to store product and cart information.
    Express: Web framework for routing and handling requests.


Installation and Setup

To run the project locally, follow these steps:


Clone the Repository

git clone https://github.com/your-username/my-react-project.git
cd my-react-project


Install Dependencies

Make sure you have Node.js and npm installed. Then install the project dependencies for both frontend and backend.

Install Backend Dependencies:

cd backend
npm install


Install Frontend Dependencies:

cd frontend
npm install


Setup Environment Variables

Create a .env file in the backend folder with the following variables:

PORT=5000
MONGO_URI=<Your MongoDB Connection URI>


Seed the Products' Dummy Data into Database

See the scripts in package.json, run the command for seederScript.js

npm run seeder


Start the Backend Server

cd backend
npm run server

Start the Frontend Development Server

cd frontend
npm run client

Start Backend Server and Frontend Concurrently

cd ..
npm run dev




API Endpoints
Products API

    GET /api/products: Fetch all products.
    PUT /api/products/product/:id: Update a product by its ID.
    DELETE /api/products/product/:id: Delete a product by its ID.

Cart API

    GET /api/cart: Fetch the current cart items.
    POST /api/cart: Add a new item to the cart.
    DELETE /api/cart/:id: Remove an item from the cart.

Folder Structure

├── backend                # Backend server and API
│   ├── models             # MongoDB models
│   ├── routes             # API routes
│   └── server.js          # Express server setup
├── frontend               # React frontend
│   ├── components         # Reusable components like Navbar, CartItem, etc.
│   ├── pages              # Main pages like Home.js, ProductDetail.js
│   ├── App.js             # Main entry point for the React app
│   └── index.js           # App rendering
└── README.md              # Project documentation


Future Improvements

    Add user authentication for admin and users.
    Implement pagination for product lists.
    Add more advanced filtering options in the product search.
    Improve cart functionality by adding quantity management for each product. -->