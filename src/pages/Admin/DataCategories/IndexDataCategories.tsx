/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent } from "@/components/ui/card";
import NavBarAdmin from "@/components/NavbarAdmin";
import SideBarAdmin from "@/components/SidebarAdmin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import axios from "axios";
import Modal from "@/components/Modal";
import { Link, useNavigate } from "react-router-dom";

import type { Categories } from "@/pages/types/Categories";
import { useCallback, useEffect, useState } from "react";

export default function DataCategoriesAdminPages() {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const GetAllCategories = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/getAllCategories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setCategories(response.data.data);
    } catch (error) {
      console.error("Error : ", error);
    }
  }, []);

  useEffect(() => {
    GetAllCategories();
  }, []);

  const deleteCategory = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/admin/deleteCategories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMessage(response.data.message);
      setShowModal(true);

      // refresh the data
      GetAllCategories();

      setTimeout(() => {
        setShowModal(false);
        navigate("/admin/data_categories");
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
          <h1 className="font-medium text-3xl">Data Categories</h1>
          <h2 className="mt-4">
            <Link to={"/admin/tambah_categories"}>
              <button className="inline-block bg-blue-500 hover:bg-blue-700 text-white rounded-lg shadow-lg px-4 py-2">
                Tambah Kategori
              </button>
            </Link>
          </h2>
          <div className="overflow-x-auto">
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Name
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Slug
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Aksi
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((data) => (
                      <TableRow key={data.id}>
                        <TableCell className="font-medium border border-gray-300 px-4 py-2">
                          {data.name}
                        </TableCell>
                        <TableCell className="font-medium border border-gray-300 px-4 py-2">
                          {data.slug}
                        </TableCell>
                        <TableCell className="space-x-2 border border-gray-300 px-4 py-2">
                          <Link
                            to={`/admin/edit_categories/${data.id}`}
                            className="inline-block rounded-lg shadow-lg text-white bg-blue-500 hover:bg-blue-700 px-4 py-2"
                          >
                            Edit
                          </Link>
                          <button
                            className="inline-block rounded-lg shadow-lg text-white bg-red-500 hover:bg-red-700 px-4 py-2"
                            onClick={() => deleteCategory(data.id)}
                          >
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
