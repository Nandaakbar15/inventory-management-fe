import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPages from "./pages/Login";
import DashboardAdminPages from "./pages/Admin/Dashboard";
import IndexDataUsersPages from "./pages/Admin/DataUsers/IndexDataUsers";
import IndexDataProductAdminPages from "./pages/Admin/DataProduct/IndexDataProduct";
import FormTambahProdukPage from "./pages/Admin/DataProduct/TambahProduct";
import DataCategoriesAdminPages from "./pages/Admin/DataCategories/IndexDataCategories";
import DataSupplierAdminPages from "./pages/Admin/DataSuppliers/IndexDataSuppliers";
import FormTambahCategories from "./pages/Admin/DataCategories/TambahCategories";
import FormEditProdukPage from "./pages/Admin/DataProduct/EditDataProduct";
import FormTambahSupplier from "./pages/Admin/DataSuppliers/TambahSuppliers";
import FormEditDataSupplier from "./pages/Admin/DataSuppliers/EditDataSupplier";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />}></Route>
        <Route path="/login" element={<LoginPages />}></Route>
        <Route
          path="/admin/dashboard"
          element={<DashboardAdminPages />}
        ></Route>
        <Route
          path="/admin/data_users"
          element={<IndexDataUsersPages />}
        ></Route>
        <Route
          path="/admin/data_products"
          element={<IndexDataProductAdminPages />}
        ></Route>
        <Route
          path="/admin/tambah_produk"
          element={<FormTambahProdukPage />}
        ></Route>
        <Route
          path="/admin/edit_produk/:id"
          element={<FormEditProdukPage />}
        ></Route>
        <Route
          path="/admin/data_categories"
          element={<DataCategoriesAdminPages />}
        ></Route>
        <Route
          path="/admin/tambah_categories"
          element={<FormTambahCategories />}
        ></Route>
        <Route
          path="/admin/data_suppliers"
          element={<DataSupplierAdminPages />}
        ></Route>
        <Route
          path="/admin/tambah_data_supplier"
          element={<FormTambahSupplier />}
        ></Route>
        <Route
          path="/admin/edit_data_suppliers/:id"
          element={<FormEditDataSupplier />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
