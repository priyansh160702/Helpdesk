import { z } from "zod";

export class ValidationError extends Error {
  constructor(
    public errors: z.core.$ZodFlattenedError<unknown>,
    message: string = "Validation error",
  ) {
    super(message);
    this.name = "ValidationError";
  }
}
