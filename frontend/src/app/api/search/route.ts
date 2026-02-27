import { fetchCollectionType } from "@/lib/strapi";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = (searchParams.get("q") ?? searchParams.get("query") ?? "")
    .trim()
    .slice(0, 200);

  const page = Math.max(
    1,
    Number.parseInt(searchParams.get("page") ?? "1", 10) || 1,
  );
  const pageSize = Math.max(
    1,
    Math.min(50, Number.parseInt(searchParams.get("pageSize") ?? "5", 10) || 5),
  );

  if (!query) {
    return Response.json([]);
  }

  const teas = await fetchCollectionType("teas", {
    fields: ["name", "slug", "excerpt"],
    sort: ["name:asc"],
    pagination: { page, pageSize },
    filters: {
      $or: [
        { name: { $containsi: query } },
        { excerpt: { $containsi: query } },
        { slug: { $containsi: query } },
      ],
    },
  });

  return Response.json(teas);
}
