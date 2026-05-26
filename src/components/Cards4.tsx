import axios from "axios";
import type { Product } from "@/pages/types/Product";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Cards4() {
  const [expiringProducts, setExpiringProducts] = useState<Product[]>([]);

  useEffect(() => {
    const GetExpiringProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://127.0.0.1:8000/api/admin/products/expiring-soon",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data.data && response.data.data.length > 0) {
          setExpiringProducts(response.data.data);
        }
      } catch (error) {
        console.error("Error : ", error);
      }
    };

    GetExpiringProducts();
  }, []);

  return (
    <div className="bg-orange-500 max-w-sm rounded-lg shadow-lg p-4">
      <h1 className="text-white font-medium text-lg mb-2">
        Barang Mendekati Expired (30 Hari)
      </h1>

      {expiringProducts.length > 0 ? (
        <div className="space-y-3">
          {expiringProducts.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-3 bg-white/10 rounded-lg p-2"
            >
              {product.image && (
                <img
                  src={`http://127.0.0.1:8000/images/${product.image}`}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-md bg-white border"
                />
              )}

              <div className="flex-1 min-w-0">
                <h2 className="text-white font-semibold text-sm truncate">
                  {product.name}
                </h2>
                {product.expiring_stock && (
                  <p className="text-orange-100 text-xs mt-1">
                    Exp:{" "}
                    {new Date(
                      product.expiring_stock.expiration_date,
                    ).toLocaleDateString("id-ID")}
                  </p>
                )}
              </div>

              <Link
                to={`/admin/detail_product/${product.id}`}
                className="text-white bg-orange-600 px-3 py-1 text-xs hover:bg-orange-700 rounded-lg"
              >
                Detail
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-orange-200 text-sm animate-pulse">
          Memuat data barang...
        </p>
      )}
    </div>
  );
}
