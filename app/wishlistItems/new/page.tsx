"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NewWishlistItemFormValues,
  newWishlistItemSchema,
} from "@/schemas/newWishlistItem";

export default function NewWishlistItemPage() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<NewWishlistItemFormValues>({
    resolver: zodResolver(newWishlistItemSchema),
  });

  const router = useRouter();

  async function onSubmit(data: NewWishlistItemFormValues) {
    const response = await fetch("/api/wishlist-item/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      setError("root", { message: "Wishlist item could not be created." });
    }
    toast.success("Wishlist item added!");
    router.push("/");
  }

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Wishlist item&apos;s name</Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input id="name" type="text" {...field} />}
          ></Controller>
          {errors.name && (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label>Location</Label>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Input id="location" type="text" {...field} />
            )}
          ></Controller>
          {errors.location && (
            <p className="text-destructive text-sm">
              {errors.location.message}
            </p>
          )}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating wishlist item..." : "Create wishlist item"}
        </Button>
      </form>
    </div>
  );
}
