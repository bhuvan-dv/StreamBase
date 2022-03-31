import { useRoutes } from "react-router-dom";
import Login from "../components/authComponent/Login";
import Signup from "../components/authComponent/Signup";
import MyAccount from "../components/profile/MyAccount";
import MyProfile from "../components/profile/MyProfile";
import UploadProfilePhoto from "../components/profile/UploadProfilePhoto";
import Home from "../pages/home/Home";
import NotFound from "../pages/notFound/NotFound";
import PasswordReset from "../components/authComponent/PasswordReset";
import PhoneAuth from "../components/authComponent/PhoneAuth";
import ProtectedRoute from "../helpers/ProtectedRoute";
import UpdatePassword from "../components/profile/UpdatePassword";
import AddMovie from "../components/movies/AddMovie";
let StreamBaseRoutes = () => {
  let StreamRoutes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
    {
      path: "myprofile",
      element: (
        <ProtectedRoute>
          <MyProfile />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "upload-photo",
          element: <UploadProfilePhoto />,
        },
        {
          path: "my-account",
          element: <MyAccount />,
        },
        {
          path: "update-password",
          element: <UpdatePassword />,
        },
      ],
    },
    {
      path: "password-reset",
      element: <PasswordReset />,
    },
    {
      path: "phone-auth",
      element: <PhoneAuth />,
    },
    {
      path: "upload-movie",
      element: (
        <ProtectedRoute>
          <AddMovie />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return StreamRoutes;
};
export default StreamBaseRoutes;
