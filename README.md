Codecelix - Futuristic MERN Stack Agency Platform
Codecelix is a high-performance, full-stack web application designed for modern tech agencies. Built with the MERN stack (MongoDB, Express, React, Node.js), it features a sophisticated Service Management system, a dynamic Blogging Engine, and a comprehensive Admin Dashboard for complete content control.

Key Features
Dynamic Blogging System: Read, search, and filter articles by category with a cinematic user interface.

Service Showcase: Display agency expertise with dedicated service detail pages and interactive layouts.

Advanced Admin Dashboard: Full CRUD (Create, Read, Update, Delete) capabilities for blogs and services.

Smart Image Logic: Supports both external URLs (e.g., Unsplash) and local server uploads automatically.

Secure Authentication: JWT-based login and registration system with protected admin routes.

Futuristic UI/UX: Dark-themed, glassmorphic design built with Tailwind CSS and Framer Motion-style transitions.

Responsive Design: Fully optimized for mobile, tablet, and desktop viewing.

Tech Stack
Frontend:

React.js (Library)

Tailwind CSS (Styling)

Lucide React (Iconography)

React Router DOM (Navigation)

React Hot Toast (Notifications)

Backend:

Node.js & Express.js (Server)

MongoDB & Mongoose (Database)

JWT (Security)

Multer (Media Handling)

Installation & Setup
1. Clone the Repository
Bash
git clone https://github.com/your-username/codecelix.git
cd codecelix
2. Backend Configuration
Navigate to the backend directory and install dependencies:

Bash
cd backend
npm install
Create a .env file in the backend folder and add:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
Start the backend server:

Bash
npm run dev
3. Frontend Configuration
Navigate to the frontend directory and install dependencies:

Bash
cd ../frontend
npm install
Start the development server:

Bash
npm run dev
Project Structure
Plaintext
codecelix/
├── backend/
│   ├── controllers/    # Request handling logic
│   ├── models/         # MongoDB schemas (Blog, Service, User)
│   ├── routes/         # API endpoint definitions
│   ├── middleware/     # Auth & Error handling
│   └── uploads/        # Local storage for images
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components (Navbar, Footer, etc.)
│   │   ├── pages/      # Public pages & Admin views
│   │   ├── hooks/      # Custom React hooks (useApi)
│   │   └── api/        # Axios configuration
└── README.md
