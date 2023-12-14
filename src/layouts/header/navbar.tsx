// import React from 'react'

import { Outlet } from "react-router-dom";

// import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <>
      <div className="flex md:px-5 items-center justify-between h-[8vh] bg-red-200">
        <div className="flex space-x-1 items-center justify-center">
          {/* <h1 className="font-extrabold  text- text-xl">Logo</h1> */}
          <h1 className="text-xl text-black font-bold">Random</h1>
        <h1 className="text-xl text-black bg-[#F49F0A] px-1.5 py-1 rounded-md font-bold">Hub</h1>
        </div>
        <div>{/* <h1>Pricing</h1> */}</div>
        <div>
          <button className="bg-black text-white nunito font-bold px-3 py-2 rounded-lg selection:bg-none">
            Try for free
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
