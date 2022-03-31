import React from "react";
import Styles from "./spinner.module.css";
const Spinner = () => {
  return (
    <main class={Styles.spinCont}>
      <div class={Styles.spinner}></div>
    </main>
  );
};

export default Spinner;
