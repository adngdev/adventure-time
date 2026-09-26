"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginFormValues } from "@/schemas/login";
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });
  const router = useRouter();

  async function onSubmit(data: LoginFormValues) {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })
    if (!response.ok) {
      if (response.status == 401) {
        setError("root", { message: "Email or password is incorrect" })
        return
      } else {
        setError("root", { message: "Something went wrong" })
        return
      }
    }
    router.push("/")
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
        {errors.root && <p role="alert" className="text-destructive text-sm">{errors.root.message}</p>}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
