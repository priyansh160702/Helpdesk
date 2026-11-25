import { Router } from "express";
import { AuthController } from "./auth.controller.ts";
import { validateBody } from "../../middlewares/auth.middleware.ts";
import { loginSchema, registerSchema } from "./auth.validation.ts";

export class AuthRouter {
  private router: Router;

  constructor(private readonly authController: AuthController) {
    this.router = Router();
    this.initialization();
  }

  initialization() {
    // Register users
    this.router.post(
      "/register",
      validateBody(registerSchema),
      this.authController.register,
    );

    // User login
    this.router.post(
      "/login",
      validateBody(loginSchema),
      this.authController.login,
    );
  }

  getRouter() {
    return this.router;
  }
}
