# She Can Foundation - Web Application

A full-stack web application built for the She Can Foundation as an internship assignment. This project features a responsive frontend built with React and Tailwind CSS, and a Node.js backend using Express and MongoDB.

## 🌟 Key Features & Enhancements
- **Volunteer Registration:** Comprehensive form collecting personal info, location (City & State), and interests.
- **Admin Dashboard:** Secure admin panel to view all volunteer applications in a data table.
- **Data Visualization:** Interactive pie and bar charts in the admin dashboard built with `recharts` to visualize applicant demographics.
- **Animations:** Smooth scroll animations and page transitions using `framer-motion`.
- **Animated Stats:** Number counters counting up upon scroll using `react-countup`.
- **Interactive Gallery:** Swipeable image carousel using `swiper`.
- **Global Reach Map:** Interactive vector map highlighting supported locations using `react-simple-maps`.

## 💻 Tech Stack
- **Frontend:** React (Vite), Tailwind CSS, Framer Motion, Swiper, React Simple Maps, Recharts.
- **Backend:** Node.js, Express.js, Mongoose, CORS, dotenv.
- **Database:** MongoDB Atlas (Cloud).

---

## 🚀 How to Run Locally (For Reviewers)

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- A MongoDB Atlas connection string (or local MongoDB instance).

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/?appName=Cluster0
   ADMIN_USER=admin
   ADMIN_PASS=password123
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies (using `--legacy-peer-deps` due to React 19):
   ```bash
   npm install --legacy-peer-deps
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to the local URL provided by Vite (usually `http://localhost:5173`).

---

## ☁️ Deployment Guide

### 1. Deploy Database (MongoDB Atlas)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2. Build an **M0 Free** Cluster.
3. Under **Database Access**, create a user (save the password!).
4. Under **Network Access**, allow access from anywhere (`0.0.0.0/0`).
5. Click **Connect** on your cluster, select "Drivers" (Node.js), and copy the connection string.

### 2. Deploy Backend (Render.com)
1. Push your code to a GitHub repository.
2. Go to [Render.com](https://render.com) and log in with GitHub.
3. Click **New +** and select **Web Service**.
4. Connect your GitHub repository.
5. Setup the service:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Expand **Advanced** and add Environment Variables:
   - `MONGODB_URI`: (Paste your Atlas connection string here)
   - `ADMIN_USER`: `admin`
   - `ADMIN_PASS`: `password123`
7. Click **Create Web Service**. Render will give you a live URL (e.g., `https://shecan-api.onrender.com`).

### 3. Deploy Frontend (Vercel.com)
1. In your `frontend/src/api/axios.js` file, make sure the `baseURL` points to your new Render backend URL instead of `localhost`. 
2. Go to [Vercel](https://vercel.com) and log in with GitHub.
3. Click **Add New...** -> **Project**.
4. Import your GitHub repository.
5. Set the **Framework Preset** to Vite.
6. Set the **Root Directory** to `frontend`.
7. Click **Deploy**.

Congratulations! Your full-stack application is now live on the internet!
