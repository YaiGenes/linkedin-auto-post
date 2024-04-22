"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

function ProductForm() {
  const [product, setProduct] = useState({
    title: "",
    body: 0,
    description: "",
  });
  const [file, setFile] = useState(null);
  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (params.id) {
      axios.get("/api/products/" + params.id).then((res) => {
        setProduct({
          title: res.data.title,
          publishdate: res.data.publishdate,
          body: res.data.body,
        });
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("publishdate", product.publishdate);
    formData.append("body", product.body);

    if (file) {
      formData.append("imageurl", file);
    }

    if (!params.id) {
      const res = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      const res = await axios.put("/api/products/" + params.id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
    }

    form.current.reset();
    router.refresh();
    router.push("/products");
  };

  return (
    <div className="flex ">
      <form
        className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
        ref={form}
      >
        <label
          htmlFor="title"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Post Title:
        </label>
        <input
          name="title"
          type="text"
          placeholder="title"
          onChange={handleChange}
          value={product.title}
          className="shadow appearance-none border rounded w-full py-2 px-3"
          autoFocus
        />

        <label
          htmlFor="publishdate"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Publish Date:
        </label>
        <input
          name="publishdate"
          type="text"
          placeholder="00.00"
          onChange={handleChange}
          value={product.publishdate}
          className="shadow appearance-none border rounded w-full py-2 px-3"
        />

        <label
          htmlFor="body"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Post body:
        </label>
        <textarea
          name="body"
          rows={3}
          placeholder="body"
          onChange={handleChange}
          value={product.body}
          className="shadow appearance-none border rounded w-full py-2 px-3"
        />

        <label
          htmlFor="imageurl"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Image:
        </label>
        <input
          type="file"
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-2"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />

        {file && (
          <img
            className="w-96 object-contain mx-auto my-4"
            src={URL.createObjectURL(file)}
            alt=""
          />
        )}

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {params.id ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
