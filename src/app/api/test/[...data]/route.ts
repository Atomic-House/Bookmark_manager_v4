import { NextResponse } from "next/server";
import { Client } from "peekalink";
import ogs from "open-graph-scraper";
export async function GET(
  req: Request,
  { params }: { params: { data: string[] } },
) {
  const url = "https://www.npmjs.com/package/url-metadata";
  const ur2 = "https://www.linkedin.com/feed/";
  const url3 = "https://github.com/mirsahebali";
  const url4 = "https://app.codecrafters.io/catalog";
  const url5 =
    "https://taniarascia.com/writing-an-emulator-in-javascript-chip8/";
  const ru = "https://www.taniarascia.com/";

  const lk =
    "https://www.taniarascia.com/writing-an-emulator-in-javascript-chip8/";
  const nurl = new URL(url5).toString();
  const { result, error } = await ogs({ url: lk });
  const [id, name] = params.data;
  const json = JSON.parse(JSON.stringify(result));
  return NextResponse.json({
    jsonName: result.ogTitle,
    error: error,
    preview: result.ogImage,
  });
}
