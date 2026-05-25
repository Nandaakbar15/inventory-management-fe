/* eslint-disable @typescript-eslint/no-unused-vars */
import SideBarAdmin from "@/components/SidebarAdmin";
import NavBarAdmin from "@/components/NavbarAdmin";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DetailProduct() {
  const { id } = useParams();
  const [nameProduct, setNameProduct] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [minStock, setMinStock] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://127.0.0.1:8000/api/admin/products/getProductsById/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const {
          name,
          sku,
          image,
          description,
          min_stock,
          purchase_price,
          sell_price,
        } = response.data.data;

        setNameProduct(name);
        setSku(sku);
        setDescription(description);
        setMinStock(min_stock);
        setPurchasePrice(purchase_price);
        setSellPrice(sell_price);
        setImage(image);
      } catch (error) {
        console.error("Error : ", error);
      }
    };

    fetchProductById();
  }, [id]);

  return (
    <div className="flex h-screen bg-white">
      <SideBarAdmin />
      <div className="flex flex-1 flex-col">
        <NavBarAdmin />
        <div className="flex-1 p-6 overflow-y-auto mt-7">
          <h1 className="font-medium text-3xl">Detail Produk</h1>
          <div className="mt-3 flex flex-col items-center bg-neutral-primary-soft p-6 border border-default shadow-lg md:flex-row md:max-w-xl md:max-w-x rounded-lg">
            <img
              className="object-cover w-full rounded-base h-64 md:h-auto md:w-48 mb-4 md:mb-0"
              src={`http://127.0.0.1:8000/images/${image}`}
              alt=""
            />
            <div className="flex flex-col justify-between md:p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-heading">
                {nameProduct}
              </h5>
              <p className="mb-6 text-body">SKU: {sku}</p>
              <p className="mb-6 text-body">Deskripsi: {description}</p>
              <div>
                <Link to={"/admin/dashboard"}>
                  <button
                    type="button"
                    className="inline-flex shadow-lg items-center w-auto text-body text-white bg-slate-400 box-border border border-default-medium hover:bg-slate-600 hover:text-heading focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none"
                  >
                    Kembali
                    <svg
                      className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
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
