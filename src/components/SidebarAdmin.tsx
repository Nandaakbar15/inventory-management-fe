import { Link } from "react-router";

export default function SideBarAdmin() {
  const pathname = location.pathname;

  // helper untuk styling aktif
  const linkClass = (href: string) =>
    `block rounded-md px-3 py-2 transition-colors ${
      pathname === href
        ? "bg-indigo-100 text-indigo-600 font-semibold"
        : "text-gray-700 hover:bg-gray-50"
    }`;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 mt-3">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 font-bold text-indigo-600">
          Inventory Management App
        </div>

        {/* Navigation */}
        <nav className="mt-5 px-2 space-y-1 text-sm font-medium">
          <div className="ml-10 mt-1 space-y-1">
            <Link to="/admin/dashboard" className={linkClass("/admin")}>
              Dashboard
            </Link>
            <Link
              to="/admin/data_users"
              className={linkClass("/admin/data_users")}
            >
              Data Users
            </Link>
            <Link
              to="/admin/data_products"
              className={linkClass("/admin/data_products")}
            >
              Data Product
            </Link>
            <Link
              to="/admin/data_suppliers"
              className={linkClass("/admin/data_suppliers")}
            >
              Data Suppliers
            </Link>
            <Link
              to="/admin/data_stock"
              className={linkClass("/admin/data_stock")}
            >
              Data Stock
            </Link>
            <Link
              to="/admin/data_categories"
              className={linkClass("/admin/data_categories")}
            >
              Data Categories
            </Link>
            <Link
              to={"/admin/data_penjualan"}
              className={linkClass("/admin/data_penjualan")}
            >
              Data Penjualan
            </Link>
            <Link
              to={"/admin/data_laporan"}
              className={linkClass("/admin/data_laporan")}
            >
              Data Laporan
            </Link>
            <Link
              to={"/admin/data_transaksi"}
              className={linkClass("/admin/data_transaksi")}
            >
              Data Transaksi
            </Link>
          </div>
        </nav>
      </aside>
    </div>
  );
}
