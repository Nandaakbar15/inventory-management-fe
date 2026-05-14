import Cards from "@/components/Cards";
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
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum,
            quas.
          </p>
          <div className="flex item-center mt-1.5">
            <Cards />
            <div className="mx-1.5">
              <Cards />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
