import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
import cloudinary from "@/libs/cloudinary";
import { processImage } from "@/libs/processImage";
import { posts } from "@/db/schema/posts";
import { eq, lt, gte, ne } from 'drizzle-orm';

export async function GET(request, { params }) {
  try {
    const result = await conn.select({
      id: params.id
    }).from(posts).one();

    if (result.length === 0) {
      return NextResponse.json(
        {
          message: "Producto no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const result = await conn.delete(posts).where(eq(posts.id, params.id));

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Producto no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.formData();
    const imageurl = data.get("imageurl");
    const updateData = {
      title: data.get("title"),
      publishdate: data.get("publishdate"),
      body: data.get("body"),
    };

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

    if (imageurl) {
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

      updateData.imageurl = res.secure_url;
      const result =  await conn.update(posts)
        .set({ title: updateData.title, body: updateData.body, publishdate: updateData.publishdate, imageurl: updateData.imageurl })
        .where(eq(posts.id, params.id));

      console.log(result.rowsAffected);
      if (result.rowsAffected === 0) {
        return NextResponse.json(
          {
            message: "Producto no encontrado",
          },
          {
            status: 404,
          }
        );
      }
      const updatedProduct = await conn.select().from(posts).where(eq(posts.id, params.id))

      return NextResponse.json(updatedProduct[0]);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
