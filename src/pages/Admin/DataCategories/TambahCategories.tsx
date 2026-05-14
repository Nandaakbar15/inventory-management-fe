/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import axios from "axios";
import NavBarAdmin from "@/components/NavbarAdmin";
import SideBarAdmin from "@/components/SidebarAdmin";
import { useState } from "react";
import Modal from "@/components/Modal";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function FormTambahCategories() {
  const [namesCategories, setNameCategories] = useState("");
  const [slugCategories, setSlugCategories] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const addCategories = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin/createCategories",
        {
          name: namesCategories,
          slug: slugCategories,
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
        navigate("/admin/data_categories");
        setShowModal(false);
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
          <h1 className="font-medium text-3xl">Form halaman tambah kategori</h1>
          <div className="mx-auto mt-10 max-w">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  Isi data form kategori
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={addCategories}
                  method="POST"
                  className="space-y-4 animate-slide-down"
                >
                  <div className="p-6">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 text-[16px]"
                    >
                      Nama Kategori
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      onChange={(e) => setNameCategories(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="p-6">
                    <label
                      htmlFor="slug"
                      className="block text-sm font-medium text-gray-700 text-[16px]"
                    >
                      Slug
                    </label>
                    <input
                      type="text"
                      id="slug"
                      name="slug"
                      onChange={(e) => setSlugCategories(e.target.value)}
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
                <Button variant={"secondary"} className="hover:bg-slate-400">
                  <Link to={"/admin/data_categories"}>Kembali</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
