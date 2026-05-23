/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import NavBarAdmin from "@/components/NavbarAdmin";
import SideBarAdmin from "@/components/SidebarAdmin";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Categories } from "@/pages/types/Categories";
import Modal from "@/components/Modal";

export default function FormEditProdukPage() {
  const { id } = useParams();
  const [categories, setCategories] = useState<Categories[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    category_id: "",
    sku: "",
    name: "",
    description: "",
    min_stock: 0,
    purchase_price: 0,
    sell_price: 0,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file); // Simpan file binary untuk dikirim ke API
      setPreview(URL.createObjectURL(file)); // Buat blob URL untuk preview gambar baru
    }
  };

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
        setCategories(res.data.data);
      } catch (error) {
        console.error("Error : ", error);
      }
    };

    const getProductById = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://127.0.0.1:8000/api/admin/products/getProductsById/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const {
          category_id,
          sku,
          image: existingImage,
          name,
          description,
          min_stock,
          purchase_price,
          sell_price,
        } = res.data.data;

        setFormData({
          category_id,
          sku,
          name,
          description,
          min_stock,
          purchase_price,
          sell_price,
        });

        if (existingImage) {
          // Sesuaikan path-nya dengan storage Laravel kamu, contoh:
          setPreview(`http://127.0.0.1:8000/images/${existingImage}`);
        }
      } catch (error) {
        console.error("Error : ", error);
      }
    };

    fetchCategories();
    getProductById();
  }, [id]);

  const EditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const dataToSend = new FormData();

      dataToSend.append("_method", "PUT");

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
        `http://127.0.0.1:8000/api/admin/products/updateproduct/${id}`,
        dataToSend,
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
      console.error("Gagal edit produk:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          <h1 className="font-medium text-3xl">Form Edit Produk</h1>
          <div className="mx-auto mt-10 max-w">
            <Card>
              <CardContent>
                <form onSubmit={EditProduct} className="space-y-4 p-6">
                  {/* Dropdown Kategori */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Kategori
                    </label>
                    <select
                      name="category_id"
                      value={formData.category_id}
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
                        SKU (Kode Barang)
                      </label>
                      <input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                        required
                      />
                    </div>

                    {/* Kolom Upload Gambar */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Foto Produk (Kosongkan jika tidak ingin diubah)
                      </label>

                      {/* Tampilkan box preview jika link gambarnya tersedia */}
                      {preview && (
                        <div className="mt-2 mb-2">
                          <img
                            src={preview}
                            alt="Preview Produk"
                            className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                          />
                        </div>
                      )}

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nama Produk
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
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
                        Harga Beli
                      </label>
                      <input
                        type="number"
                        name="purchase_price"
                        value={formData.purchase_price}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Harga Jual
                      </label>
                      <input
                        type="number"
                        name="sell_price"
                        value={formData.sell_price}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Minimal Stok
                    </label>
                    <input
                      type="number"
                      name="min_stock"
                      value={formData.min_stock}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Deskripsi
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
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
