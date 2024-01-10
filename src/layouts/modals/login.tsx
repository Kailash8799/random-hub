import { useCallback, useState } from "react";
import Modal from "./modal";
import type { RootState } from "@/redux/store";
import { onClose } from "@/redux/features/login/loginSlice";
import { onOpen } from "@/redux/features/signup/signupSlice";
import { onOpen as onOpenForgot } from "@/redux/features/resetpassword/resetpasswordSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { onLogin } from "@/redux/features/authvalidation/loginstatus";
import { jwtDecode } from "jwt-decode";
import { JWTDECODEPROPS } from "@/types/props/jwtprops";

const LoginModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { toast } = useToast();

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: RootState) => state.loginstate.isOpen);

  const onToggle = useCallback(() => {
    dispatch(onClose());
    dispatch(onOpen());
  }, [dispatch]);

  const onToggleToForgot = useCallback(() => {
    dispatch(onClose());
    dispatch(onOpenForgot());
  }, [dispatch]);

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      if (email.length < 5 || password.length < 7) {
        toast({
          title: "All fields required are reqiured",
          description: "email and password required 6,8 character respectively",
        });
        setIsLoading(false);
        return;
      }
      const data = {
        email,
        password,
      };
      const res = await axios({
        method: "post",
        url: `${import.meta.env.VITE_RANDOMHUB_BACKEND}/v1/users/signin`,
        data: data,
      });
      if (res?.status !== 200) {
        toast({
          title: "Error occured!",
          description: "",
        });
        setIsLoading(false);
        return;
      }
      if (res?.data?.success) {
        toast({
          title: res?.data?.message,
          description: "",
        });
        localStorage.setItem("logintoken", res?.data?.token);
        const tokenDecoded: JWTDECODEPROPS = jwtDecode(res?.data?.token);
        const data = {
          gender: tokenDecoded?.gender,
          isLogin: true,
          location: tokenDecoded?.location,
          premiumuser: tokenDecoded?.premiumuser as boolean,
          username: tokenDecoded?.name,
          interest: tokenDecoded?.interest,
          email:tokenDecoded?.email
        };
        setemail("");
        setpassword("");
        setIsLoading(false);
        dispatch(onClose());
        dispatch(onLogin(data));
        return;
      } else {
        toast({
          title: res?.data?.message,
          description: "",
        });
        setIsLoading(false);
        return;
      }
    } catch (error) {
      toast({
        title: "Error occured!",
        description: "",
      });
      setIsLoading(false);
      return;
    }
  }, [dispatch, email, password, toast]);

  const onSecondaryAction = useCallback(() => {
    setIsLoading(false);
  }, []);

  const body = (
    <div>
      <div>
        <input
          placeholder="email"
          className=" focus:border-[1px] border-[1px] focus:outline-none outline-none border-black placeholder:text-black w-full p-3 rounded-lg"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
      </div>
      <div className="mt-6">
        <input
          placeholder="password"
          className=" focus:border-[1px] border-[1px] focus:outline-none outline-none border-black placeholder:text-black w-full p-3 rounded-lg"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
      </div>
    </div>
  );
  const footer = (
    <div>
      <div className="text-center justify-center">
        Dont have an account?{" "}
        <span className="cursor-pointer" onClick={onToggle}>
          Sign up here
        </span>
      </div>
      <div className="text-center justify-center mt-3">
        Forgot Password?{" "}
        <span className="cursor-pointer" onClick={onToggleToForgot}>
          reset here
        </span>
      </div>
    </div>
  );
  return (
    <>
      <Modal
        title="Login"
        isOpen={isOpen}
        actionLabel="Signin"
        secondaryLabel="Google"
        onSubmit={onSubmit}
        secondaryAction={onSecondaryAction}
        body={body}
        disabled={isLoading}
        footer={footer}
        onClose={onClose}
      />
    </>
  );
};

export default LoginModal;
