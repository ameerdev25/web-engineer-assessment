import { NextResponse } from "next/server";

const mockData = [
  {
    id: 1,
    date: "2023-08-24",
    refId: "#86654321",
    to: "Bloom Enterprise Sdn Bhd",
    type: "DuitNow payment",
    amount: 1200.0,
  },
  {
    id: 2,
    date: "2023-07-14",
    refId: "#86654321",
    to: "Muhammad Andy Asmawi",
    type: "DuitNow payment",
    amount: 54810.16,
  },
  {
    id: 3,
    date: "2023-08-12",
    refId: "#86654321",
    to: "Utilities Company Sdn Bhd",
    type: "DuitNow payment",
    amount: 100.0,
  },
];

export async function GET() {
  return NextResponse.json(mockData);
}
