import { NextResponse } from "next/server";
import { Client } from "peekalink";
import urlMetadata from "url-metadata";
import { unfurl } from "unfurl.js";
import axios from "axios";
export async function GET(req: Request, { params }: { params: { data: string[] } }) {
  const url = "https://www.taniarascia.com/writing-an-emulator-in-javascript-chip8/";
  // const data = await getMetaData(url);
  const data =await unfurl(url)
  const [id, name] = params.data;
  return NextResponse.json({  data });
}
