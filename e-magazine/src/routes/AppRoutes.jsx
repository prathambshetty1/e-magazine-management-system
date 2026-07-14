import { Routes, Route, Navigate } from "react-router-dom";
import MySubmissions from "@/pages/student/MySubmissions";
import Login from "@/pages/auth/Login";

import StudentDashboard from "@/pages/student/Dashboard";
import DeptAdminDashboard from "@/pages/deptAdmin/Dashboard";
import MainAdminDashboard from "@/pages/mainAdmin/Dashboard";
import SubmitArticle from "@/pages/student/SubmitContent";
import ProtectedRoute from "./ProtectedRoute";
import ReviewSubmissions from "@/pages/deptAdmin/ReviewSubmissions";
import { ROLES } from "@/config/roles";
import SubmissionWindows from "@/pages/mainAdmin/SubmissionWindows";
import Users from "@/pages/mainAdmin/Users";
import Submissions from "@/pages/mainAdmin/Submissions";
import MagazineBuilder from "@/pages/mainAdmin/MagazineBuilder";
function AppRoutes() {
  return (
    
    <Routes>

      {/* Public Route */}
      <Route path="/" element={<Login />} />

      {/* Student Routes */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      {/* Department Admin Routes */}
      <Route
        path="/dept-admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.DEPT_ADMIN]}>
            <DeptAdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
  path="/dept-admin/review-submissions"
  element={
    <ProtectedRoute allowedRoles={[ROLES.DEPT_ADMIN]}>
      <ReviewSubmissions />
    </ProtectedRoute>
  }
/>
      {/* Main Admin Routes */}
      <Route
        path="/main-admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.MAIN_ADMIN]}>
            <MainAdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
  path="/student/submit"
  element={
    <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
      <SubmitArticle />
    </ProtectedRoute>
  }
/>
<Route
  path="/student/my-submissions"
  element={
    <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
      <MySubmissions />
    </ProtectedRoute>
  }
/>
<Route
  path="/main-admin/submission-windows"
  element={
    <ProtectedRoute allowedRoles={[ROLES.MAIN_ADMIN]}>
      <SubmissionWindows />
    </ProtectedRoute>
  }
/>
<Route
  path="/main-admin/users"
  element={
    <ProtectedRoute allowedRoles={[ROLES.MAIN_ADMIN]}>
      <Users />
    </ProtectedRoute>
  }
/>
<Route
  path="/main-admin/submissions"
  element={
    <ProtectedRoute
      allowedRoles={[ROLES.MAIN_ADMIN]}
    >
      <Submissions />
    </ProtectedRoute>
  }
/>
<Route
  path="/main-admin/magazine-builder"
  element={
    <ProtectedRoute allowedRoles={[ROLES.MAIN_ADMIN]}>
      <MagazineBuilder />
    </ProtectedRoute>
  }
/>

      {/* Invalid Route */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default AppRoutes;