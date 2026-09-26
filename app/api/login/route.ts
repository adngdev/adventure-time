import pool from "@/db";
import { SignJWT } from "jose"
import { User } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/schemas/login";

export const POST = async (request: NextRequest) => {
    const secret = process.env.JWT_SECRET
    if (!secret) {
        throw "you need a secret in order to sign jwt"
    }
    const data = loginSchema.safeParse(await request.json())?.data;
    if (!data) {
        return NextResponse.json("not valid info", {status: 401})
    }
    const result = await pool.query<User>("select email, password_hash from users where email = $1", [data.email])
    const user = result.rows[0]
    // TODO: move this into its own method
    const isCorrectPw = await bcrypt.compare(data.password, user.password_hash) 
    if (!user || !isCorrectPw) { 
        return NextResponse.json("wrong user or password", {status: 401});
    }
    const { password_hash, ...responseData } = user;

    const token = await new SignJWT(responseData)
        .setProtectedHeader({ alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(new TextEncoder().encode(secret))
    console.log("got token: ", token)

    const response = NextResponse.json("it worked", { status: 200 })
    response.cookies.set("token", token, { httpOnly: true, maxAge: 60 * 60, secure: true, sameSite: "strict"})
    return response

}