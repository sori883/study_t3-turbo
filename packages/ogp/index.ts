import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getPageOGPMetadata } from "./src/getOgp";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ data: "url undefined" });

  const ogp = await getPageOGPMetadata(url);

  return NextResponse.json({ data: ogp });
}
