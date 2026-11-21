import { z } from "zod";
import { registerSchema } from "./auth.validation.ts";

export type RegisterDto = z.infer<typeof registerSchema>;
