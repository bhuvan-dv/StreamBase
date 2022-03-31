import React from "react";
import { FaPhotoVideo } from "react-icons/fa";
import Styles from "../navbar/navbar.module.css";
const Logo = () => {
  return (
    <div className="logoBlock">
      <a href="#" className={Styles.logoBlockAnchor}>
        <span>
          <FaPhotoVideo className={Styles.logoBlockSpanIcon} />
        </span>
        <span style={{ textShadow: "rgb(255 255 255) 1px 1px" }}>
          Stream Base
        </span>
      </a>
    </div>
  );
};

export default Logo;
