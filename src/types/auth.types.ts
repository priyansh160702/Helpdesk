import { z } from "zod";
import {
  loginSchema,
  registerSchema,
} from "../modules/auth/auth.validation.ts";

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}
