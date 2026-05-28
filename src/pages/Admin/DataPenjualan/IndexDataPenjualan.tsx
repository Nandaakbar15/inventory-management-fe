/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
import NavBarAdmin from "@/components/NavbarAdmin";
import SideBarAdmin from "@/components/SidebarAdmin";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Modal from "@/components/Modal";

import { Link, useNavigate } from "react-router-dom";

import type { Penjualan } from "@/pages/types/Penjualan";

import axios from "axios";
import { useEffect, useState } from "react";

export default function DataPenjualanAdminPages() {
  const [penjualan, setPenjualan] = useState<Penjualan[]>([]);

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [pagination, setPaginations] = useState({
    current_page: 1,
    last_page: 1,
  });

  const navigate = useNavigate();

  const fetchPenjualan = async (page: number = 1) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/penjualan/getAllPenjualan",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setPenjualan(response.data.data.data);
      setPaginations({
        current_page: response.data.data.current_page,
        last_page: response.data.data.last_page,
      });
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  const deletePenjualan = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/admin/penjualan/deleteDataPenjualan/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMessage(response.data.message);
      setShowModal(true);

      // refresh the data
      fetchPenjualan();

      setTimeout(() => {
        navigate("/admin/data_penjualan");
        setShowModal(false);
      }, 2000);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  useEffect(() => {
    fetchPenjualan();
  }, []);

  return (
    <div className="flex h-screen bg-white">
      <SideBarAdmin />
      <div className="flex flex-1 flex-col">
        <NavBarAdmin />
        <div className="flex-1 p-6 overflow-y-auto mt-7">
          <h1 className="font-medium text-3xl">Halaman Data Penjualan</h1>
          <h2 className="mt-4">
            <Link
              to={"/admin/tambah_data_penjualan"}
              className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-blue-500 hover:bg-blue-700"
            >
              Tambah Data Penjualan
            </Link>
          </h2>
          <div className="overflow-x-auto">
            <Modal show={showModal} onClose={() => setShowModal(false)}>
              <p className="text-center text-gray-700">{message}</p>
            </Modal>
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold px-4 py-2 text-[16px]">
                        ID Produk
                      </TableHead>
                      <TableHead className="font-semibold px-4 py-2 text-[16px]">
                        ID Kategori
                      </TableHead>
                      <TableHead className="font-semibold px-4 py-2 text-[16px]">
                        Total Penjualan
                      </TableHead>
                      <TableHead className="font-semibold px-4 py-2 text-[16px]">
                        Tanggal Penjualan
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {penjualan.map((data) => (
                      <TableRow key={data.id}>
                        <TableCell className="font-medium border border-gray-300 px-4 py-2">
                          {data.product_id}
                        </TableCell>
                        <TableCell className="font-medium border border-gray-300 px-4 py-2">
                          {data.category_id}
                        </TableCell>
                        <TableCell className="font-medium border border-gray-300 px-4 py-2">
                          {data.total_penjualan}
                        </TableCell>
                        <TableCell className="font-medium border border-gray-300 px-4 py-2">
                          {data.tgl_penjualan.toString()}
                        </TableCell>
                        <TableCell className="space-x-2 border border-gray-300 px-4 py-2">
                          <Link
                            to={`/admin/edit_data_penjualan/${data.id}`}
                            className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-blue-500 hover:bg-blue-700"
                          >
                            Edit
                          </Link>

                          <button
                            className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-red-500 hover:bg-red-700"
                            onClick={() => deletePenjualan(data.id)}
                          >
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Paginations */}
                <div className="flex justify-center items-center mt-6 space-x-2">
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={pagination.current_page === 1}
                    onClick={() => fetchPenjualan(pagination.current_page - 1)}
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Halaman {pagination.current_page} dari{" "}
                    {pagination.last_page}
                  </span>
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={pagination.current_page === pagination.last_page}
                    onClick={() => fetchPenjualan(pagination.current_page + 1)}
                  >
                    Next
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
