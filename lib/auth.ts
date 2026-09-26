import { loginSchema } from "@/schemas/login";
import { User } from "@/types/user";
import pool from "@/db";
import { ZodEmail } from "zod/v4";
import bcrypt from "bcryptjs";

// for router and middleware to share
export const parseLoginData = (reqBody: JSON) => {
    return loginSchema.safeParse(reqBody)?.data;
}

export const getUser = async (email: string): Promise<User | undefined> => {
    const users = await pool.query<User>("select * from users where email = $1 limit 1", [email]) 
    return users.rows[0]
}

export const isCorrectPw = async (password: string, password_hash: string) => {
   return await bcrypt.compare(password, password_hash) 
}