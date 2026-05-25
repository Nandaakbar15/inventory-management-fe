import NavBarAdmin from "@/components/NavbarAdmin";
import SideBarAdmin from "@/components/SidebarAdmin";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function DetailSupplier() {
  const { id } = useParams();
  const [nameSupplier, setNameSupplier] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchSupplierById = async () => {
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

        const { name, contact_person, phone, address } = response.data.data;

        setNameSupplier(name);
        setContactPerson(contact_person);
        setPhone(phone);
        setAddress(address);
      } catch (error) {
        console.error("Error : ", error);
      }
    };

    fetchSupplierById();
  }, [id]);

  return (
    <div className="flex h-screen bg-white">
      <SideBarAdmin />
      <div className="flex flex-1 flex-col">
        <NavBarAdmin />
        <div className="flex-1 p-6 overflow-y-auto mt-7">
          <h1 className="font-medium text-3xl">Detail Supplier</h1>

          <div className="mt-4 relative bg-neutral-primary-soft max-w-xs w-full p-6 border border-default rounded-base shadow-xs">
            <div className="flex flex-col">
              <img
                className="w-24 h-24 mb-6 rounded-full"
                src="/images/dummy-profile.jpg"
                alt={nameSupplier}
              />
              <h5 className="mb-0.5 text-xl font-semibold tracking-tight text-heading">
                {nameSupplier}
              </h5>
              <p className="font-semibold">Contact Person : {contactPerson}</p>
              <p className="font-semibold">Phone Number : {phone}</p>
              <p className="font-semibold">Address : {address}</p>
              <div className="flex mt-4 md:mt-6 gap-4">
                <Link to={"/admin/data_suppliers"}>
                  <button
                    type="button"
                    className="inline-flex self-start w-auto text-body text-white bg-slate-500 box-border border border-default-medium hover:bg-slate-700 hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-lg font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none"
                  >
                    Kembali
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
