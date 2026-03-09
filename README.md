<div align="center">

<img src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop" alt="CODECELIX Banner" width="100%" style="border-radius: 12px;" />

<br/>
<br/>

# ⚡ CODECELIX

### Next-Generation AI-Powered SaaS Agency Platform

_Built from scratch with the MERN Stack — zero UI component libraries_

<br/>

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

<br/>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](https://opensource.org/licenses/MIT)
![Status](https://img.shields.io/badge/Status-Complete-brightgreen?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-blue?style=flat-square)

</div>

---

## 📌 Table of Contents

- Overview
- Live Demo
- Screenshots
- Tech Stack
- Features
- Project Structure
- Installation
- API Endpoints
- Environment Variables
- Author

---

## 🧠 Overview

**CODECELIX** is a production-ready, full-stack SaaS agency website built entirely with the MERN stack. It includes a complete **Content Management System (CMS)**, **JWT authentication**, **role-based access control**, and a fully custom UI designed with **TailwindCSS** — without any component library.

> 💡 This project was built as part of a real-world internship to simulate how modern SaaS agencies manage their digital presence and client content.

---

## 🚀 Live Demo

> 🔗 **Coming Soon — Deployment in Progress**

---

## 📸 Screenshots

<div align="center">

|                                           🏠 Home Page                                           |                                       📊 Admin Dashboard                                       |                                           📝 Blog CMS                                            |
| :----------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------: |
| ![Home](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop) | ![Admin](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop) | ![Blog](https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&auto=format&fit=crop) |

</div>

---

## 🛠️ Tech Stack

### 🖥️ Frontend

- ⚛️ React.js
- ⚡ Vite
- 🎨 TailwindCSS
- 🔀 React Router v6
- 📡 Axios
- 🎯 Lucide React Icons

### ⚙️ Backend

- 🟢 Node.js
- 🚂 Express.js
- 🍃 MongoDB
- 🦦 Mongoose
- 🔑 JSON Web Token (JWT)
- 🔒 Bcrypt.js
- 🌱 Dotenv
- 🔄 Nodemon
- 🌐 CORS

---

## ✨ Features

### 🔐 Authentication & Security

- User Registration & Login
- JWT-based authentication
- Protected frontend & backend routes
- Role-based access control (**Admin / User**)
- Persistent login session
- Password hashing with Bcrypt.js

### 📝 Blog CMS

- Create, Read, Update, Delete blogs
- Custom URL slug
- Publish / Unpublish control
- Blog search & category filtering

### 🛠️ Services Management

- CRUD services
- Custom SVG icon system
- Dynamic service detail pages

### 🎨 UI / UX

- Dark Mode / Light Mode
- Fully responsive design
- Custom SVG icons
- Smooth CSS animations

### 📊 Admin Dashboard

- Blog management
- Services management
- Contact messages
- Waitlist subscribers

---

## 📁 Project Structure

codecelix/
│
├── frontend/
│ ├── components/
│ ├── pages/
│ ├── context/
│ └── App.jsx
│
└── backend/
├── models/
├── routes/
├── middleware/
└── server.js

---

## ⚙️ Installation & Setup

### Clone Repository

git clone https://github.com/university472/codecelix.git
cd codecelix

### Backend Setup

cd backend
npm install

Create .env file

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret

Run backend

npm run dev

### Frontend Setup

cd ../frontend
npm install
npm run dev

---

## 🔗 API Endpoints

### Auth

POST /api/auth/register
POST /api/auth/login
GET /api/auth/me

### Blogs

GET /api/blogs
GET /api/blogs/:slug
POST /api/blogs
PUT /api/blogs/:id
DELETE /api/blogs/:id

### Services

GET /api/services
GET /api/services/:slug
POST /api/services
PUT /api/services/:id
DELETE /api/services/:id

### Contact

POST /api/contact
GET /api/contact

---

## 🌍 Environment Variables

backend/.env

PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

⚠️ Never commit .env files to GitHub.

---

# 👨‍💻 Author

<div align="center">

### **Umer Javaid**

Full-Stack Developer | MERN Stack Specialist

🌐 GitHub
https://github.com/university472

💼 LinkedIn
https://www.linkedin.com/in/umer-javaid-41805425b/

</div>

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

⭐ If you found this project useful, please give it a star!

Made with ❤️ by **Umer Javaid**

</div>
