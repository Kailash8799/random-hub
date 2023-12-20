import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <>
      <div className="sticky top-0 modal-backdrop flex md:px-5 items-center justify-between h-20 px-2 z-50">
        <Link to={"/"}>
          <div className="flex space-x-0.5 items-center justify-center">
            {/* <h1 className="font-extrabold  text- text-xl">Logo</h1> */}
            <h1 className="text-2xl text-black font-bold">Random</h1>
            <h1 className="text-2xl text-black bg-[#F49F0A] px-1.5 py-1 rounded-md font-bold">
              hub
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
        <div className="flex items-center justify-center space-x-2">
          <Button color="black" asChild>
            <Link to={"login"}>Try for free</Link>
          </Button>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Menu />
              </SheetTrigger>
              <SheetContent>
                <div className="grid py-10 space-y-5">
                  <SheetClose asChild>
                    <Link to={"about"} className="hover:bg-slate-200/50 rounded-lg p-2 pl-4">
                      <h1 className="text-xl font-semibold cursor-pointer">
                        About
                      </h1>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to={"safety"} className="hover:bg-slate-200/50 rounded-lg p-2 pl-4">
                      <h1 className="text-xl font-semibold cursor-pointer">
                        Safety
                      </h1>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to={"privacypolicy"} className="hover:bg-slate-200/50 rounded-lg p-2 pl-4">
                      <h1 className="text-xl font-semibold cursor-pointer">
                        Privacy Policy
                      </h1>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to={"pricing"} className="hover:bg-slate-200/50 rounded-lg p-2 pl-4">
                      <h1 className="text-xl font-semibold cursor-pointer">
                        Pricing
                      </h1>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to={"contact"} className="hover:bg-slate-200/50 rounded-lg p-2 pl-4">
                      <h1 className="text-xl font-semibold cursor-pointer">
                        Contact
                      </h1>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to={"pricing"} className="hover:bg-slate-200/50 rounded-lg p-2 pl-4">
                      <h1 className="text-xl font-semibold cursor-pointer">
                        Log in
                      </h1>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to={"pricing"} className="hover:bg-slate-200/50 rounded-lg p-2 pl-4">
                      <h1 className="text-xl font-semibold cursor-pointer">
                        Sign up
                      </h1>
                    </Link>
                  </SheetClose>

                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
