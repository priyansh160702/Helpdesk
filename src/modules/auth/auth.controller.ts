import { AuthService } from "./auth.service.ts";
import { Request, Response, NextFunction, CookieOptions } from "express";
import { LoginDto, RegisterDto } from "../../types/auth.types.ts";
import { env } from "../../config/env.ts";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (
    req: Request<{}, {}, RegisterDto>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      await this.authService.register(req.body);
      return res.status(201).json({ message: "User created successfully!" });
    } catch (err) {
      next(err);
    }
  };

  login = async (
    req: Request<{}, {}, LoginDto>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const SESSION_DAYS = 7;
      const cookieOpts: CookieOptions = {
        // Prevents JavaScript running in the browser from accessing the cookie through document.cookie
        httpOnly: true,
        // Controls whether the cookie can be sent over HTTPS only.
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        // Defines how long the cookie should remain valid in the browser.
        maxAge: SESSION_DAYS * 24 * 60 * 60 * 1000,
      };
      const token = await this.authService.login(req.body, req, SESSION_DAYS);
      return res
        .status(200)
        .cookie("sid", token, cookieOpts)
        .json({ message: "Logged in successfully" });
    } catch (err) {
      next(err);
    }
  };
}
