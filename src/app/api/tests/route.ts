import { getMetaData } from "@/functions/ogscraper";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextResponse) {
  const body: { url: string } = await req.json();
  const data = await getMetaData(body.url);

  return Response.json(data);
}
