import { z } from "zod";
import { RequestHandler } from "express";
import { ValidationError } from "../errors/validation-error.ts";

export const validateBody =
  <T>(schema: z.ZodType<T>): RequestHandler =>
  (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      next(new ValidationError(z.flattenError(result.error)));
    }

    req.body = result.data;
    next();
  };
