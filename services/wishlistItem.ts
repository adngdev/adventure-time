import db from "@/db";

export const createWishlistItem = async (
  userId: number,
  name: string,
  location: string,
) => {
  // generate created at
  const createdAt = Date.now();
  const createWishlistItemStatement = db.prepare(
    "insert into wishlist_items (name, location, added_by, created_at) values (@name, @location, @userId, @createdAt)",
  );
  return createWishlistItemStatement.run({ userId, name, location, createdAt });
};
