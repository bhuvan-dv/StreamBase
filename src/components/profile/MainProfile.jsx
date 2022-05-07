import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import MyAccount from "./MyAccount";
const MainProfile = () => {
  let location = useLocation();
  return (
    <div>
      {location.pathname === "/user" ? <MyAccount /> : <Outlet />}
    </div>
  );
};

export default MainProfile;
