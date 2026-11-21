import { AuthService } from "./auth.service.ts";

export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
