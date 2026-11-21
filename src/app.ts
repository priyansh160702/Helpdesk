import express from "express";
import { AuthModule } from "./modules/auth/auth.module.ts";

const app = express();

// Middlewares
app.use(express.json());

// Module initialization
const authModule = new AuthModule();

// Routes
app.use("/auth", authModule.getRouter());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

export default app;
