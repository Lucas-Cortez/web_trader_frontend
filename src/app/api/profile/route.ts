import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  throw new Error("opa");

  return NextResponse.json({ message: "internal" }, { status: 403 });
  // return NextResponse.json({ opa: "oi" });
}
