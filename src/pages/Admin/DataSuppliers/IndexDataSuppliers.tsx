/* eslint-disable react-hooks/set-state-in-effect */
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
import type { Supplier } from "@/pages/types/Supplier";
import { useCallback, useEffect, useState } from "react";

export default function DataSupplierAdminPages() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [pagination, setPaginations] = useState({
    current_page: 1,
    last_page: 1,
  });

  const GetAllSuppliers = useCallback(async (page: number = 1) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/suppliers/getAllSuppliers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSuppliers(response.data.data.data);
      setPaginations({
        current_page: response.data.data.current_page,
        last_page: response.data.data.last_page,
      });
    } catch (error) {
      console.error("Error : ", error);
    }
  }, []);

  const deleteSupplier = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/admin/suppliers/deleteSupplier/${id}`,
      );

      setMessage(response.data.message);
      setShowModal(true);

      GetAllSuppliers();

      setTimeout(() => {
        setShowModal(false);
        navigate("/admin/data_supplier");
      }, 2000);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  useEffect(() => {
    GetAllSuppliers();
  }, [GetAllSuppliers]);

  return (
    <div className="flex h-screen bg-white">
      <SideBarAdmin />
      <div className="flex flex-1 flex-col">
        <NavBarAdmin />
        <div className="flex-1 p-6 overflow-y-auto mt-7">
          <Modal show={showModal} onClose={() => setShowModal(false)}>
            <p className="text-center text-gray-700">{message}</p>
          </Modal>
          <h1 className="font-medium text-3xl">Data Supplier</h1>
          <h2 className="mt-4">
            <Link to={"/admin/tambah_data_supplier"}>
              <button className="inline-block rounded-lg shadow-lg text-white bg-blue-500 hover:bg-blue-700 px-4 py-2">
                Tambah Supplier
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
                        Contact Person
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Phone
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Address
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Aksi
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {suppliers.map((data) => (
                      <TableRow key={data.id}>
                        <TableCell className="font-medium text-[16px] px-4 py-2 border border-gray-300">
                          {data.name}
                        </TableCell>
                        <TableCell className="font-medium text-[16px] px-4 py-2 border border-gray-300">
                          {data.contact_person}
                        </TableCell>
                        <TableCell className="font-medium text-[16px] px-4 py-2 border border-gray-300">
                          {data.phone}
                        </TableCell>
                        <TableCell className="font-medium text-[16px] px-4 py-2 border border-gray-300">
                          {data.address}
                        </TableCell>
                        <TableCell className="space-x-2 border border-gray-300 px-4 py-2">
                          <Link
                            to={`/admin/edit_data_suppliers/${data.id}`}
                            className="inline-block text-white rounded-lg shadow-lg bg-blue-500 hover:bg-blue-700 px-4 py-2"
                          >
                            Edit
                          </Link>

                          <button
                            className="inline-block text-white rounded-lg shadow-lg bg-red-500 hover:bg-red-700 px-4 py-2"
                            onClick={() => deleteSupplier(data.id)}
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
                    onClick={() => GetAllSuppliers(pagination.current_page - 1)}
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
                    onClick={() => GetAllSuppliers(pagination.current_page + 1)}
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
