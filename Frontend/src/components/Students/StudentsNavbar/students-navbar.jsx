import { Fragment } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from "@chakra-ui/react";
import styles from "./students-navbar.module.css";
import ProfilePopover from "@/components/common/ProfilePopOverNavbar/profile-popover-navbar";

function StudentNavbar() {
  let location = useLocation();

  const [isLessThan1100] = useMediaQuery("(max-width: 1100px)");

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
              location.pathname === "/student/development-plan"
                ? styles.activeNavLink
                : styles.navLink
            }
            to="/student/development-plan"
          >
            IDP
          </Link>
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
              location.pathname === "/student"
                ? styles.activeNavLink
                : styles.navLink
            }
            to="/student"
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
          <ProfilePopover classname={styles.logoLink} />
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
}

export default StudentNavbar;
