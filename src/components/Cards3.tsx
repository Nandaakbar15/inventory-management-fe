import axios from "axios";
import type { Product } from "@/pages/types/Product";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Cards3() {
  const [smallProduct, setSmallProduct] = useState<Product | null>(null);

  useEffect(() => {
    const GetSmallProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://127.0.0.1:8000/api/admin/products/small-product",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data.data && response.data.data.length > 0) {
          setSmallProduct(response.data.data[0]);
        }
      } catch (error) {
        console.error("Error : ", error);
      }
    };

    GetSmallProduct();
  }, []);

  return (
    <div className="bg-blue-400 max-w-sm rounded-lg shadow-lg p-4">
      <h1 className="text-white font-medium">Stok produk yang terkecil</h1>
      {smallProduct ? (
        <div className="mt-3 flex items-center gap-4">
          {/* Tampilkan gambar jika kolom image ada nilainya */}
          {smallProduct.image && (
            <img
              src={`http://127.0.0.1:8000/images/${smallProduct.image}`}
              alt={smallProduct.name}
              className="w-16 h-16 object-cover rounded-md bg-white border"
            />
          )}

          <div>
            <h2 className="text-white font-semibold text-xl">
              {smallProduct.name}
            </h2>
            <p className="text-green-100 text-sm font-sans line-clamp-2 mt-1">
              {smallProduct.description || "Tidak ada deskripsi."}
            </p>

            <p className="text-green-100 text-sm font-sans line-clamp-2 mt-1">
              Harga jual: $.{" "}
              {smallProduct.sell_price || "Tidak ada harga jual."}
            </p>

            <div className="mt-3">
              <Link
                to={`/admin/detail_product/${smallProduct.id}`}
                className="inline-block text-white bg-blue-500 px-4 py-2 hover:bg-blue-700 rounded-lg shadow-lg"
              >
                Detail Produk
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-green-200 text-sm animate-pulse">
          Memuat data produk...
        </p>
      )}
    </div>
  );
}
