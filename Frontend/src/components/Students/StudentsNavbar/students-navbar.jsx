import { Fragment } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./students-navbar.module.css";

function StudentNavbar() {
  let location = useLocation();

  return (
    <Fragment>
      <nav className={styles.nav}>
        <div>
          <img
            src="/assets/Pathway_logo_small.png"
            alt="Pathways"
            className={styles.pathwaysLogo}
          />
        </div>

        <div className={styles.navLinksContainer}>
          <Link
            className={
              location.pathname === "/student/assessments"
                ? styles.activeNavLink
                : styles.navLink
            }
            to="/student/assessments"
          >
            Assessments
          </Link>
          <Link
            className={
              location.pathname === "/student" ||
              location.pathname === "/student/records"
                ? styles.activeNavLink
                : styles.navLink
            }
            to="/student/records"
          >
            Records
          </Link>
          <Link
            className={
              location.pathname === "/student/mentors"
                ? styles.activeNavLink
                : styles.navLink
            }
            to="/student/mentors"
          >
            Mentors
          </Link>
          <Link
            className={
              location.pathname === "/student/contact-us"
                ? styles.activeNavLink
                : styles.navLink
            }
            to="/student/contact-us"
          >
            Contact Us
          </Link>

          <img
            src="/assets/Doorbell.svg"
            alt="NotificationBell"
            className={styles.logoLink}
          />
          <Link to="/student/profile">
            <img
              src="/assets/Avatars.png"
              alt="profile"
              className={styles.logoLink}
            />
          </Link>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
}

export default StudentNavbar;
