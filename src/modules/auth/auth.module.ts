import { AuthController } from "./auth.controller.ts";
import { AuthRouter } from "./auth.routes.ts";
import { AuthService } from "./auth.service.ts";

class AuthModule {
  private authRouter: AuthRouter;
  private authController: AuthController;
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
    this.authController = new AuthController(this.authService);
    this.authRouter = new AuthRouter(this.authController);
  }

  getRouter() {
    return this.authRouter.getRouter();
  }
}

export default new AuthModule();
