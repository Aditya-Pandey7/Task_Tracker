import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Dashboard from "@/pages/dashboard";
import Analytics from "@/pages/analytics";
import Signup from "@/pages/signup";
import Login from "@/pages/login";
import ProtectedRoute from "@/components/ProtectedRoute";
import UserProfile from "@/pages/userProfile";
import NotFound from "@/pages/notFound/notFound";
import OtpPage from "@/pages/otpPage";
import CompletedTasks from "@/pages/completedTasks";
import TodayTasks from "@/pages/todayTasks";
import FutureTasks from "@/pages/futureTasks";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/analytics",
        element: (
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        ),
      },
      {
        path: "/completed",
        element: (
          <ProtectedRoute>
            <CompletedTasks />
          </ProtectedRoute>
        ),
      },
      {
        path: "/today",
        element: (
          <ProtectedRoute>
            <TodayTasks />
          </ProtectedRoute>
        ),
      },
      {
        path: "/upcoming",
        element: (
          <ProtectedRoute>
            <FutureTasks />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/verify-otp/:email",
        element: <OtpPage />,
      },
      {
        path: "/me",
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
