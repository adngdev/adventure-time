import db from "@/db";
import { WishlistItem } from "@/types/wishlist-item";

export const createWishlistItem = async (
  userId: number,
  name: string,
  location: string,
) => {
  const createdAt = new Date().toISOString();
  const statement = db.prepare(
    "insert into wishlist_items (name, location, added_by, created_at) values (@name, @location, @userId, @createdAt)",
  );
  return statement.run({ userId, name, location, createdAt });
};

export const getAllWishlistItems = async () => {
  const statement = db.prepare<[], WishlistItem>(
    "select w.id, w.name, w.location, u.name as added_by_user, w.created_at from wishlist_items w inner join users u on w.added_by = u.id",
  );
  const wishlistItems = statement.all();
  return wishlistItems.map((item) => ({
    ...item,
    created_at: new Date(item.created_at),
  }));
};
