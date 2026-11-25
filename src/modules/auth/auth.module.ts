import { AuthController } from "./auth.controller.ts";
import { AuthRepository } from "./auth.repository.ts";
import { AuthRouter } from "./auth.routes.ts";
import { AuthService } from "./auth.service.ts";

class AuthModule {
  private authRouter: AuthRouter;
  private authController: AuthController;
  private authService: AuthService;
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
    this.authService = new AuthService(this.authRepository);
    this.authController = new AuthController(this.authService);
    this.authRouter = new AuthRouter(this.authController);
  }

  getRouter() {
    return this.authRouter.getRouter();
  }
}

export default new AuthModule();
