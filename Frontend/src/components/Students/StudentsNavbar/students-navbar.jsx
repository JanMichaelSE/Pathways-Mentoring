import { Fragment } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import NavbarPopOverMenu from "@/components/common/NavbarPopOverMenu/navbar-popover-menu";
import PathwaysSmallLogo from "@/assets/Pathway_Logo_small.png";

import styles from "./students-navbar.module.css";

function StudentNavbar() {
  let location = useLocation();

  return (
    <Fragment>
      <nav className={styles.nav}>
        <div>
          <img src={PathwaysSmallLogo} alt="Pathways" className={styles.pathwaysLogo} />
        </div>

        <div className={styles.navLinksContainer}>
          <Link
            className={
              location.pathname === "/student/development-plan" ||
              location.pathname === "/student/smart-goal-template"
                ? styles.activeNavLink
                : styles.navLink
            }
            to="/student/development-plan"
          >
            IDP
          </Link>
          <Link
            className={
              location.pathname === "/student/assessments" ||
              location.pathname === "/student/assessment-results"
                ? styles.activeNavLink
                : styles.navLink
            }
            to="/student/assessments"
          >
            Assessments
          </Link>
          <Link
            className={location.pathname === "/student" ? styles.activeNavLink : styles.navLink}
            to="/student"
          >
            Records
          </Link>
          <Link
            className={
              location.pathname === "/student/mentors" ? styles.activeNavLink : styles.navLink
            }
            to="/student/mentors"
          >
            Mentors
          </Link>
          <Link
            className={
              location.pathname === "/student/contact-us" ? styles.activeNavLink : styles.navLink
            }
            to="/student/contact-us"
          >
            Contact Us
          </Link>
          <NavbarPopOverMenu classname={styles.logoLink} />
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
}

export default StudentNavbar;
