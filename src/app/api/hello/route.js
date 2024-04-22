import { NextResponse } from "next/server";
import { conn } from "../../../libs/mysql";
import { posts } from "@/db/schema/posts";

export async function GET() {
  const result = await conn.select().from(posts).all();
  return NextResponse.json({ message: result[0]["now()"] });
}
