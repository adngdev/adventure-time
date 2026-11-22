import { NextRequest, NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/token";
import { newWishlistItemSchema } from "@/schemas/newWishlistItem";
import { createWishlistItem } from "@/services/wishlistItem";

export const POST = async (request: NextRequest) => {
  let requestData;
  try {
    requestData = await request.json();
    const parsed = newWishlistItemSchema.safeParse(requestData);
    if (!parsed.success) {
      return NextResponse.json({ body: "Bad Request" }, { status: 400 });
    }
    const userId = await getCurrentUser();
    if (!userId) {
      return NextResponse.json({ error: "No one logged in" }, { status: 500 });
    }
    createWishlistItem(userId, requestData.name, requestData.location);
    return NextResponse.json({ body: "OK" }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
