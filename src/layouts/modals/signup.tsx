import { useCallback, useState } from "react";
import Modal from "./modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { onClose } from "@/redux/features/signup/signupSlice";
import { onOpen } from "@/redux/features/login/loginSlice";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const SignupModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { toast } = useToast();

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: RootState) => state.signupstate.isOpen);
  const onToggle = useCallback(() => {
    dispatch(onClose());
    dispatch(onOpen());
  }, [dispatch]);

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      if (username.length < 4 || email.length < 5 || password.length < 7) {
        toast({
          title: "All fields required are reqiured",
          description:
            "username email and password required 5,6,8 character respectively",
        });
        setIsLoading(false);
        return;
      }
      const data = {
        username,
        email,
        password,
      };
      const res = await axios({
        method: "post",
        url: `${import.meta.env.VITE_RANDOMHUB_BACKEND}/v1/users/signup`,
        data: data,
      });
      if (res?.statusText !== "OK") {
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
        setemail("");
        setpassword("");
        setusername("");
        setIsLoading(false);
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
  }, [email, password, toast, username]);

  const onSecondaryAction = useCallback(() => {
    setIsLoading(true);
  }, []);

  const body = (
    <div>
      <div>
        <input
          placeholder="username"
          className=" focus:border-[1px] border-[1px] focus:outline-none outline-none border-black placeholder:text-black w-full p-3 rounded-lg"
          value={username}
          onChange={(e) => {
            setusername(e.target.value);
          }}
        />
      </div>
      <div className="mt-6">
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
    <div className="">
      <div className="text-center justify-center">
        Already have an account?{" "}
        <span className="cursor-pointer font-semibold" onClick={onToggle}>
          Login
        </span>{" "}
      </div>
    </div>
  );
  return (
    <>
      <Modal
        title="Signup"
        isOpen={isOpen}
        actionLabel="Signup"
        onSubmit={onSubmit}
        secondaryAction={onSecondaryAction}
        secondaryLabel="Google"
        body={body}
        disabled={isLoading}
        footer={footer}
        onClose={onClose}
      />
    </>
  );
};

export default SignupModal;
