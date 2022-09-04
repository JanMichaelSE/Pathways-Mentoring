import { Route, Routes } from "react-router-dom";

import Navbar from "../components/Admin/AdminNavbar/admin-navbar";
import ManageUsers from "@/pages/Admin/Manage-Users.jsx/manage-users";
import AdminProfile from "@/pages/Admin/Profile/admin-profile";
import IdleTimerContainer from "@/components/common/IdleTimerContainer/idle-timer-container";

function AdminRouter() {
  return (
    <>
      <Navbar />
      <div className="page-bg">
        <IdleTimerContainer />
        <Routes>
          <Route path="/" element={<ManageUsers />} />
          <Route path="/profile" element={<AdminProfile />} />
        </Routes>
      </div>
    </>
  );
}

export default AdminRouter;
