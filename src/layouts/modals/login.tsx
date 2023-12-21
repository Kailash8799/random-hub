import { useCallback, useState } from "react";
import Modal from "./modal";
import type { RootState } from "@/redux/store";
import { onClose } from "@/redux/features/login/loginSlice";
import { onOpen } from "@/redux/features/signup/signupSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const LoginModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = () => {
    setIsLoading(true);
  };
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: RootState) => state.loginstate.isOpen);
  const onToggle = useCallback(() => {
    console.log("HEllo");
    dispatch(onClose());
    dispatch(onOpen());
  }, [dispatch]);
  const body = <div></div>;
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
        onSubmit={onSubmit}
        body={body}
        disabled={isLoading}
        footer={footer}
        onClose={onClose}
      />
    </>
  );
};

export default LoginModal;
