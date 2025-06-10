import jwt from "jsonwebtoken";
import { env } from "~/env";

export function signJwt(payload: object) {
  const secret = env.NEXTAUTH_SECRET!;
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}
