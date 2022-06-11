import { Route, Routes } from "react-router-dom"
import ContactUs from "@/pages/Common/Contact-Us/contact-us"
import MentorProfile from "./Profile/mentor-profile"
import Programs from "./Programs/programs"
import MentorRecords from "./Records/mentor-records"
import Students from "./Students/students"

function MentorRouter() {
  return (
    <Routes>
      <Route path="/" element={<MentorRecords />}/>
      <Route path="/students" element={<Students />}/>
      <Route path="/programs" element={<Programs />}/>
      <Route path="/profile" element={<MentorProfile />}/>
      <Route path="/contact-us" element={<ContactUs/>}/>
    </Routes>
  )
}

export default MentorRouter