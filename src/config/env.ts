import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string(),
});

export const env = envSchema.parse(process.env);
