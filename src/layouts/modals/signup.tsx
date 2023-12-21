import { useCallback, useState } from "react";
import Modal from "./modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { onClose } from "@/redux/features/signup/signupSlice";
import { onOpen } from "@/redux/features/login/loginSlice";

const SignupModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = () => {
    setIsLoading(true);
  };

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: RootState) => state.signupstate.isOpen);
  const onToggle = useCallback(() => {
    dispatch(onClose());
    dispatch(onOpen());
  }, [dispatch]);
  const body = <div></div>;
  const footer = (
    <div className="mt-10">
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
        body={body}
        disabled={isLoading}
        footer={footer}
        onClose={onClose}
      />
    </>
  );
};

export default SignupModal;
