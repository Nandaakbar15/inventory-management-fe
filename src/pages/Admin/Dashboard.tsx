import Cards from "@/components/Cards";
import Cards2 from "@/components/Cards2";
import Cards3 from "@/components/Cards3";
import Cards4 from "@/components/Cards4";
import NavBarAdmin from "@/components/NavbarAdmin";
import SideBarAdmin from "@/components/SidebarAdmin";

export default function DashboardAdminPages() {
  return (
    <div className="flex h-screen bg-white">
      <SideBarAdmin />
      <div className="flex flex-1 flex-col">
        <NavBarAdmin />
        <div className="flex-1 p-6 overflow-y-auto mt-7">
          <h1 className="font-medium text-3xl">Welcome Admin</h1>
          <p>Ini adalah halaman admin</p>
          <div className="flex item-center mt-1.5">
            <Cards />
            <div className="mx-1.5">
              <Cards2 />
            </div>
            <div className="mx-1.5">
              <Cards3 />
            </div>
            <div className="mx-1.5">
              <Cards4 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
