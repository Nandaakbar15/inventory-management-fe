/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import type { Product } from "@/pages/types/Product";
import { Link } from "react-router-dom";

export default function Cards2() {
  const [bestSellingProduct, setBestSellingProduct] = useState<Product | null>(
    null,
  );

  useEffect(() => {
    const GetBestSellingProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://127.0.0.1:8000/api/admin/products/best-product",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data.data && response.data.data.length > 0) {
          setBestSellingProduct(response.data.data[0]);
        }
      } catch (error) {
        console.error("Error : ", error);
      }
    };

    GetBestSellingProduct();
  }, []);

  return (
    <div className="bg-green-600 max-w-sm rounded-lg shadow-lg p-4">
      <h1 className="text-white font-medium text-lg mb-2">Produk Terlaris</h1>

      {/* Cek apakah data sudah berhasil dimuat */}
      {bestSellingProduct ? (
        <div className="flex items-center gap-4">
          {/* Tampilkan gambar jika kolom image ada nilainya */}
          {bestSellingProduct.image && (
            <img
              src={`http://127.0.0.1:8000/images/${bestSellingProduct.image}`}
              alt={bestSellingProduct.name}
              className="w-16 h-16 object-cover rounded-md bg-white border"
            />
          )}

          <div>
            <h2 className="text-white font-semibold text-xl">
              {bestSellingProduct.name}
            </h2>
            <p className="text-green-100 text-sm font-sans line-clamp-2 mt-1">
              {bestSellingProduct.description || "Tidak ada deskripsi."}
            </p>

            <div className="mt-3">
              <Link
                to={`/admin/detail_product/${bestSellingProduct.id}`}
                className="inline-block text-white bg-blue-500 px-4 py-2 hover:bg-blue-700 rounded-lg shadow-lg"
              >
                Detail Produk
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Tampilan placeholder saat loading data */
        <p className="text-green-200 text-sm animate-pulse">
          Memuat data produk...
        </p>
      )}
    </div>
  );
}
