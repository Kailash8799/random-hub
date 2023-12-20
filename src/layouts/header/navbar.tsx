// import React from 'react'

import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";

// import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <>
      <div className="sticky top-0 modal-backdrop flex md:px-5 items-center justify-between h-20 px-2 z-50">
        <Link to={"/"}>
          <div className="flex space-x-1 items-center justify-center">
            {/* <h1 className="font-extrabold  text- text-xl">Logo</h1> */}
            <h1 className="text-xl text-black font-bold">Random</h1>
            <h1 className="text-xl text-black bg-[#F49F0A] px-1.5 py-1 rounded-md font-bold">
              Hub
            </h1>
          </div>
        </Link>
        <div className="hidden items-center md:flex justify-center space-x-5">
          <Link to={"about"}>
            <h1 className="text-xl font-semibold cursor-pointer">About</h1>
          </Link>
          <Link to={"safety"}>
            <h1 className="text-xl font-semibold cursor-pointer">Safety</h1>
          </Link>
          <Link to={"pricing"}>
            <h1 className="text-xl font-semibold cursor-pointer">Pricing</h1>
          </Link>
        </div>
        <div>
          <Button color="black" asChild>
            <Link to={"login"}>Try for free</Link>
          </Button>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
