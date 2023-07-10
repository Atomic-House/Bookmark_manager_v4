import { NextResponse } from "next/server";
import { Client,ContentType } from "peekalink";

export async function GET(req: Request) {
  const client = new Client({ apiKey: process.env.NEXT_PUBLIC_PEEKALINK_KEY! });
  const url = "https://www.taniarascia.com/writing-an-emulator-in-javascript-chip8/";
  const data = await client.isAvailable(url);
 
  return NextResponse.json({ data });
}
