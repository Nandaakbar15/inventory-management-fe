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
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import type { Stock } from "@/pages/types/Stock";

export default function DataStockAdminPages() {
  const [stocks, setStocks] = useState<Stock[]>([]);

  const [pagination, setPaginations] = useState({
    current_page: 1,
    last_page: 1,
  });

  const GetAllStock = useCallback(async (page: number = 1) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/stock/getAllStocks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setStocks(response.data.data.data);
      setPaginations({
        current_page: response.data.data.current_page,
        last_page: response.data.data.last_page,
      });
    } catch (error) {
      console.error("Error : ", error);
    }
  }, []);

  useEffect(() => {
    GetAllStock();
  }, [GetAllStock]);

  return (
    <div className="flex h-screen bg-white">
      <SideBarAdmin />
      <div className="flex flex-1 flex-col">
        <NavBarAdmin />
        <div className="flex-1 p-6 overflow-y-auto mt-7">
          <h1 className="font-medium text-3xl">Data Stock Produk</h1>
          <div className="mt-3">
            <h2>
              <Link
                to={"/admin/tambah_data_stock"}
                className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-blue-500 hover:bg-blue-700"
              >
                Tambah Data Stok Produk
              </Link>
            </h2>
          </div>
          <div className="overflow-x-auto">
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        ID Produk
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Jumlah Stok Produk
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Lokasi
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Aksi
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stocks.map((data) => (
                      <TableRow key={data.id}>
                        <TableCell className="font-medium border border-gray-300 text-[16px] px-4 py-2">
                          {data.product_id}
                        </TableCell>
                        <TableCell className="font-medium border border-gray-300 text-[16px] px-4 py-2">
                          {data.quantity}
                        </TableCell>
                        <TableCell className="font-medium border border-gray-300 text-[16px] px-4 py-2">
                          {data.location}
                        </TableCell>
                        <TableCell className="border border-gray-300 px-4 py-2 space-x-2">
                          <Link
                            to={`/admin/edit_data_stock/${data.id}`}
                            className="inline-block rounded-lg shadow-lg text-white px-4 py-2 bg-blue-500 hover:bg-blue-700"
                          >
                            Edit
                          </Link>

                          <button className="inline-block rounded-lg shadow-lg text-white px-4 py-2 bg-red-500 hover:bg-red-700">
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
                    onClick={() => GetAllStock(pagination.current_page - 1)}
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
                    onClick={() => GetAllStock(pagination.current_page + 1)}
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
