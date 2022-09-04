import { Fragment } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./admin-navbar.module.css";
import ProfilePopover from "@/components/common/ProfilePopOverNavbar/profile-popover-navbar";

function AdminNavbar() {
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
              location.pathname === "/admin"
                ? styles.activeNavLink
                : styles.navLink
            }
            to="/admin"
          >
            Users
          </Link>
          <ProfilePopover classname={styles.logoLink} />
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
}

export default AdminNavbar;
