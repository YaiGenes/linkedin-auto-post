import ProductCard from "@/components/ProductCard";
import {conn} from '@/libs/mysql'
import { posts } from "@/db/schema/posts";

// async function loadProducts() {
//   const products = await conn.select().from(posts).all();
//   return products
// }

export const dynamic = 'force-dynamic'

async function ProductsPage() {
  const products = await conn.select().from(posts).all();
  return <div className="grid gap-4 grid-cols-4">
    {products.map(product => (
        <ProductCard product={product} key={product.id} />
    ))}
  </div>;
}

export default ProductsPage;
