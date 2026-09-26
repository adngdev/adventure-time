import { NextRequest, NextResponse } from "next/server";
import { parseLoginData, getUser, isCorrectPw, DUMMY_HASH } from "@/lib/auth";
import { signToken } from "@/lib/token";

export const POST = async (request: NextRequest) => {
    let requestData;
    try {
        requestData = await request.json();
    } catch (exception) {
       return NextResponse.json("cant parse request", {status: 400}) 
    }
    const data = parseLoginData(requestData)
    if (!data) {
        return NextResponse.json("not valid login info", {status: 400})
    }
    const user = await getUser(data.email)
    if (!(await isCorrectPw(data.password, user ? user.password_hash : DUMMY_HASH)) ) {
        return NextResponse.json("wrong user or password", {status: 401})
    }

    const { password_hash, ...responseData } = user;
    const response = NextResponse.json("it worked", { status: 200 })
    response.cookies.set("token", await signToken(responseData), { httpOnly: true, maxAge: 60 * 60, secure: true, sameSite: "strict"})
    return response
}