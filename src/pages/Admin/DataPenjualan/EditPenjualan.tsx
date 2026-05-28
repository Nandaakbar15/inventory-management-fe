import NavBarAdmin from "@/components/NavbarAdmin";
import SideBarAdmin from "@/components/SidebarAdmin";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Product } from "@/pages/types/Product";
import type { Categories } from "@/pages/types/Categories";
import Modal from "@/components/Modal";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function FormEditDataPenjualan() {
  const { id } = useParams();
  const [product, setProducts] = useState<Product[]>([]);
  const [product_id, setProductId] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [category, setCategory] = useState<Categories[]>([]);
  const [totalPenjualan, setTotalPenjualan] = useState(0);
  const [tglPenjualan, setTglPenjualan] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLaporanById = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://127.0.0.1:8000/api/admin/laporan/getLaporanById/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const { product_id, category_id, total_penjualan, tgl_penjualan } =
          response.data.data;

        setProductId(product_id);
        setCategoryId(category_id);
        setTotalPenjualan(total_penjualan);
        setTglPenjualan(tgl_penjualan);
      } catch (error) {
        console.error("Error : ", error);
      }
    };

    const fetchProduct = async () => {
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

    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://127.0.0.1:8000/api/admin/categories/getAllCategories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setCategory(res.data.data.data);
      } catch (error) {
        console.error("Error : ", error);
      }
    };

    fetchLaporanById();
    fetchProduct();
    fetchCategories();
  }, [id]);

  const editPenjualan = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://127.0.0.1:8000/api/admin/penjualan/updatePenjualan/${id}`,
        {
          product_id: product_id,
          category_id: category_id,
          total_penjualan: totalPenjualan,
          tgl_penjualan: tglPenjualan,
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
        navigate("/admin/data_penjualan");
      }, 2000);
    } catch (error) {
      setMessage("Error, terjadi kesalahan pada sistem!");
      setShowModal(true);
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
          <h1 className="font-medium text-3xl">Form tambah data penjualan</h1>
          <div className="mx-auto max-w mt-10">
            <Card>
              <CardContent>
                <form
                  onSubmit={editPenjualan}
                  method="POST"
                  className="space-y-4 animate-slide-down"
                >
                  {/* Dropdown Produk */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Product <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="product_id"
                      onChange={(e) => setProductId(e.target.value)}
                      value={product_id}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                      required
                    >
                      <option value="">Pilih Product</option>
                      {product.map((prod) => (
                        <option key={prod.id} value={prod.id}>
                          {prod.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dropdown Kategori */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Kategori <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category_id"
                      onChange={(e) => setCategoryId(e.target.value)}
                      value={category_id}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                      required
                    >
                      <option value="">Pilih Kategori</option>
                      {category.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tanggal Penjualan */}
                  <div>
                    <label
                      htmlFor="tgl_penjualan"
                      className="block text-sm font-medium text-gray-700 text-[16px]"
                    >
                      Tanggal Penjualan <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="tgl_penjualan"
                      name="tgl_penjualan"
                      value={tglPenjualan}
                      onChange={(e) => setTglPenjualan(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Total Penjualan */}
                  <div>
                    <label
                      htmlFor="total_penjualan"
                      className="block text-sm font-medium text-gray-700 text-[16px]"
                    >
                      Total Penjualan <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="total_penjualan"
                      name="total_penjualan"
                      value={totalPenjualan}
                      onChange={(e) =>
                        setTotalPenjualan(parseInt(e.target.value))
                      }
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Edit!
                  </button>
                </form>
              </CardContent>
              <CardFooter>
                <Link
                  to={"/admin/data_penjualan"}
                  className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-slate-500 hover:bg-slate-700"
                >
                  Kembali
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
