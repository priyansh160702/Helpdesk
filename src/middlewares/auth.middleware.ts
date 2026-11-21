import { z } from "zod";
import { RequestHandler } from "express";

export const validateBody =
  <T>(schema: z.ZodType<T>): RequestHandler =>
  (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: z.flattenError(result.error) });
    }

    req.body = result.data;
    next();
  };
