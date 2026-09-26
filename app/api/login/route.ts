import { SignJWT } from "jose"
import { User } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import parseLoginData, { getUser, isCorrectPw } from "@/lib/auth";

export const POST = async (request: NextRequest) => {
    const secret = process.env.JWT_SECRET
    if (!secret) {
        return NextResponse.json("you need a secret in order to sign jwt", {status: 500})
    }
    const data = parseLoginData(await request.json())
    if (!data) {
        return NextResponse.json("not valid info", {status: 401})
    }
    const user = await getUser(data.email)
    if (!user) {
        return NextResponse.json("wrong user or password", {status: 401})
    }
    if (!await isCorrectPw(data.password, user.password_hash)) { 
        return NextResponse.json("wrong user or password", {status: 401});
    }
    const { password_hash, ...responseData } = user;

    const token = await new SignJWT(responseData)
        .setProtectedHeader({ alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(new TextEncoder().encode(secret))

    const response = NextResponse.json("it worked", { status: 200 })
    response.cookies.set("token", token, { httpOnly: true, maxAge: 60 * 60, secure: true, sameSite: "strict"})
    return response

}