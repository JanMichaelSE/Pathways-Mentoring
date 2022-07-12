import { Fragment } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./mentors-navbar.module.css";

export default function Navbar() {
  let location = useLocation();

  return (
    <Fragment>
      <nav className={styles.nav}>
        <div className={styles.logoContainer}>
          <img src="/assets/Pathway_logo_small.png" alt="Pathways" />
        </div>
        <div className={styles.navLinksContainer}>
          <Link
            className={
              location.pathname === "/mentor/assessments"
                ? styles.activeNavLink
                : styles.navLink
            }
            to="/mentor/assessments"
          >
            Assessments
          </Link>
          <Link
            className={
              location.pathname === "/mentor" ||
              location.pathname === "/mentor/records"
                ? styles.activeNavLink
                : styles.navLink
            }
            to="/mentor/records"
          >
            Records
          </Link>
          <Link
            className={
              location.pathname === "/mentor/students"
                ? styles.activeNavLink
                : styles.navLink
            }
            to="/mentor/students"
          >
            Students
          </Link>
          <Link
            className={
              location.pathname === "/mentor/contact-us"
                ? styles.activeNavLink
                : styles.navLink
            }
            to="/mentor/contact-us"
          >
            Contact Us
          </Link>
        </div>
        <div className={styles.profileContainer}>
          <img
            src="/assets/Doorbell.svg"
            alt="NotificationBell"
            className={styles.LogoLink}
          />
          <Link className={styles.LogoLink} to="/mentor/profile">
            <img src="/assets/Avatars.png" alt="profile" />
          </Link>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
}
