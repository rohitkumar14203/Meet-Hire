import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/connectDB.js";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";

import authRouter from "./routes/authRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
const app = express();

connectDB();

app.use(
  cors({
    origin: ["*", "http://localhost:5173"],
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes

app.use("/api/auth", authRouter);
app.use("/api/hr/jobs", jobsRoutes);
app.use("/api/applications", applicationRoutes);
// app.use("/api/interviews", interviewRoutes);

app.use(errorHandler);

//404 Handler
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    error: "Router Not Found",
    statusCode: 404,
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});

process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  process.exit(1);
});
