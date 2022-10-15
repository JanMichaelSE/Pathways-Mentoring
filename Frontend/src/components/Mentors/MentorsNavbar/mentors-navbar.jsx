import { Fragment } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import NavbarPopOverMenu from "@/components/common/NavbarPopOverMenu/navbar-popover-menu";
import PathwaysSmallLogo from "@/assets/Pathway_logo_small.png";

import styles from "./mentors-navbar.module.css";

function MentorNavbar() {
  let location = useLocation();

  return (
    <Fragment>
      <nav className={styles.nav}>
        <div>
          <img src={PathwaysSmallLogo} alt="Pathways" className={styles.pathwaysLogo} />
        </div>

        <div className={styles.navLinksContainer}>
          <Link
            className={location.pathname === "/mentor" ? styles.activeNavLink : styles.navLink}
            to="/mentor"
          >
            Records
          </Link>
          <Link
            className={
              location.pathname === "/mentor/students" ? styles.activeNavLink : styles.navLink
            }
            to="/mentor/students"
          >
            Students
          </Link>
          <Link
            className={
              location.pathname === "/mentor/contact-us" ? styles.activeNavLink : styles.navLink
            }
            to="/mentor/contact-us"
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

export default MentorNavbar;
