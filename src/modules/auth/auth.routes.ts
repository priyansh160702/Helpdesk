import { Router } from "express";
import { AuthController } from "./auth.controller.ts";

export class AuthRouter {
  private router: Router;

  constructor(private readonly authController: AuthController) {
    this.router = Router();
  }

  getRouter() {
    return this.router;
  }
}
