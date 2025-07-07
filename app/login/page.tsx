"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/getSecureWord", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("secureWord", data.secureWord);
    router.push("/login/secure-word");
  };

  return (
    <div className="w-full h-[calc(100vh-80px)] bg-[#b31c8c] flex flex-col items-center justify-center rounded-md">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 justify-center w-[300px] bg-white shadow-lg p-3 rounded-lg"
      >
        <span>Login</span>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="default"
          className="bg-blue-500 cursor-pointer"
        >
          Login
        </Button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}
