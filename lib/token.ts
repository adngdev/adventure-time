import { verify } from "node:crypto";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secret = process.env.JWT_SECRET;
if (!secret) throw new Error("jwt secret not set");
const encodedSecret = new TextEncoder().encode(secret);

type TokenPayload = {
  id: number;
  name: string;
  email: string;
  created_at: Date;
};

export const TOKEN_MAX_AGE_SECONDS = 60 * 60;

export const signToken = async (responseData: TokenPayload) => {
  const token = await new SignJWT(responseData)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_MAX_AGE_SECONDS}s`)
    .sign(encodedSecret);
  return token;
};

export const verifyToken = async (token: string) => {
  const verifiedToken = await jwtVerify(
    new TextEncoder().encode(token),
    encodedSecret,
  );
  return verifiedToken;
};

export const getCurrentUser = async (): Promise<number | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const verifiedToken = await verifyToken(token);
    return verifiedToken.payload.id as number;
  } catch {
    return null;
  }
};
