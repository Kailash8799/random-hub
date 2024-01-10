import { RouterProvider } from "react-router-dom";
import router from "@/routes/route";
import LoginModal from "@/layouts/modals/login";
import SignupModal from "@/layouts/modals/signup";
import ResetPasswordModal from "@/layouts/modals/resetpassword";
import { Toaster } from "@/components/ui/toaster";
import { onLogin } from "@/redux/features/authvalidation/loginstatus";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { jwtDecode } from "jwt-decode";
import { JWTDECODEPROPS } from "./types/props/jwtprops";

function App() {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(
    (state: RootState) => state.loginstatus.isLogin
  );

  useEffect(() => {
    const token = localStorage.getItem("logintoken");
    if (token) {
      const tokenDecoded: JWTDECODEPROPS = jwtDecode(token);
      const data = {
        gender: tokenDecoded?.gender,
        isLogin: true,
        location: tokenDecoded?.location,
        premiumuser: tokenDecoded?.premiumuser as boolean,
        username: tokenDecoded?.name,
        interest: tokenDecoded?.interest,
        email: tokenDecoded?.email
      };
      dispatch(onLogin(data));
    }
  }, [dispatch]);

  return (
    <>
      <Toaster />
      {!isLogin && <ResetPasswordModal />}
      {!isLogin && <LoginModal />}
      {!isLogin && <SignupModal />}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
