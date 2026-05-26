import NavBarAdmin from "@/components/NavbarAdmin";
import SideBarAdmin from "@/components/SidebarAdmin";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import type { Product } from "@/pages/types/Product";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function FormTambahDataStockAdminPages() {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://127.0.0.1:8000/api/admin/products/getAllProducts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setProducts(res.data.data.data);
      } catch (error) {
        console.error("Error : ", error);
      }
    };

    fetchProducts();
  }, []);

  const addStock = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin/stock/createStock",
        {
          product_id: productId,
          quantity: quantity,
          location: location,
          expiration_date: expirationDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMessage(response.data.message);
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate("/admin/data_stock");
      }, 2000);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <SideBarAdmin />
      <div className="flex flex-1 flex-col">
        <NavBarAdmin />
        <div className="flex-1 p-6 overflow-y-auto mt-7">
          <Modal show={showModal} onClose={() => setShowModal(false)}>
            <p className="text-center text-gray-700">{message}</p>
          </Modal>
          <h1 className="font-medium text-3xl">Form Tambah Stock Produk</h1>
          <div className="mx-auto mt-10 max-w">
            <Card>
              <CardContent>
                <form onSubmit={addStock} className="space-y-4 p-6">
                  {/* Dropdown Produk */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Produk <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="product_id"
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                      required
                    >
                      <option value="">Pilih Produk</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Jumlah Stok */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Jumlah Stok <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      onChange={(e) => setQuantity(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                      min={0}
                      required
                    />
                  </div>

                  {/* Lokasi */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Lokasi <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      onChange={(e) => setLocation(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>

                  {/* Tanggal Expired */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Tanggal Expired <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="expiration_date"
                      onChange={(e) => setExpirationDate(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Simpan Stok
                  </button>
                </form>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="hover:bg-slate-400">
                  <Link to="/admin/data_stock">Kembali</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
