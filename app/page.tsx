import router from "next/router";

import { Button } from "@/components/ui/button";

export default function MainPage() {
  const logout = async () => {
    const response = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      // return 500
      return;
    }
    router.push("/login");
  };
  return <Button onClick={logout}>{"Log out"}</Button>;
}
