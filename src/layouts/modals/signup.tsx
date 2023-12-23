import { useCallback, useState } from "react";
import Modal from "./modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { onClose } from "@/redux/features/signup/signupSlice";
import { onOpen } from "@/redux/features/login/loginSlice";

const SignupModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const onSubmit = () => {
    setIsLoading(true);
  };

  const onSecondaryAction = () => {
    setIsLoading(true);
  };

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: RootState) => state.signupstate.isOpen);
  const onToggle = useCallback(() => {
    dispatch(onClose());
    dispatch(onOpen());
  }, [dispatch]);
  const body = (
    <div>
      <div>
          <input
            placeholder="username"
            className=" focus:border-[1px] border-[1px] focus:outline-none outline-none border-black placeholder:text-black w-full p-3 rounded-lg"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
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
