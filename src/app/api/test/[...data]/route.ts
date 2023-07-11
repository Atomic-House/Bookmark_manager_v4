import { NextResponse } from "next/server";
import { Client } from "peekalink";
import urlMetadata from "url-metadata";
export async function GET(req: Request, { params }: { params: { data: string[] } }) {
  const url = "https://www.npmjs.com/package/url-metadata";
  const ur2 = "https://www.linkedin.com/feed/";
  // const data = await getMetaData(url);
  const data = await urlMetadata(ur2);
  const [id, name] = params.data;
  const json = JSON.parse(JSON.stringify(data));
  return NextResponse.json({
    json,
  });
}
