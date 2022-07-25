import { Route, Routes } from "react-router-dom";
import ContactUs from "@/pages/Common/Contact-Us/contact-us";
import MentorProfile from "@/pages/Mentors/Profile/mentor-profile";
import Programs from "@/pages/Mentors/Programs/programs";
import MentorRecords from "@/pages/Mentors/Records/mentor-records";
import Students from "@/pages/Mentors/Students/students";
import IdleTimerContainer from "@/components/common/IdleTimerContainer/idle-timer-container";

function MentorRouter() {
  return (
    <>
      <IdleTimerContainer />
      <Routes>
        <Route path="/" element={<MentorRecords />} />
        <Route path="/students" element={<Students />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/profile" element={<MentorProfile />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </>
  );
}

export default MentorRouter;
