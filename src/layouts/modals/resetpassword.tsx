import { useCallback, useState } from "react";
import Modal from "./modal";
import type { RootState } from "@/redux/store";
import { onClose } from "@/redux/features/resetpassword/resetpasswordSlice";
import { onOpen } from "@/redux/features/login/loginSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const ResetPasswordModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setemail] = useState("");
  const { toast } = useToast();

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(
    (state: RootState) => state.resetpasswordstate.isOpen
  );
  const onToggle = useCallback(() => {
    dispatch(onClose());
    dispatch(onOpen());
  }, [dispatch]);

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      if (email.length < 5) {
        toast({
          title: "All fields required are reqiured",
          description: "email and password required 6,8 character respectively",
        });
        setIsLoading(false);
        return;
      }
      const data = {
        email,
      };
      const res = await axios({
        method: "post",
        url: `${
          import.meta.env.VITE_RANDOMHUB_BACKEND
        }/v1/users/forgot/sendemail`,
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
  }, [email, toast]);

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
    </div>
  );
  const footer = (
    <div>
      <div className="text-center justify-center">
        Back to Sign in?{" "}
        <span className="cursor-pointer" onClick={onToggle}>
          Login
        </span>
      </div>
    </div>
  );
  return (
    <>
      <Modal
        title="Reset password"
        isOpen={isOpen}
        actionLabel="Reset"
        onSubmit={onSubmit}
        body={body}
        disabled={isLoading}
        footer={footer}
        onClose={onClose}
      />
    </>
  );
};

export default ResetPasswordModal;
