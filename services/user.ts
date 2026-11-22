import db from "@/db";
import { User } from "@/types/user";

export const getUser = async (email: string): Promise<User | undefined> => {
  const getUserStatement = db.prepare(
    "select * from users where email = @email limit 1",
  );

  return getUserStatement.get(email);
};
