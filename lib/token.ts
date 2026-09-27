import { jwtVerify, SignJWT } from "jose";

const secret = process.env.JWT_SECRET;
if (!secret) throw new Error("jwt secret not set")
const encodedSecret = new TextEncoder().encode(secret)

export const TOKEN_MAX_AGE_SECONDS = 60 * 60;

type TokenPayload = { id: number, name: string, email: string, created_at: Date}

export const encryptToken = async (responseData: TokenPayload) => {
    const token = await new SignJWT(responseData)
        .setProtectedHeader({ alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime(`${TOKEN_MAX_AGE_SECONDS}s`)
        .sign(encodedSecret)
    return token
}

export const decryptToken = async (token: string) => {
    const verifiedToken = await jwtVerify(new TextEncoder().encode(token), encodedSecret)
    return verifiedToken;
}
