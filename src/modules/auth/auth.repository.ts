import { RegisterDto, User } from "../../types/auth.types.ts";
import db from "../../config/database.ts";
import argon2 from "argon2";
import { DatabaseError } from "pg";
import { AppError } from "../../errors/app-error.ts";
import { Request } from "express";
import crypto from "node:crypto";
import { sha256Hash } from "../../helpers.ts";

export class AuthRepository {
  async register(user: RegisterDto) {
    const { name, email, password } = user;

    const hashedPassword = await argon2.hash(password);

    try {
      await db.query(
        `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
        [name, email, hashedPassword],
      );
    } catch (err) {
      if (err instanceof DatabaseError) {
        if (err.code === "23505") {
          throw new AppError(409, "Email already exists");
        }

        throw err;
      }
    }
  }

  async findUserByEmail(email: string) {
    try {
      const result = await db.query<User>(
        `SELECT * FROM users WHERE email = $1`,
        [email],
      );

      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  async createSession(userId: string, req: Request, SESSION_DAYS: number) {
    try {
      const token = crypto.randomBytes(32).toString("base64url");
      const tokenHash = sha256Hash(token);
      await db.query(
        `INSERT INTO sessions (user_id, token_hash, expires_at, ip, user_agent) VALUES ($1,$2,now() + make_interval(days => $3),$4,$5)`,
        [userId, tokenHash, SESSION_DAYS, req.ip, req.get("user-agent")],
      );

      return token;
    } catch (err) {
      throw err;
    }
  }
}
