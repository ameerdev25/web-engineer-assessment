"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SecureWordPage() {
  const [secureWord, setSecureWord] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);

  const router = useRouter();

  useEffect(() => {
    const word = localStorage.getItem("secureWord");
    if (!word) {
      router.push("/login");
      return;
    }
    setSecureWord(word);

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="w-full h-[calc(100vh-80px)] bg-[#b31c8c] flex flex-col items-center justify-center rounded-md">
      <div className="bg-white rounded-md shadow p-4 w-[450px]">
        <h2 className="font-semibold mb-2">Your Secure Word:</h2>
        <p className="bg-gray-100 p-2 mb-2 font-mono overflow-auto">
          {secureWord}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Expire in {timeLeft} seconds.
        </p>
        <Button
          onClick={() => router.push("/login/password")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
