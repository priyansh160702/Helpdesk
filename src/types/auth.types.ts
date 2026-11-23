import { z } from "zod";
import { registerSchema } from "../modules/auth/auth.validation.ts";

export type RegisterDto = z.infer<typeof registerSchema>;

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}
