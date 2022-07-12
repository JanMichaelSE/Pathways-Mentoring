import { Route, Routes } from "react-router-dom"
import Navbar from "@/components/Mentors/MentorsNavbar/mentors-navbar";

import ContactUs from "@/pages/Common/Contact-Us/contact-us"
import MentorProfile from "@/pages/Mentors/Profile/mentor-profile"
import Programs from "@/pages/Mentors/Programs/programs"
import MentorRecords from "@/pages/Mentors/Records/mentor-records"
import Students from "@/pages/Mentors/Students/students"

function MentorRouter() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<MentorRecords />}/>
        <Route path="/students" element={<Students />}/>
        <Route path="/programs" element={<Programs />}/>
        <Route path="/profile" element={<MentorProfile />}/>
        <Route path="/contact-us" element={<ContactUs/>}/>
      </Routes>
    </div>
  )
}

export default MentorRouter