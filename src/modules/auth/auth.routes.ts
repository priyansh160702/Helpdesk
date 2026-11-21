import { Router } from "express";
import { AuthController } from "./auth.controller.ts";
import { validateBody } from "../../middlewares/auth.middleware.ts";
import { registerSchema } from "./auth.validation.ts";

export class AuthRouter {
  private router: Router;

  constructor(private readonly authController: AuthController) {
    this.router = Router();
    this.initialization();
  }

  initialization() {
    this.router.post(
      "/register",
      validateBody(registerSchema),
      this.authController.register,
    );
  }

  getRouter() {
    return this.router;
  }
}
