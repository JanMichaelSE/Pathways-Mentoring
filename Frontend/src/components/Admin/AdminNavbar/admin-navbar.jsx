import { Fragment } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import NavbarPopOverMenu from "@/components/common/NavbarPopOverMenu/navbar-popover-menu";
import PathwaysSmallLogo from "@/assets/Pathway_logo_small.png";

import styles from "./admin-navbar.module.css";

function AdminNavbar() {
  let location = useLocation();

  return (
    <Fragment>
      <nav className={styles.nav}>
        <div>
          <img src={PathwaysSmallLogo} alt="Pathways" className={styles.pathwaysLogo} />
        </div>

        <div className={styles.navLinksContainer}>
          <Link
            className={location.pathname === "/admin" ? styles.activeNavLink : styles.navLink}
            to="/admin"
          >
            Users
          </Link>
          <NavbarPopOverMenu classname={styles.logoLink} />
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
}

export default AdminNavbar;
