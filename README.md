# 🚀 Task Tracker Pro

<p align="center">
  A Modern Full-Stack Task Management Application built with the MERN Stack.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/Database-MongoDB-darkgreen?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/State-Redux_Toolkit-purple?style=for-the-badge&logo=redux" />
  <img src="https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css" />
</p>

---

## ✨ Overview

Task Tracker Pro is a full-stack productivity application that allows users to efficiently manage their daily tasks with authentication, prioritization, filtering, and analytics.

---

# 🖥️ Frontend

<details>
<summary>Click to expand Frontend Details</summary>

---

## 🎨 Tech Stack

- React (Vite)
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS

---

## ✅ Features

- Add, Edit, Delete Tasks
- Mark Task as Completed / Pending
- Due Date Support
- Priority Levels
- Categories
- Drag & Drop Reordering
- Search Tasks
- Filter by Status / Priority / Category
- Dark Mode
- Toast Notifications
- Fully Responsive UI

---

## 📂 Folder Structure

```
src/
 ├── app/
 ├── features/
 ├── components/
 ├── pages/
 ├── services/
 └── utils/
```

---

## ⚙️ Setup Frontend

```bash
cd client
npm install
npm run dev
```

</details>

---

# 🛠️ Backend

<details>
<summary>Click to expand Backend Details</summary>

---

## 🔧 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt (Password Hashing)

---

## 🔐 Authentication Features

- User Registration
- User Login
- JWT-based Authentication
- Protected Routes
- Persistent Sessions

---

## 📝 API Endpoints

### Auth Routes

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile
```

### Task Routes

```
GET     /api/tasks
POST    /api/tasks
PUT     /api/tasks/:id
DELETE  /api/tasks/:id
PATCH   /api/tasks/:id/toggle
```

---

## 📂 Folder Structure

```
server/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middleware/
 ├── config/
 └── server.js
```

---

## ⚙️ Setup Backend

```bash
cd server
npm install
npm run dev
```

Create `.env` file inside `server/`

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

</details>

---

## 📸 Screenshots

_Add your screenshots here_

---

## 👨‍💻 Author

**Aditya Pandey**  
MERN Stack Developer

GitHub: https://github.com/Aditya-Pandey7

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!
