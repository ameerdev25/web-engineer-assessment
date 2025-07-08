"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Mfa() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = localStorage.getItem("username");

    const res = await fetch("/api/verifyMfa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, code }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Invalid code");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    toast("Login successful");
    router.push("/dashboard");
  };

  return (
    <div className="w-full h-[calc(100vh-80px)] bg-[#b31c8c] flex flex-col items-center justify-center rounded-md">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 justify-center w-[300px] bg-white shadow-lg p-3 rounded-lg"
      >
        <span>Enter 6 digit code</span>
        <Input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          pattern="\d{6}"
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
