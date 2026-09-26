import { User } from "@/types/user";
import { jwtVerify, SignJWT } from "jose";
import { NextRequest } from "next/server";

const ENCODED_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

export const getSignedToken = async (responseData: Partial<User>) => {
    const token = await new SignJWT(responseData)
        .setProtectedHeader({ alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(ENCODED_SECRET)
    return token
}

export const retrieveToken = (request: NextRequest) => {
    return new TextEncoder().encode(request.cookies.get("token")?.value);
}

export const verifyToken = async (request: NextRequest) => {
    const verifiedToken = await jwtVerify(retrieveToken(request), ENCODED_SECRET)
    return verifiedToken;
}
