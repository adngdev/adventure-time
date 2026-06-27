"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginFormValues } from "@/schemas/login";

export default function LoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(data: LoginFormValues) {
    // TODO: call login API
    console.log(data);
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-lg">
        <div className="space-y-0.5">
          <Label htmlFor="email">Email</Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input id="email" type="email" {...field} />
            )}
          />
          {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
        </div>
        <div className="space-y-0.5">
          <Label htmlFor="password">Password</Label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input id="password" type="password" {...field} />
            )}
          />
          {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
