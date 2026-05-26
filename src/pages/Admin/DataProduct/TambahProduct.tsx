/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NavBarAdmin from "@/components/NavbarAdmin";
import SideBarAdmin from "@/components/SidebarAdmin";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Categories } from "@/pages/types/Categories";
import Modal from "@/components/Modal";

export default function FormTambahProdukPage() {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [formData, setFormData] = useState({
    category_id: "",
    sku: "",
    name: "",
    description: "",
    min_stock: 0,
    purchase_price: 0,
    sell_price: 0,
  });

  const [image, setImage] = useState<File | null>(null);

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
        setCategories(res.data.data.data);
      } catch (error) {
        console.error("Error : ", error);
      }
    };
    fetchCategories();
  }, []);

  const AddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const dataToSend = new FormData();

      dataToSend.append("category_id", formData.category_id);
      dataToSend.append("sku", formData.sku);
      dataToSend.append("name", formData.name);
      dataToSend.append("description", formData.description);
      dataToSend.append("min_stock", formData.min_stock.toString());
      dataToSend.append("purchase_price", formData.purchase_price.toString());
      dataToSend.append("sell_price", formData.sell_price.toString());

      if (image) {
        dataToSend.append("image", image);
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin/products/createProduct",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setMessage(response.data.message);
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate("/admin/data_products");
      }, 2000);
    } catch (error) {
      console.error("Gagal tambah produk:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]); // Ambil file pertama yang di-upload
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
          <h1 className="font-medium text-3xl">Form Tambah Produk</h1>
          <div className="mx-auto mt-10 max-w">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  Isi Form di bawah ini untuk menambahkan data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={AddProduct} className="space-y-4 p-6">
                  {/* Dropdown Kategori */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Kategori <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category_id"
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                      required
                    >
                      <option value="">Pilih Kategori</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* SKU & Nama */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        SKU (Kode Barang){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="sku"
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Gambar Produk <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nama Produk <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                        required
                      />
                    </div>
                  </div>

                  {/* Harga */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Harga Beli <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="purchase_price"
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Harga Jual <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="sell_price"
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Minimal Stok <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="min_stock"
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Deskripsi <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                      rows={3}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Simpan Produk
                  </button>
                </form>
              </CardContent>
              <CardFooter>
                <Button variant={"secondary"} className="hover:bg-slate-400">
                  <Link to={"/admin/data_products"}>Kembali</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
