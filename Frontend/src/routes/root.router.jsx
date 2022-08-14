import { Routes, Route } from "react-router-dom";
import Login from "@/pages/Auth/Login/login";
import Signup from "@/pages/Auth/Signup/signup";
import ResetPassword from "@/pages/Auth/ResetPassword/reset-password";
import AdminRouter from "./admin.router";
import MentorRouter from "./mentor.router";
import StudentRouter from "./student.router";
import AuthProtectedRoute from "../components/Auth/AuthProtectedRoute/auth-protected-route";
import RoleProtectedRoute from "../components/Auth/RoleProtectedRoute/role-protected-route";

function AuthRouter() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/admin/*"
        element={
          <AuthProtectedRoute>
            <RoleProtectedRoute mode="Admin">
              <AdminRouter />
            </RoleProtectedRoute>
          </AuthProtectedRoute>
        }
      />
      <Route
        path="/student/*"
        element={
          <AuthProtectedRoute>
            <RoleProtectedRoute mode="Student">
              <StudentRouter />
            </RoleProtectedRoute>
          </AuthProtectedRoute>
        }
      />
      <Route
        path="/mentor/*"
        element={
          <AuthProtectedRoute>
            <RoleProtectedRoute mode="Mentor">
              <MentorRouter />
            </RoleProtectedRoute>
          </AuthProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AuthRouter;
