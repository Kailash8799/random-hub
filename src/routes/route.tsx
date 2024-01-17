import About from "@/pages/about/about";
import Contact from "@/pages/contact/contact";
import Home from "@/pages/home/home";
import Policy from "@/pages/policy/policy";
import Pricing from "@/pages/pricing/pricing";
import Safety from "@/pages/safety/safety";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout";
import Videochat from "@/pages/videochat/videochat";
import EmailVerify from "@/pages/emailverify/verify";
import ForgotPassword from "@/pages/forgotpassword/password";
import Error from "@/pages/error/error";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <Layout children />,
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
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "privacypolicy",
        element: <Policy />,
      },
      {
        path: "verifyemail",
        element: <EmailVerify />,
      },
      {
        path: "resetpassword",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: "/videochat",
    element: <Videochat />,
  },
  {
    path: "*",
    element: <Error />
  }
]);

export default router;
