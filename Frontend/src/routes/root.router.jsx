import { Routes, Route } from "react-router-dom";
import Login from "@/pages/Auth/Login/login";
import Signup from "@/pages/Auth/Signup/signup";
import AdminRouter from "./admin.router";
import MentorRouter from "./mentor.router";
import StudentRouter from "./student.router";

function AuthRouter() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin/*" element={<AdminRouter />} />
      <Route path="/student/*" element={<StudentRouter />} />
      <Route path="/mentor/*" element={<MentorRouter />} />
    </Routes>
  );
}

export default AuthRouter;
