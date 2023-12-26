import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

export default function ForgotPassword() {
  const isLogin = useAppSelector(
    (state: RootState) => state.loginstatus.isLogin
  );

  const searchParams = useSearchParams();
  const [loading, setloading] = useState(false);
  const [disabled, setdisabled] = useState(true);
  const [mounted, setmounted] = useState(false);
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [token, settoken] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (isLogin) {
      navigate("/", { replace: true });
    }
    setmounted(true);
    settoken(searchParams[0]?.get("token") as string);

    if (token) {
      setdisabled(false);
    }
  }, [isLogin, navigate, searchParams, token]);

  const resetPassword = useCallback(async () => {
    if (!mounted || !token) return;
    setloading(true);
    try {
      if (password.length < 7 || cpassword.length < 7) {
        toast({
          title: "Password length should be greater than 7 character",
        });
        setloading(false);
        return;
      }
      if (password !== cpassword) {
        toast({
          title: "Password and confirm password does't match",
        });
        setloading(false);
        return;
      }
      const res = await axios({
        method: "post",
        url: `${
          import.meta.env.VITE_RANDOMHUB_BACKEND
        }/v1/users/forgot/resetpassword`,
        data: { token, password },
      });
      if (res?.status !== 200) {
        toast({
          title: "Error occured!",
          description: "",
        });
        setloading(false);
        return;
      }
      if (res?.data?.success) {
        toast({
          title: res?.data?.message,
          description: "You can login now",
        });
        setpassword("");
        setcpassword("");
        navigate("/", { replace: true });
      } else {
        toast({
          title: res?.data?.message,
          description: "",
        });
      }
      setloading(false);
      return;
    } catch (error) {
      toast({
        title: "Some error accured!",
        description: "",
      });
      setloading(false);
    }
  }, [cpassword, mounted, navigate, password, toast, token]);

  if (!mounted)
    return <div className="w-screen h-screen bg-white dark:bg-black"></div>;
  return (
    <>
      <div className="w-full h-full min-h-screen bg-white py-28 sm:py-32 sm:px-4 dark:bg-black">
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="w-full p-10 rounded shadow bg-gradient-to-tl dark:from-slate-600 dark:to-black from-white to-slate-300 lg:w-1/3 md:w-1/2"
          >
            <p
              tabIndex={0}
              aria-label="Verify email address"
              className="text-2xl font-extrabold leading-6 text-gray-400 dark:text-gray-600"
            >
              Verify email address
            </p>

            <div className="flex items-center justify-between w-full py-5">
              <hr className="w-full bg-gray-400" />
            </div>

            <div>
              <input
                placeholder="Password"
                className=" focus:border-[1px] border-[1px] focus:outline-none outline-none border-black placeholder:text-black w-full p-3 rounded-lg"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </div>
            <div className="mt-4">
              <input
                placeholder="Confirm password"
                className=" focus:border-[1px] border-[1px] focus:outline-none outline-none border-black placeholder:text-black w-full p-3 rounded-lg"
                value={cpassword}
                onChange={(e) => {
                  setcpassword(e.target.value);
                }}
              />
            </div>
            <div className="mt-8">
              {loading ? (
                <button
                  aria-label="create my account"
                  className="items-center justify-center w-full py-2 text-xl font-bold leading-none text-center text-white transition-transform border rounded focus:ring-indigo-700 focus:outline-none dark:border-slate-700 bg-gradient-to-tl from-pink-500 to-blue-400 border-slate-200 hover:from-slate-500 hover:to-white"
                ></button>
              ) : (
                <button
                  disabled={disabled}
                  aria-label="create my account"
                  onClick={resetPassword}
                  className="relative
                  disabled:opacity-70
                  disabled:cursor-not-allowed
                  rounded-lg
                  hover:opacity-80
                  transition
                  w-full
                  bg-rose-500
                  border-rose-500
                  text-white
                  text-base
                  py-3
                  font-semibold
                  border-2"
                >
                  Reset Password
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
