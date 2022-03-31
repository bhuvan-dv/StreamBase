import React from "react";
import Styles from "./navbar.module.css";
import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import Menu from "./Menu";
const Navbar = () => {
  let location = useLocation();
  // console.log(location);
  return (
    <section
      id={Styles.navbarBlock}
      className={location.pathname === "/" ? Styles.homeClass : ""}
    >
      <article className={Styles.navArticle}>
        <Logo />
        <Menu />
      </article>
    </section>
  );
};

export default Navbar;
