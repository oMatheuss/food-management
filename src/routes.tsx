import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/home";
import Login, { action as LoginAction } from "@/pages/login";
import Layout from "@/components/layout";
import Foods, { loader as FoodsLoader } from "@/pages/foods";
import Settings from "@/pages/settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/foods",
        element: <Foods/>,
        loader: FoodsLoader
      },
      {
        path: "/settings",
        element: <Settings/>
      }
    ]
  },
  {
    path: "login",
    element: <Login/>,
    action: LoginAction
  }
]);

export default router;
