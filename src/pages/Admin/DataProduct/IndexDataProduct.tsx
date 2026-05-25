/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent } from "@/components/ui/card";
import NavBarAdmin from "@/components/NavbarAdmin";
import SideBarAdmin from "@/components/SidebarAdmin";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Product } from "@/pages/types/Product";

import axios from "axios";

import { useCallback, useEffect, useState } from "react";

import Modal from "@/components/Modal";

export default function IndexDataProductAdminPages() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [pagination, setPaginations] = useState({
    current_page: 1,
    last_page: 1,
  });

  const getProducts = useCallback(async (page: number = 1) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/products/getAllProducts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setProducts(response.data.data.data);
      setPaginations({
        current_page: response.data.data.current_page,
        last_page: response.data.data.last_page,
      });
    } catch (error) {
      console.error("Error : ", error);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const deleteProduct = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/admin/products/deleteProduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMessage(response.data.message);
      setShowModal(true);

      getProducts();

      setTimeout(() => {
        setShowModal(false);
        navigate("/admin/data_product");
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
          <h1 className="font-medium text-3xl">Data Produk</h1>
          <h2 className="mt-4">
            <Link
              to={"/admin/tambah_produk"}
              className="inline-block rounded-lg shadow-lg px-4 py-2 text-white bg-blue-500 hover:bg-blue-700"
            >
              Tambah Produk
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
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        ID Category
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        SKU
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Gambar
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Nama Produk
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Min Stock
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Purchase Price
                      </TableHead>
                      <TableHead className="font-semibold text-[16px] px-4 py-2">
                        Sell Price
                      </TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((data) => (
                      <TableRow key={data.id}>
                        <TableCell className="font-medium border border-gray-300 px-4 py-2">
                          {data.category_id}
                        </TableCell>
                        <TableCell className="font-medium border border-gray-300 px-4 py-2">
                          {data.sku}
                        </TableCell>
                        <TableCell className="font-medium border border-gray-300 px-4 py-2">
                          <img
                            src={`http://127.0.0.1:8000/images/${data.image}`}
                            alt={data.name}
                            className="w-32"
                          />
                        </TableCell>
                        <TableCell className="font-medium border border-gray-300 px-4 py-2">
                          {data.name}
                        </TableCell>
                        <TableCell className="font-medium border border-gray-300 px-4 py-2">
                          $. {data.purchase_price}
                        </TableCell>
                        <TableCell className="font-medium border border-gray-300 px-4 py-2">
                          {data.min_stock}
                        </TableCell>
                        <TableCell className="font-medium border border-gray-300 px-4 py-2">
                          $. {data.sell_price}
                        </TableCell>
                        <TableCell className="border border-gray-300 px-4 py-2 space-x-2">
                          <Link
                            to={`/admin/edit_produk/${data.id}`}
                            className="inline-block rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                          >
                            Edit
                          </Link>

                          <Link
                            to={`/admin/detail_product/${data.id}`}
                            className="inline-block rounded-lg px-4 py-2 text-white shadow-lg bg-slate-500 hover:bg-slate-700"
                          >
                            Detail
                          </Link>

                          <button
                            className="inline-block rounded-lg px-4 py-2  bg-red-500 hover:bg-red-700 text-white"
                            onClick={() => deleteProduct(data.id)}
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
                    onClick={() => getProducts(pagination.current_page - 1)}
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
                    onClick={() => getProducts(pagination.current_page + 1)}
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
