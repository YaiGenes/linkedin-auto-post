import Link from "next/link";

function ProductCard({ product }) {
  return (
    <Link
      className="bg-white rounded-lg border-gray-800 mb-3 hover:bg-gray-100 hover:cursor-pointer"
      href={`/products/${product.id}`}
    >
      {product.imageurl && <img src={product.imageurl} className="w-full rounded-t-lg" alt="" />}
      <div className="p-4">
        <h1 className="text-lg font-bold">{product.title}</h1>
        <h2 className="text-2xl text-slate-600">{product.publishdate}</h2>
        <p>{product.body}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
