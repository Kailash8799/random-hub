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

function App() {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(
    (state: RootState) => state.loginstatus.isLogin
  );

  useEffect(() => {
    const token = localStorage.getItem("logintoken");
    if (token) {
      dispatch(onLogin());
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
