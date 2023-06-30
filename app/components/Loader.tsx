import React from "react";
import styles from "../styles/Loader.module.css";

const Loader = () => {
  return (
    <div className="">
      <svg viewBox="25 25 50 50" className={styles.svg}>
        <circle r="20" cy="50" cx="50" className={styles.circle}></circle>
      </svg>
    </div>
  );
};

export default Loader;
