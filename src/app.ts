import express from "express";
import authModule from "./modules/auth/auth.module.ts";
import { errorMiddleware } from "./middlewares/error.middleware.ts";

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/auth", authModule.getRouter());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

app.use(errorMiddleware());

export default app;
