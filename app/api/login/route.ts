import { NextRequest, NextResponse } from "next/server";
import { parseLoginData, getUser, isCorrectPw, DUMMY_HASH } from "@/lib/auth";
import { signToken, TOKEN_MAX_AGE_SECONDS } from "@/lib/token";

export const POST = async (request: NextRequest) => {
    let requestData;
    try {
        requestData = await request.json();
    } catch (exception) {
       return NextResponse.json("cant parse request", {status: 400}) 
    }
    const parsed = parseLoginData(requestData)
    if (!parsed.success) {
        return NextResponse.json("not valid login info", {status: 400})
    }
    const user = await getUser(parsed.data.email)
    const isValid = await isCorrectPw(parsed.data.password, user? user.password_hash : DUMMY_HASH);
    if (!user || !isValid) {
        return NextResponse.json("wrong user or password", { status: 401 });
    }
    const { password_hash, ...responseData } = user;
    const response = NextResponse.json("it worked", { status: 200 })
    response.cookies.set("token", await signToken(responseData), { httpOnly: true, maxAge: TOKEN_MAX_AGE_SECONDS, secure: true, sameSite: "strict"})
    return response
}