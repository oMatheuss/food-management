import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="font-comfortaa">
      <div className="flex h-16 items-center mx-3">
        <MainNav className="hidden sm:mx-auto sm:block" />
        <h1 className="sm:hidden">Food Management</h1>
        <div className="sm:hidden ml-auto flex items-center space-x-4">
          <MobileNav />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
