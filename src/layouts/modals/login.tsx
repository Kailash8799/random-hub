import { useCallback, useState } from "react";
import Modal from "./modal";
import type { RootState } from "@/redux/store";
import { onClose } from "@/redux/features/login/loginSlice";
import { onOpen } from "@/redux/features/signup/signupSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const LoginModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: RootState) => state.loginstate.isOpen);
  const onToggle = useCallback(() => {
    dispatch(onClose());
    dispatch(onOpen());
  }, [dispatch]);

  const onSubmit = () => {
    setIsLoading(true);
  };
  const onSecondaryAction = () => {
    setIsLoading(true);
  };
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
