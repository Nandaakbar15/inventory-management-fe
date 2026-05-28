/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
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

import { Link, useNavigate } from "react-router-dom";

import type { Laporan } from "@/pages/types/Laporan";

import axios from "axios";
import { useEffect, useState } from "react";

import Modal from "@/components/Modal";

export default function DataLaporanAdminPages() {
  const [report, setReport] = useState<Laporan[]>([]);

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });

  const navigate = useNavigate();

  const fetchReport = async (page: number = 1) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/laporan/getAllLaporan",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setReport(response.data.data.data);
      setPagination({
        current_page: response.data.data.current_page,
        last_page: response.data.data.last_page,
      });
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const deleteReport = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/admin/laporan/deleteLaporan/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMessage(response.data.message);
      setShowModal(true);

      // refresh the data
      fetchReport();

      setTimeout(() => {
        setShowModal(false);
        navigate("/admin/data_laporan");
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
          <h1 className="font-medium text-3xl">Halaman Data Laporan</h1>
          <h2 className="mt-3">
            <Link
              to={"/admin/tambah_laporan"}
              className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-blue-500 hover:bg-blue-700"
            >
              Tambah Data Laporan
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
                        ID Laporan
                      </TableHead>
                      <TableHead className="font-semibold px-4 py-2 text-[16px]">
                        Nama Produk
                      </TableHead>
                      <TableHead className="font-semibold px-4 py-2 text-[16px]">
                        Total Penjualan
                      </TableHead>
                      <TableHead className="font-semibold px-4 py-2 text-[16px]">
                        Tanggal Laporan
                      </TableHead>
                      <TableHead className="font-semibold px-4 py-2 text-[16px]">
                        Aksi
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.map((data) => (
                      <TableRow key={data.id}>
                        <TableCell className="font-medium border border-gray-300 px-4 py-2">
                          {data.id}
                        </TableCell>
                        <TableCell className="font-medium border border-gray-300 px-4 py-2">
                          {data.product?.name}
                        </TableCell>
                        <TableCell className="font-medium border border-gray-300 px-4 py-2">
                          {data.penjualan?.total_penjualan}
                        </TableCell>
                        <TableCell className="font-medium border border-gray-300 px-4 py-2">
                          {data.tgl_laporan.toString()}
                        </TableCell>
                        <TableCell className="space-x-2 border border-gray-300 px-4 py-2">
                          <Link
                            to={`/admin/edit_laporan/${data.id}`}
                            className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-blue-500 hover:bg-blue-700"
                          >
                            Edit
                          </Link>

                          <button
                            className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-red-500 hover:bg-red-700"
                            onClick={() => deleteReport(data.id)}
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
                    onClick={() => fetchReport(pagination.current_page - 1)}
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
                    onClick={() => fetchReport(pagination.current_page + 1)}
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
