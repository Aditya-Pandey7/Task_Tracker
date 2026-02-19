import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Dashboard from "@/pages/dashboard";
import Analytics from "@/pages/analytics";

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
        element: <Analytics />,
      },
    ],
  },
]);
