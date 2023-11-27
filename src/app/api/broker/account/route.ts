import { NextRequest, NextResponse } from "next/server";
import { Spot } from "@binance/connector-typescript";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const key = searchParams.get("key");
    const secret = searchParams.get("secret");

    if (!(key && secret)) throw new Error("missing parameters");

    const client = new Spot(key, secret, { baseURL: process.env.NEXT_PUBLIC_BROKER_API_URL });

    const account = await client.accountInformation();
    console.log(account);

    return NextResponse.json(account, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}
