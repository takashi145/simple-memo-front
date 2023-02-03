import { Routes, Route } from "react-router-dom"
import Main from "./pages/Main"
import Login from './pages/Login';
import Register from './pages/Register';
import AuthLayout from "./layouts/AuthLayout";
import useAuthContext from "./context/auth";
import GuestLayout from "./layouts/GuestLayout";
import Header from "./components/Header";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { loading } = useAuthContext();

  if(!loading) {
    return (
      <div className="bg-gray-200 flex flex-col justify-center items-center h-screen">
        Loading...
        <div className="mt-4 animate-ping h-6 w-6 bg-blue-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <ToastContainer 
        autoClose={3000}
        transition={Zoom}
      />
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/password-reset/:token" element={<ResetPassword />}></Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Main />}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
