import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="font-comfortaa">
      <div className="flex h-16 items-center px-4 mx-6">
        <MainNav className="hidden sm:block" />
        <h1 className="sm:hidden">TESTE</h1>
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
