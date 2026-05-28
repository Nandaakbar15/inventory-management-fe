/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
import NavBarAdmin from "@/components/NavbarAdmin";
import SideBarAdmin from "@/components/SidebarAdmin";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

import type { Transaksi } from "@/pages/types/Transaksi";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Modal from "@/components/Modal";

export default function DataTransaksiAdminPages() {
  const [transaksi, setTransaksi] = useState<Transaksi[]>([]);

  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const fetchDataTransaksi = async (page: number = 1) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/transaksi/getAllTransaksi",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTransaksi(response.data.data.data);
      setPagination({
        current_page: response.data.data.current_page,
        last_page: response.data.data.last_page,
      });
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  const deleteDataTransaksi = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/admin/transaksi/deleteDataTransaksi/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMessage(response.data.message);
      setShowModal(true);

      // refresh the data
      fetchDataTransaksi();

      setTimeout(() => {
        setShowModal(false);
        navigate("/admin/data_transaksi");
      }, 2000);
    } catch (error) {
      setMessage("Gagal menghapus data!");
      setShowModal(true);
      console.error("Error : ", error);
    }
  };

  useEffect(() => {
    fetchDataTransaksi();
  }, []);
  return (
    <div className="flex h-screen bg-white">
      <SideBarAdmin />
      <div className="flex flex-1 flex-col">
        <NavBarAdmin />
        <div className="flex-1 p-6 overflow-y-auto mt-7">
          <h1 className="font-medium text-3xl">Data Transaksi</h1>
          <h2 className="mt-2">
            <Link
              to={"/admin/tambah_data_transaksi"}
              className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-blue-500 hover:bg-blue-700"
            >
              Tambah Data Transaksi
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
                      <TableHead className="font-medium px-4 py-2 text-[16px]">
                        ID Transaksi
                      </TableHead>
                      <TableHead className="font-medium px-4 py-2 text-[16px">
                        Nama Produk
                      </TableHead>
                      <TableHead className="font-medium px-4 py-2 text-[16px]">
                        Total Penjualan
                      </TableHead>
                      <TableHead className="font-medium px-4 py-2 text-[16px]">
                        Tanggal Transaksi Masuk
                      </TableHead>
                      <TableHead className="font-medium px-4 py-2 text-[16px]">
                        Tanggal Transaksi Keluar
                      </TableHead>
                      <TableHead className="font-medium px-4 py-2 text-[16px]">
                        Aksi
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transaksi.map((data) => (
                      <TableRow key={data.id}>
                        <TableCell className="font-medium px-4 py-2 border border-gray-300">
                          {data.id}
                        </TableCell>
                        <TableCell className="font-medium px-4 py-2 border border-gray-300">
                          {data.product?.name}
                        </TableCell>
                        <TableCell className="font-medium px-4 py-2 border border-gray-300">
                          {data.penjualan?.total_penjualan}
                        </TableCell>
                        <TableCell className="font-medium px-4 py-2 border border-gray-300">
                          {data.tgl_transaksi_masuk.toString()}
                        </TableCell>
                        <TableCell className="font-medium px-4 py-2 border border-gray-300">
                          {data.tgl_transaksi_keluar.toString()}
                        </TableCell>
                        <TableCell className="space-x-2 px-4 py-2 border border-gray-300">
                          <Link
                            to={`/admin/edit_data_transaksi/${data.id}`}
                            className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-blue-500 hover:bg-blue-700"
                          >
                            Edit
                          </Link>

                          <button
                            className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-red-500 hover:bg-red-700"
                            onClick={() => deleteDataTransaksi(data.id)}
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
                    onClick={() =>
                      fetchDataTransaksi(pagination.current_page - 1)
                    }
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
                    onClick={() =>
                      fetchDataTransaksi(pagination.current_page + 1)
                    }
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
