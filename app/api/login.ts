import { LoginFormValues } from "@/schemas/login";
import pool from "@/db";
import { sign } from "jsonwebtoken";
import { User } from "@/types/user";

const secret = process.env.JWT_SECRET
export const login = async (data: LoginFormValues) => {
    const result = await pool.query<User>("select email, password_hash from users where email = $1", [data.email])
    const user = result.rows[0]
    if (!user) { // should move this out into its own method
        return;
    }
    if (data.password != user.password_hash) { // should convert pw to hash
        return;
    }
    const { password_hash, ...responseData } = user;

    const token = sign({ responseData }, secret, {expiresIn: '1h'} )
    console.log("got token: ", token)

}
