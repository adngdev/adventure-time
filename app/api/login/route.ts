import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { signToken, TOKEN_MAX_AGE_SECONDS } from "@/lib/token";
import { loginSchema } from "@/schemas/login";
import { getUser } from "@/services/user";

const isCorrectPw = async (password: string, password_hash: string) => {
  return await bcrypt.compare(password, password_hash);
};

// need this to make it so that incorrect pw is the same processing time as no account registered
const DUMMY_HASH = bcrypt.hashSync("some dummy pw", 10);

export const POST = async (request: NextRequest) => {
  let requestData;
  try {
    requestData = await request.json();
    const parsed = loginSchema.safeParse(requestData);
    if (!parsed.success) {
      return NextResponse.json({ body: "Bad Request" }, { status: 400 });
    }
    const user = await getUser(parsed.data.email);
    const isValid = await isCorrectPw(
      parsed.data.password,
      user ? user.password_hash : DUMMY_HASH,
    );
    if (!user || !isValid) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }
    const { password_hash, ...responseData } = user;
    const response = NextResponse.json({ body: "OK" }, { status: 200 });
    response.cookies.set("token", await signToken(responseData), {
      httpOnly: true,
      maxAge: TOKEN_MAX_AGE_SECONDS,
      secure: true,
      sameSite: "strict",
    });
    return response;
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
