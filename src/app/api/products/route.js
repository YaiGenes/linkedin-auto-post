import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
import { unlink } from "fs/promises";
import cloudinary from "@/libs/cloudinary";
import { processImage } from "@/libs/processImage";
import { posts } from "@/db/schema/posts";
import { log } from "console";

export async function GET() {
  try {
    const result = await conn.select().from(posts).all();
    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.formData();
    const imageurl = data.get("imageurl");
    if (!data.get("title")) {
      return NextResponse.json(
        {
          message: "title is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!imageurl) {
      return NextResponse.json(
        {
          message: "imageurl is required",
        },
        {
          status: 400,
        }
      );
    }

    const buffer = await processImage(imageurl);
    const res = await new Promise((resolve, reject) => {
      cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
        },
        async (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          
          resolve(result);
        }
        )
        .end(buffer);
      });

    const result = await conn.insert(posts).values ({
      title: data.get("title"),
      body: data.get("body"),
      publishdate: data.get("publishdate"),
      imageurl: res.secure_url,
    });

    return NextResponse.json({
      title: data.get("title"),
      body: data.get("body"),
      publishdate: data.get("publishdate"),
      id: result.insertId,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
