/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card } from "@/components/ui/card";
import NavBarAdmin from "@/components/NavbarAdmin";
import SideBarAdmin from "@/components/SidebarAdmin";
import type { User } from "@/pages/types/User";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Modal from "@/components/Modal";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

export default function IndexDataUsersPages() {
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const getUsers = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/users/getAllUsers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error : ", error);
    }
  }, []);

  const deleteUser = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/admin/users/deleteUser/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMessage(response.data.message);
      setShowModal(true);

      //   refresh the data
      getUsers();

      setTimeout(() => {
        setShowModal(false);
        navigate("/admin/users");
      }, 2000);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="flex h-screen bg-white">
      <SideBarAdmin />
      <div className="flex flex-1 flex-col">
        <NavBarAdmin />
        <div className="flex-1 p-6 overflow-y-auto mt-7">
          <h1 className="font-medium text-3xl">Data Users</h1>
          <div className="overflow-x-auto">
            <Modal show={showModal} onClose={() => setShowModal(false)}>
              <p className="text-center text-gray-700">{message}</p>
            </Modal>
            <Card>
              <Table>
                <TableHeader>
                  <TableHead className="font-semibold text-[16px] px-4 py-2">
                    Username
                  </TableHead>
                  <TableHead className="font-semibold text-[16px] px-4 py-2">
                    Email
                  </TableHead>
                  <TableHead className="font-semibold text-[16px] px-4 py-2">
                    Aksi
                  </TableHead>
                </TableHeader>
                <TableBody>
                  {users.map((data) => (
                    <TableRow key={data.id}>
                      <TableCell className="font-medium text-[16px] border border-gray-300 px-4 py-2">
                        {data.name}
                      </TableCell>
                      <TableCell className="font-medium text-[16px] border border-gray-300 px-4 py-2">
                        {data.email}
                      </TableCell>
                      <TableCell className="border border-gray-300 px-4 py-2 space-x-2">
                        <button className="inline-block rounded-lg bg-slate-400 px-4 py-2 text-white hover:bg-slate-600">
                          Detail User
                        </button>
                        <button
                          className="inline-block rounded-lg px-4 py-2  bg-red-500 hover:bg-red-700 text-white"
                          onClick={() => deleteUser(data.id)}
                        >
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
