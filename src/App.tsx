import { RouterProvider } from "react-router-dom";
import router from "@/routes/route";
import LoginModal from "@/layouts/modals/login";
import SignupModal from "@/layouts/modals/signup";
import ResetPasswordModal from "@/layouts/modals/resetpassword";
import { Toaster } from "@/components/ui/toaster";
import { onLogin } from "@/redux/features/authvalidation/loginstatus";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = localStorage.getItem("logintoken");
    if (token) {
      dispatch(onLogin());
    }
  }, [dispatch]);
  return (
    <>
      <Toaster />
      <ResetPasswordModal />
      <LoginModal />
      <SignupModal />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
