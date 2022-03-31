import { useContext } from "react";
import { AuthContext } from "./../api/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  let location = useLocation();
  let USER = useContext(AuthContext);

  if (sessionStorage.getItem("TOKEN")) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};
export default ProtectedRoute;
