import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./students-navbar.module.css";

export default function Navbar() {
  return (
    <Fragment>
      <nav className={styles.nav}>
        <div className={styles.logoContainer}>
          <Link className={styles.LogoLink} to="/">
            <img src="/assets/Pathway_logo_small.png" alt="Pathways" />
          </Link>
        </div>
        <div className={styles.navLinksContainer}>
          <Link className={styles.navLink} to="/student/assessments">
            Assessments
          </Link>
          <Link className={styles.navLink} to="/student/records">
            Records
          </Link>
          <Link className={styles.navLink} to="/student/mentors">
            Mentors
          </Link>
          <Link className={styles.navLink} to="/student/contact-us">
            Contact Us
          </Link>
        </div>
        <div className={styles.profileContainer}>
          <img
            src="/assets/Doorbell.svg"
            alt="NotificationBell"
            className={styles.LogoLink}
          />
          <Link className={styles.LogoLink} to="/student/profile">
            <img src="/assets/Avatars.png" alt="profile" />
          </Link>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
}
