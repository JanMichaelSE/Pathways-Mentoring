import { Route, Routes } from "react-router-dom";
import Navbar from "@/components/Mentors/MentorsNavbar/mentors-navbar";
import ContactUs from "@/pages/Common/Contact-Us/contact-us";
import MentorProfile from "@/pages/Mentors/Profile/mentor-profile";
import MentorRecords from "@/pages/Mentors/Records/mentor-records";
import RecordView from "@/pages/Mentors/Record-View/mentor-record-view";
import Students from "@/pages/Mentors/Students/students";
import IdleTimerContainer from "@/components/common/IdleTimerContainer/idle-timer-container";

// Testing change

function MentorRouter() {
  return (
    <>
      <Navbar />
      <div className="page-bg">
        <IdleTimerContainer />
        <Routes>
          <Route path="/" element={<MentorRecords />} />
          <Route path="/records/:recordId" element={<RecordView />} />
          <Route path="/students" element={<Students />} />
          <Route path="/profile" element={<MentorProfile />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </div>
    </>
  );
}

export default MentorRouter;
