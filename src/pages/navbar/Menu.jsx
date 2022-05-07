import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Styles from "./navbar.module.css";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../../api/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../api/firebase";
import { toast } from "react-toastify";
import { BsFillPatchPlusFill } from "react-icons/bs";
const Menu = () => {
  let [toggle, setToggle] = useState(false);
  let USER = useContext(AuthContext);
  let toggleRef = useRef();
  let dropDownMenu = e => {
    setToggle(!toggle);
  };

  let LogOut = async () => {
    await signOut(auth);
    window.sessionStorage.removeItem("TOKEN");
    toast.success("successfully logged out ");
    window.location.assign("/login");
  };

  // useEffect(() => {
  //   document.addEventListener("mouseup", e => {
  //     let cont = document.getElementById("dropDown");
  //     // if (!cont.contains(e.target)) {
  //     //   cont.style.display = "none";
  //     //   e.stopPropagation();
  //     // }
  //   });
  // });

  let AuthenticatedUser = () => {
    return (
      <>
        <li style={{ padding: "0 5px" }}>
          <NavLink
            to={{ pathname: "/user/movie" }}
            className={Styles.navbarIconLink}
            id="upload"
          >
            <span className={Styles.movieplus}>
              <BsFillPatchPlusFill />
            </span>
            <span style={{ padding: "0 4px" }}>movie</span>
          </NavLink>
        </li>
        <li onClick={dropDownMenu} style={{ padding: "0 15px" }}>
          <NavLink
            to={{ pathname: "/" }}
            className={Styles.navbarIconLink}
            // activeClassName="active"
          >
            <span>
              <img
                src={USER.photoURL}
                alt={USER.displayName}
                className={Styles.navbarIcon}
              />
            </span>
            <span>{USER.displayName}</span>
          </NavLink>
          <div
            id="dropDown"
            ref={toggleRef}
            style={toggle ? { display: "block" } : { display: "none" }}
            className={Styles.dropDown}
          >
            <ul>
              <li>
                <NavLink to="/user">
                  <span>
                    <FaUser />
                  </span>
                  My Profile
                </NavLink>
              </li>
              <li></li>
            </ul>
          </div>
        </li>
        <li>
          <a href="#" onClick={LogOut} className={Styles.navbarAnchor}>
            Logout
          </a>
        </li>
      </>
    );
  };
  let AnonymousUser = () => {
    return (
      <>
        <li>
          <NavLink
            to={{ pathname: "/login" }}
            activeClassName="active"
            className={Styles.navbarAnchor}
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to={{ pathname: "/signup" }}
            activeClassName="active"
            className={Styles.navbarAnchor}
          >
            Signup
          </NavLink>
        </li>
      </>
    );
  };
  return (
    <div className={Styles.menu}>
      <ul>
        <li>
          <NavLink
            to={{ pathname: "/" }}
            activeClassName="active"
            className={Styles.navbarAnchor}
          >
            Home
          </NavLink>
        </li>
        {USER ? <AuthenticatedUser /> : <AnonymousUser />}
      </ul>
    </div>
  );
};

export default Menu;
