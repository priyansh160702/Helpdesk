import crypto from "node:crypto";

export const sha256Hash = (data: string) =>
  crypto.createHash("sha256").update(data).digest();
