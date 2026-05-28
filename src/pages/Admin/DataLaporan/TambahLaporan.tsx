import NavBarAdmin from "@/components/NavbarAdmin";
import SideBarAdmin from "@/components/SidebarAdmin";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useEffect, useState } from "react";
import type { Product } from "@/pages/types/Product";
import type { Penjualan } from "@/pages/types/Penjualan";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Modal from "@/components/Modal";

export default function FormTambahLaporan() {
  const [products, setProducts] = useState<Product[]>([]);
  const [penjualan, setPenjualan] = useState<Penjualan[]>([]);
  const [productId, setProductId] = useState("");
  const [penjualanId, setPenjualanId] = useState("");
  const [tglLaporan, setTglLaporan] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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

    const fetchPenjualan = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://127.0.0.1:8000/api/admin/penjualan/getAllPenjualan",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setPenjualan(res.data.data.data);
      } catch (error) {
        console.error("Error : ", error);
      }
    };

    fetchProduct();
    fetchPenjualan();
  }, []);

  const addReport = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin/laporan/createLaporan",
        {
          product_id: productId,
          penjualan_id: penjualanId,
          tgl_laporan: tglLaporan,
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
        navigate("/admin/data_laporan");
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
          <h1 className="font-medium text-3xl">Form Tambah Laporan</h1>
          <div className="mx-auto max-w mt-10">
            <Card>
              <CardContent>
                <form
                  onSubmit={addReport}
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
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                      required
                    >
                      <option value="">Pilih Produk</option>
                      {products.map((prod) => (
                        <option key={prod.id} value={prod.id}>
                          {prod.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dropdown Penjualan */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Penjualan <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="penjualan_id"
                      onChange={(e) => setPenjualanId(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                      required
                    >
                      <option value="">
                        Pilih Data Penjualan berdasarkan totalnya
                      </option>
                      {penjualan.map((pen) => (
                        <option key={pen.id} value={pen.id}>
                          {pen.total_penjualan}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tanggal Laooran */}
                  <div>
                    <label
                      htmlFor="tgl_laporan"
                      className="block text-sm font-medium text-gray-700 text-[16px]"
                    >
                      Tanggal Laporan <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="tgl_laporan"
                      name="tgl_laporan"
                      onChange={(e) => setTglLaporan(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Tambah!
                  </button>
                </form>
              </CardContent>
              <CardFooter>
                <Link
                  to={"/admin/data_laporan"}
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
