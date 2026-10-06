import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
  "https://blog-web-eta-ten.vercel.app",
];

if (process.env.CORS_ORIGIN) {
  process.env.CORS_ORIGIN.split(",")
    .map((o) => o.trim())
    .filter(Boolean)
    .forEach((o) => {
      if (!defaultAllowedOrigins.includes(o)) {
        defaultAllowedOrigins.push(o);
      }
    });
}
if (process.env.CLIENT_URL && !defaultAllowedOrigins.includes(process.env.CLIENT_URL.trim())) {
  defaultAllowedOrigins.push(process.env.CLIENT_URL.trim());
}

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g., mobile apps, Postman, server-side)
      if (!origin) {
        return callback(null, true);
      }
      if (defaultAllowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
import userRouter from "./routes/user.router.js";
import { blogRouter } from "./routes/blog.router.js";
import { commentRouter } from "./routes/comment.router.js";
import { likeRouter } from "./routes/like.router.js";

app.use("/api/v2/users", userRouter);
app.use("/api/v2/blog", blogRouter);
app.use("/api/v2/comment", commentRouter);
app.use("/api/v2/like", likeRouter);

app.get("/test", (req, res) => {
  res.send("API working");
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    statusCode: 404,
    success: false,
    message: `Route not found - ${req.originalUrl}`,
    data: null,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || err.statuscode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    statusCode,
    success: false,
    message,
    errors: err.error || err.errors || [],
    data: null,
  });
});

export { app };
