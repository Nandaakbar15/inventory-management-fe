import NavBarAdmin from "@/components/NavbarAdmin";
import SideBarAdmin from "@/components/SidebarAdmin";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Product } from "@/pages/types/Product";
import type { Penjualan } from "@/pages/types/Penjualan";

import Modal from "@/components/Modal";

export default function FormTambahDataTransaksi() {
  const [product, setProduct] = useState<Product[]>([]);
  const [penjualan, setPenjualan] = useState<Penjualan[]>([]);

  const [productId, setProductId] = useState("");
  const [penjualanId, setPenjualanId] = useState("");

  const [tglTransaksiMasuk, setTglTransaksiMasuk] = useState("");
  const [tglTransaksiKeluar, setTglTransaksiKeluar] = useState("");

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduk = async () => {
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

        setProduct(res.data.data.data);
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

    fetchProduk();
    fetchPenjualan();
  }, []);

  const addDataTransaksi = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin/transaksi/createDataTransaksi",
        {
          product_id: productId,
          penjualan_id: penjualanId,
          tgl_transaksi_masuk: tglTransaksiMasuk,
          tgl_transaksi_keluar: tglTransaksiKeluar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMessage(response.data.message);
      setShowModal(true);

      // clear the form
      setProductId("");
      setPenjualanId("");
      setTglTransaksiMasuk("");
      setTglTransaksiKeluar("");

      setTimeout(() => {
        setShowModal(false);
        navigate("/admin/data_transaksi");
      }, 2000);
    } catch (error) {
      setMessage("Error, gagal menambahkan data!");
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
          <h1 className="font-medium text-3xl">Form tambah Data Transaksi</h1>
          <div className="mx-auto mt-10 max-w">
            <Card>
              <CardContent>
                <form
                  onSubmit={addDataTransaksi}
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
                      {product.map((prod) => (
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

                  {/* Tanggal Transaksi Masuk */}
                  <div>
                    <label
                      htmlFor="tgl_transaksi_masuk"
                      className="block text-sm font-medium text-gray-700 text-[16px]"
                    >
                      Tanggal Transaksi Masuk
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="tgl_transaksi_masuk"
                      name="tgl_transaksi_masuk"
                      onChange={(e) => setTglTransaksiMasuk(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Tanggal Transaksi Keluar */}
                  <div>
                    <label
                      htmlFor="tgl_transaksi_keluar"
                      className="block text-sm font-medium text-gray-700 text-[16px]"
                    >
                      Tanggal Transaksi Keluar
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="tgl_transaksi_keluar"
                      name="tgl_transaksi_keluar"
                      onChange={(e) => setTglTransaksiKeluar(e.target.value)}
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
                  to={"/admin/data_transaksi"}
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
