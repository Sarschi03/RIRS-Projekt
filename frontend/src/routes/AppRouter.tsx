import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ProjectsPage from "../pages/ProjectsPage";
import ProjectDetailsPage from "../pages/ProjectDetailsPage";
import TimeTrackingPage from "../pages/TimeTrackingPage";
import MyDayPage from "../pages/MyDayPage";
import ManagementPage from "../pages/ManagementPage";
import UsersPage from "../pages/UsersPage";
import SignupPage from "../pages/SignupPage";
import AuthLayout from "../components/auth/AuthLayout";
import KanbanPage from "../pages/KanbanPage";
import StatisticsPage from "../pages/StatisticsPage";
import PreviewProvider from "../components/common/PreviewProvider";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ProfilePage from "../pages/ProfilePage";
import SettingsPage from "../pages/SettingsPage";
import MockUserProvider from "../context/MockUserProvider";
import AuthProvider from "../context/AuthProvider";
import { ProtectedRoute, PublicOnlyRoute } from "./RouteGuards";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MockUserProvider>
          <PreviewProvider>
            <Routes>
              <Route element={<PublicOnlyRoute />}>
                <Route element={<AuthLayout />}>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                </Route>
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/projects/:id" element={<ProjectDetailsPage />} />
                  <Route path="/time-tracking" element={<TimeTrackingPage />} />
                  <Route path="/my-day" element={<MyDayPage />} />
                  <Route path="/management" element={<ManagementPage />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/kanban" element={<KanbanPage />} />
                  <Route path="/statistics" element={<StatisticsPage />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Route>
              </Route>
            </Routes>
          </PreviewProvider>
        </MockUserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
