import { AuthRepository } from "./auth.repository.ts";
import { LoginDto, RegisterDto } from "../../types/auth.types.ts";
import { AppError } from "../../errors/app-error.ts";
import argon from "argon2";
import { Request } from "express";

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  register = async (body: RegisterDto) => {
    try {
      await this.authRepository.register(body);
    } catch (err) {
      throw err;
    }
  };
  login = async (body: LoginDto, req: Request, SESSION_DAYS: number) => {
    const { email, password } = body;

    try {
      const user = await this.authRepository.findUserByEmail(email);
      if (!user) throw new AppError(401, "Invalid credentials");

      const passwordCheck = argon.verify(user.password, password);
      if (!passwordCheck) throw new AppError(401, "Invalid credentials");

      return this.authRepository.createSession(user.id, req, SESSION_DAYS);
    } catch (err) {
      throw err;
    }
  };
}
