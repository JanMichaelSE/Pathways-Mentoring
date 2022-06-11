import { Route, Routes } from "react-router-dom"

import StudentRecords from "./Records/student-records"
import AssessmentsEdit from "./Assessments-Edit/assessment-edit"
import Assessments from "./Assessments/assessments"
import Mentors from "./Mentors/mentors"
import StudentProfile from "./Profile/student-profile"
import ContactUs from "@/pages/Common/Contact-Us/contact-us";

function StudentRouter() {
  return (
    <Routes>
      <Route path="/" element={<StudentRecords />} />
      <Route path="/assessments" element={<Assessments />} />
      <Route path="/assessments/:id" element={<AssessmentsEdit />} />
      <Route path="/mentors" element={<Mentors />} />
      <Route path="/profile" element={<StudentProfile />} />
      <Route path="/contact-us" element={<ContactUs />} />
    </Routes>
  )
}

export default StudentRouter