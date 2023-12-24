import { RouterProvider } from "react-router-dom";
import router from "@/routes/route";
import LoginModal from "@/layouts/modals/login";
import SignupModal from "@/layouts/modals/signup";
import ResetPasswordModal from "@/layouts/modals/resetpassword";
import { Toaster } from "@/components/ui/toaster";

function App() {
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
