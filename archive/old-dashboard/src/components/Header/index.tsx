import React from "react";
import styles from "@components/Header/Header.module.css";
import { i18n } from "@/lib/i18n";

const Header: React.FC = () => (
  <header className={styles.header} role="banner">
    <div
      className={styles.glowCircle}
      aria-hidden="true"
      role="presentation"
    ></div>
    <h1 className={styles.title}>{i18n.t("dashboardTitle")}</h1>
    <p className={styles.subtitle}>
      {i18n.t("dashboardDescription")}
    </p>
  </header>
);

export default Header;
