import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const symbol = searchParams.get("symbol");
    const interval = searchParams.get("interval");

    if (!(symbol && interval)) throw new Error("missing parameters");

    console.log({ symbol, interval });

    const params = new URLSearchParams({ symbol: symbol.toUpperCase(), interval, limit: "1000" });

    const url = `${process.env.NEXT_PUBLIC_BROKER_API_URL}/api/v3/uiKlines?${params.toString()}`;

    const response = await fetch(url);

    const data = await response.json();
    console.log({ data });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}
