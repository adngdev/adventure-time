import { NextRequest, NextResponse } from "next/server";
import { parseLoginData, getUser, isCorrectPw, DUMMY_HASH } from "@/lib/auth";
import { signToken, TOKEN_MAX_AGE_SECONDS } from "@/lib/token";
import { BadRequestError } from "@/types/errors/BadRequestError";
import { UnauthorisedError } from "@/types/errors/UnauthorisedError";

export const POST = async (request: NextRequest) => {
    let requestData;
    try {
        requestData = await request.json();
        const parsed = parseLoginData(requestData)
        if (!parsed.success) {
            throw new BadRequestError();
        }
        const user = await getUser(parsed.data.email)
        const isValid = await isCorrectPw(parsed.data.password, user? user.password_hash : DUMMY_HASH);
        if (!user || !isValid) {
            throw new UnauthorisedError();
        }
        const { password_hash, ...responseData } = user;
        const response = NextResponse.json({status: 200 })
        response.cookies.set("token", await signToken(responseData), { httpOnly: true, maxAge: TOKEN_MAX_AGE_SECONDS, secure: true, sameSite: "strict"})
        return
    } catch (error) {
        if (error instanceof BadRequestError || error instanceof UnauthorisedError) {
            return NextResponse.json({status: error.statusCode}) 
        }
    }         
 
}