import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Dashboard from "@/pages/dashboard";
import Analytics from "@/pages/analytics";
import Signup from "@/pages/signup";
import Login from "@/pages/login";
import ProtectedRoute from "@/components/ProtectedRoute";
import UserProfile from "@/pages/userProfile";
import NotFound from "@/pages/notFound/notFound";

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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
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
