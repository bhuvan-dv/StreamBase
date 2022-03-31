import React from "react";
import MainProfile from "./MainProfile";
import Styles from "./profile.module.css";
import SidebarMenu from "./SidebarMenu";
const MyProfile = () => {
  return (
    <section>
      <article className={Styles.profileBlock}>
        <div className={Styles.sidebarMenu}>
          <SidebarMenu />
        </div>
        <div className={Styles.mainProfile}>
          <MainProfile />
        </div>
      </article>{" "}
    </section>
  );
};

export default MyProfile;
