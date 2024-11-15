import { readJsonFile } from '../../util/fileOperations';
import path from 'path';
import { NextRequest, NextResponse } from "next/server";

const dataDir = path.join(process.cwd(), 'data');

export const config = {
  runtime: "edge",
};

export default async function incr(req: NextRequest): Promise<NextResponse> {
  if (req.method !== "GET") {
    return new NextResponse("use GET", { status: 405 });
  }

  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) {
    return new NextResponse("Slug not found", { status: 400 });
  }

  const pageviewsFilePath = path.join(dataDir, `pageviews_projects_${slug}.json`);
  const currentViews = (await readJsonFile<number>(pageviewsFilePath)) ?? 0;
  return new NextResponse(JSON.stringify({ views: currentViews }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
