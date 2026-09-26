import { loginSchema } from "@/schemas/login";
import { User } from "@/types/user";
import pool from "@/db";
import { ZodEmail } from "zod/v4";
import bcrypt from "bcryptjs";

// for router and middleware to share
export const parseLoginData = (reqBody: JSON) => {
    return loginSchema.safeParse(reqBody)?.data;
}

export const getUser = async (email: ZodEmail): Promise<User> => {
    return await pool.query<User>("select top 1 * from users where email = $1", [email])
}

export const isCorrectPw = async (password: string, password_hash: string) => {
   return await bcrypt.compare(password, password_hash) 
}