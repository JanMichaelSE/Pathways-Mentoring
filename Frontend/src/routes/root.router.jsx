import { Routes, Route } from "react-router-dom";
import Login from "@/pages/Auth/Login/login";
import Signup from "@/pages/Auth/Signup/signup";
import AdminRouter from "./admin.router";
import MentorRouter from "./mentor.router";
import StudentRouter from "./student.router";
import ProtectedRoute from "../components/common/ProtectedRoute/protected-route";

function AuthRouter() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminRouter />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/*"
        element={
          <ProtectedRoute>
            <StudentRouter />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mentor/*"
        element={
          <ProtectedRoute>
            <MentorRouter />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AuthRouter;
