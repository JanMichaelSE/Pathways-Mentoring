import { Route, Routes } from "react-router-dom"

import StudentRecords from "@/pages/Students/Records/student-records"
import AssessmentsEdit from "@/pages/Students/Assessments-Edit/assessment-edit"
import Assessments from "@/pages/Students/Assessments/assessments"
import Mentors from "@/pages/Students/Mentors/mentors"
import StudentProfile from "@/pages/Students/Profile/student-profile"
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