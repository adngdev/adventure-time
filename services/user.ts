import pool from "@/db";
import { User } from "@/types/user";

export const getUser = async (email: string): Promise<User | undefined> => {
  const users = await pool.query<User>(
    "select * from users where email = $1 limit 1",
    [email],
  );
  return users.rows[0];
};
