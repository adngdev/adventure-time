import { NextRequest, NextResponse } from "next/server";
import { parseLoginData, getUser, isCorrectPw } from "@/lib/auth";
import { signToken } from "@/lib/token";

export const POST = async (request: NextRequest) => {
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
    const response = NextResponse.json("it worked", { status: 200 })
    response.cookies.set("token", await signToken(responseData), { httpOnly: true, maxAge: 60 * 60, secure: true, sameSite: "strict"})
    return response
}