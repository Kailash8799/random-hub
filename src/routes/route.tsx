import Navbar from "@/layouts/header/navbar";
import Home from "@/pages/home/home";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/chat",
    element: <Home />,
  },
]);

export default router;
