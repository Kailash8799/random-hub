import Navbar from "@/layouts/header/navbar";
import About from "@/pages/about/about";
import Home from "@/pages/home/home";
import Pricing from "@/pages/pricing/pricing";
import Safety from "@/pages/safety/safety";
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
      {
        path: "about",
        element: <About />,
      },
      {
        path: "safety",
        element: <Safety />,
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
    ],
  },
  {
    path: "/chat",
    element: <Home />,
  },
]);

export default router;
