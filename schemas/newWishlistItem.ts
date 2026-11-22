import { z } from "zod";

export const newWishlistItemSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
});

export type NewWishlistItemFormValues = z.infer<typeof newWishlistItemSchema>;
