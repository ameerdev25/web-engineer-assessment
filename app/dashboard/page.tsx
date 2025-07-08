"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Transaction = {
  id: number;
  date: string;
  refId: string;
  to: string;
  type: string;
  amount: number;
};

export default function Dashboard() {
  const router = useRouter();

  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) router.push("/login");

    fetch("/api/transaction-history")
      .then((res) => res.json())
      .then((transaction) => setData(transaction))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, [router]);

  return (
    <div className="w-full h-[calc(100vh-80px)] flex flex-col rounded-md">
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Reference ID</th>
              <th className="p-2 border">To</th>
              <th className="p-2 border">Transaction Type</th>
              <th className="p-2 border">Amout</th>
            </tr>
          </thead>
          <tbody>
            {data.map((txn) => (
              <tr key={txn.id}>
                <td className="p-2 border">{txn.date}</td>
                <td className="p-2 border">{txn.refId}</td>
                <td className="p-2 border">{txn.to}</td>
                <td className="p-2 border">{txn.type}</td>
                <td className="p-2 border text-right">
                  RM {txn.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
