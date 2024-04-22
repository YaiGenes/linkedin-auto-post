import Buttons from "./Buttons";
import { conn } from "@/libs/mysql";
import { posts } from "@/db/schema/posts";
import { eq, lt, gte, ne } from 'drizzle-orm';


async function loadProduct(productId) {
  const data = await conn.select().from(posts).where(eq(posts.id, productId))
  return data
}

async function ProductPage({ params }) {
  const product = await loadProduct(params.id);
  const {id, title, publishdate, body, imageurl} = product[0]

  return (
    <section className="flex justify-center items-center h-[calc(100vh-10rem)]">
      <div className="flex w-4/6 h-2/6 justify-center">
        <div className="p-6 bg-white w-1/3">
          <h3 className="text-2xl font-bold mb-3">{title}</h3>
          <h4 className="text-4xl font-bold">{publishdate}$</h4>
          <p className="text-slate-700">{body}</p>
          <Buttons productId={id} />
        </div>
        <img src={imageurl} className="w-1/3" alt="" />
      </div>
    </section>
  );
}

export default ProductPage;
