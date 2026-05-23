/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import NavBarAdmin from "@/components/NavbarAdmin";
import SideBarAdmin from "@/components/SidebarAdmin";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "@/components/Modal";

export default function FormEditDataSupplier() {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [nameSupplier, setNameSupplier] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [addressSupplier, setAddressSupplier] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getSupplierById = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://127.0.0.1:8000/api/admin/suppliers/getSuppliersById/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const { name, contact_person, address, phone } = response.data.data;

        setNameSupplier(name);
        setContactPerson(contact_person);
        setAddressSupplier(address);
        setPhone(phone);
      } catch (error) {
        console.error("Error : ", error);
      }
    };

    getSupplierById();
  }, [id]);

  const EditSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://127.0.0.1:8000/api/admin/suppliers/updateSupplier/${id}`,
        {
          name: nameSupplier,
          contact_person: contactPerson,
          phone: phone,
          address: addressSupplier,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMessage(response.data.message);
      setShowModal(true);

      // clear the data
      setNameSupplier("");
      setContactPerson("");
      setPhone("");
      setAddressSupplier("");

      setTimeout(() => {
        setShowModal(false);
        navigate("/admin/data_suppliers");
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
          <h1 className="font-medium text-3xl">Form edit data supplier</h1>
          <div className="mx-auto mt-10 max-w">
            <Card>
              <CardContent>
                <form onSubmit={EditSupplier} className="space-y-4 p-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nama
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={nameSupplier}
                      onChange={(e) => setNameSupplier(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Kontak <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="contact_person"
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nomor Telepon <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Alamat <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={addressSupplier}
                        onChange={(e) => setAddressSupplier(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Simpan Data
                  </button>
                </form>
              </CardContent>
              <CardFooter>
                <div>
                  <Link to={"/admin/data_suppliers"}>
                    <button className="inline-block rounded-lg shadow-lg text-white bg-slate-500 hover:bg-slate-700 px-4 py-2">
                      Kembali
                    </button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
