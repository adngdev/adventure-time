import { loginSchema } from "@/schemas/login";
import { User } from "@/types/user";
import pool from "@/db";
import bcrypt from "bcryptjs";

export const DUMMY_HASH = bcrypt.hashSync("some dummy pw", 10)

export const parseLoginData = (reqBody: unknown) => {
    return loginSchema.safeParse(reqBody);
}

export const getUser = async (email: string): Promise<User | undefined> => {
    const users = await pool.query<User>("select * from users where email = $1 limit 1", [email]) 
    return users.rows[0]
}

export const isCorrectPw = async (password: string, password_hash: string) => {
   return await bcrypt.compare(password, password_hash) 
}