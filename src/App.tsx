import {RouterProvider} from 'react-router-dom'
import router from '@/routes/route';
import LoginModal from '@/layouts/modals/login';
import SignupModal from '@/layouts/modals/signup';

function App() {
  return (
    <>
      <LoginModal />
      <SignupModal/>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
