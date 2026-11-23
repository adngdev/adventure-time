import { NextResponse } from "next/server";

import { getAllWishlistItems } from "@/services/wishlistItem";

export const GET = async () => {
  try {
    const allItems = await getAllWishlistItems();
    return NextResponse.json({ body: allItems }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
