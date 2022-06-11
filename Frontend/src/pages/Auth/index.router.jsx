import { Routes, Route } from "react-router-dom"

import Login from './Login/login'
import Signup from './Signup/signup'
import AdminRouter from '../Admin/index.router'
import MentorRouter from '../Mentors/index.router'
import StudentRouter from '../Students/index.router'

function AuthRouter() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/admin/*" element={<AdminRouter />}/>
      <Route path="/student/*" element={<StudentRouter />}/>
      <Route path="/mentor/*" element={<MentorRouter />}/>
    </Routes>
  )
}

export default AuthRouter