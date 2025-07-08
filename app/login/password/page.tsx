"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Password() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const username = localStorage.getItem("username");
    const secureWord = localStorage.getItem("secureWord");

    if (!username || !secureWord) {
      router.push("/login");
      return;
    }

    const hashedPassword = await hashPassword(password);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, hashedPassword, secureWord }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Login failed");
      return;
    }

    router.push("/login/mfa");
  };

  async function hashPassword(password: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  }

  return (
    <div className="w-full h-[calc(100vh-80px)] bg-[#b31c8c] flex flex-col items-center justify-center rounded-md">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 justify-center w-[300px] bg-white shadow-lg p-3 rounded-lg"
      >
        <span>Enter your password</span>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="default"
          className="bg-blue-500 cursor-pointer"
        >
          Submit
        </Button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}
