# InkPress — Modern Editorial & Publishing Platform

A full-stack modern publishing and storytelling web application built with **React 19, Node.js, Express, MongoDB Atlas, and Tailwind CSS**. InkPress delivers a calm, luxury reading experience combined with creator tools, interactive discussions, and real-time community engagement.

---

## ✨ Features

### 📖 Reader & Editorial Experience
- **Boxed Reading Layout**: Framed glassmorphic container with ambient background glow, elegant typography, and distraction-free formatting.
- **Dynamic Search & Filtering**: Instant client-side search across titles, summaries, content, and authors, plus category pill filters (*Technology, Design, Productivity, Lifestyle, Engineering, Writing*).
- **Interactive Likes**: One-click heart like toggle with bounce micro-animations, optimistic UI updates, and real-time like counts.
- **Discussion & Comments**: Full comment section with author profile avatars, formatted timestamps, and delete controls for comment authors.
- **Related Stories**: Discover next reads from the publication automatically.

### ✍️ Creator & Publishing Tools
- **Rich Blog Publishing**: Compose articles with title, category, excerpt summary, and full formatted story body.
- **Media Uploads**: Built-in image uploader with live local preview and cloud storage powered by **Cloudinary**.
- **Auth Guard**: Client-side and server-side route protection ensuring only authenticated creators can publish, update, or delete their posts.

### 🔐 Security & Architecture
- **JWT Authentication**: Dual-token system (Access Token & Refresh Token) delivered via secure HTTP-only cookies and automatic `Authorization: Bearer` headers.
- **Password Security**: Password encryption using `bcryptjs` with salt rounds.
- **CORS & Reliability**: Dynamic cross-origin support and DNS fallback configuration ensuring 100% uptime with MongoDB Atlas SRV connection strings.
- **Global Error Handling**: Express 5 asynchronous error handling with standardized JSON response envelopes.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) + Custom Glassmorphism System
- **Typography**: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) & [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- **HTTP Client**: [Axios](https://axios-http.com/) with request/response interceptors

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) with [Mongoose](https://mongoosejs.com/) ODM
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) & [Cookie-Parser](https://www.npmjs.com/package/cookie-parser)
- **File Storage**: [Multer](https://www.npmjs.com/package/multer) + [Cloudinary SDK](https://cloudinary.com/)

---

## 📁 Project Structure

```
project/
├── Backend/
│   ├── src/
│   │   ├── controllers/         # Request handlers (user, blog, like, comment)
│   │   │   ├── blog.controller.js
│   │   │   ├── comment.controller.js
│   │   │   ├── like.controller.js
│   │   │   └── user.controller.js
│   │   ├── db/                  # Database connection & DNS resolution
│   │   │   └── index.js
│   │   ├── middleware/          # Auth & file upload middlewares
│   │   │   ├── Auth.middleware.js
│   │   │   └── multer.middleware.js
│   │   ├── models/              # Mongoose schemas
│   │   │   ├── blog.model.js
│   │   │   ├── comment.model.js
│   │   │   ├── like.model.js
│   │   │   └── user.model.js
│   │   ├── routes/              # Express API route declarations
│   │   │   ├── blog.router.js
│   │   │   ├── comment.router.js
│   │   │   ├── like.router.js
│   │   │   └── user.router.js
│   │   ├── utils/               # Error classes, response formats & helpers
│   │   ├── app.js               # Express application configuration & CORS
│   │   ├── constants.js         # Global constants (DB_NAME)
│   │   └── index.js             # Server startup entry point
│   ├── public/temp/             # Temporary file buffer
│   ├── .env                     # Environment variables (private)
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── components/          # Reusable UI components
    │   │   ├── About.jsx
    │   │   ├── BlogCard.jsx
    │   │   ├── BlogList.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Header.jsx
    │   │   ├── NavBar.jsx
    │   │   ├── Newsletter.jsx
    │   │   └── ScrollToTop.jsx
    │   ├── pages/               # Application view routes
    │   │   ├── AboutPage.jsx
    │   │   ├── ArticlesPage.jsx
    │   │   ├── BlogDetails.jsx  # Boxed story layout + likes + comments
    │   │   ├── CreateBlog.jsx   # Article composer & upload
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── service/             # AuthContext & Axios client
    │   │   ├── Authcontext.jsx
    │   │   └── axios.js
    │   ├── App.jsx              # Main routing tree
    │   ├── index.css            # Tailwind & glassmorphism utilities
    │   └── main.jsx
    ├── index.html
    ├── tailwind.config.js
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.x or higher)
- **npm** or **yarn**
- **MongoDB Atlas** cluster URI
- **Cloudinary** account (for media uploads)

---

### 1. Backend Setup

1. Open a terminal and navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `Backend/.env`:
   ```env
   PORT=7000
   MONGODB_URI=your_mongodb_connection_string
   CORS_ORIGIN=http://localhost:5173

   # Cloudinary Credentials
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret

   # JWT Secrets
   ACCESS_TOKEN_SECRET=your_access_token_secret
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   REFRESH_TOKEN_EXPIRY=10d
   ```

4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The backend will start on `http://localhost:7000` and automatically connect to MongoDB.*

---

### 2. Frontend Setup

1. Open a second terminal and navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will launch at `http://localhost:5173` (or `http://localhost:5174`).*

---

## 📡 API Reference

### 👤 Authentication (`/api/v2/users`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/register` | Register a new user with avatar upload | No |
| `POST` | `/login` | Authenticate user & set JWT cookies | No |
| `POST` | `/logout` | Invalidate session & clear cookies | **Yes** |
| `GET` | `/me` | Get currently logged-in user profile | **Yes** |

### 📝 Blogs (`/api/v2/blog`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/blogs` | Fetch all published blog posts | No |
| `GET` | `/:id` | Fetch a single blog post by ID | No |
| `POST` | `/create` | Create and publish a new blog post | **Yes** |
| `PATCH`| `/:id` | Update an existing blog post | **Yes** |
| `DELETE`| `/:id` | Delete a blog post (author only) | **Yes** |

### ❤️ Likes (`/api/v2/like`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/:blogId` | Get total likes & liked status | No |
| `POST` | `/toggle/:blogId` | Toggle like status (like / unlike) | **Yes** |

### 💬 Comments (`/api/v2/comment`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/:blogId` | Retrieve all comments for a blog | No |
| `POST` | `/:blogId` | Post a new comment | **Yes** |
| `DELETE`| `/:commentId` | Delete comment (author only) | **Yes** |
| `PATCH`| `/:commentId` | Edit comment content | **Yes** |

---

## 📄 License
This project is open-source and available under the [ISC License](LICENSE).
