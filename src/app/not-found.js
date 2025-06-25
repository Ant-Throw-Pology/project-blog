import React from "react";

import styles from "./homepage.module.css";

function NotFound() {
  return <div className={styles.wrapper}>
    <h1>Not Found</h1>
    <p>The requested resource could not be found. Please check the URL and try again.</p>
  </div>;
}

export default NotFound;