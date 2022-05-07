import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { MdUploadFile, MdOutlineAccountCircle } from "react-icons/md";
import Styles from "./profile.module.css";
import { TiUserDelete } from "react-icons/ti";
import { deleteUser } from "firebase/auth";
import { AuthContext } from "../../api/AuthContext";
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
          <Link
            to="/user"
            style={{
              color: "#fff",
              fontWeight: "bold",
              textTransform: "uppercase",
              borderBottom: "3px solid #ffc107",
              background: "#333",
            }}
          >
            Account Setting
          </Link>
        </li>
        <li>
          <Link to="/user/my-account">
            <span>
              <MdOutlineAccountCircle />
            </span>
            <span> My Account</span>
          </Link>
        </li>
        <li>
          <Link to="/user/upload-photo">
            <span>
              <MdUploadFile />
            </span>
            <span> Upload Photo</span>
          </Link>
        </li>
        <li>
          <Link to="/user/update-password">
            <span>
              <MdUploadFile />
            </span>
            <span> Update Password</span>
          </Link>
        </li>
        <li
          className={Styles.lastChild}
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
        <li>
          <Link
            to="/user/movie"
            style={{
              color: "#fff",
              fontWeight: "bold",
              textTransform: "uppercase",
              borderBottom: "3px solid #ffc107",
              background: "#333",
            }}
          >
            Movies
          </Link>
        </li>
        <li>
          <Link to="/user/movie/upload-movie">
            <span>
              <MdUploadFile />
            </span>
            <span> Upload Movies</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
