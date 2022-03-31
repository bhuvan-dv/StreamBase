import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { MdUploadFile, MdOutlineAccountCircle } from "react-icons/md";
import Styles from "./profile.module.css";
import { TiUserDelete } from "react-icons/ti";
import { deleteUser } from "firebase/auth";
import { AuthContext } from "../../api/AuthContext";
import { async } from "@firebase/util";
const SidebarMenu = () => {
  let USER = useContext(AuthContext);
  let removeAcc = async () => {
    let deletedUser = await deleteUser(USER);
    if (window.confirm("Are you sure you want to delete this account?")) {
      window.sessionStorage.removeItem("TOKEN");
      window.location.assign("/signup");
      return deletedUser;
    }
  };
  return (
    <div className={Styles.SidebarMenu}>
      <ul>
        <li>
          <Link to="/myprofile/my-account">
            <span>
              <MdOutlineAccountCircle />
            </span>
            <span> My Account</span>
          </Link>
        </li>
        <li>
          <Link to="/myprofile/upload-photo">
            <span>
              <MdUploadFile />
            </span>
            <span> Upload Photo</span>
          </Link>
        </li>
        <li>
          <Link to="/myprofile/update-password">
            <span>
              <MdUploadFile />
            </span>
            <span> Update Password</span>
          </Link>
        </li>
        <li
          className="lastChild"
          onClick={removeAcc}
          style={{ cursor: "pointer" }}
        >
          <a to="/signup">
            <span>
              <TiUserDelete />
            </span>
            <span color="red"> Delete Account</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
