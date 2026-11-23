import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "../errors/app-error.ts";
import { ValidationError } from "../errors/validation-error.ts";

export const errorMiddleware =
  (): ErrorRequestHandler =>
  (err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error("Error", err);

    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ message: err.message });
    }

    if (err instanceof ValidationError) {
      return res.status(400).json({ message: err.errors });
    }

    return res.status(500).json({ message: "Internal server error" });
  };
