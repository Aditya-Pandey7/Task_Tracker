import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/shared/header";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import AppSidebar from "./components/shared/sidebar/AppSidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAppDispatch } from "./store";
import { checkAuthStatus } from "./store/auth/authThunk";
import { Toaster } from "./components/ui/sonner";

function App() {
  const queryClient = new QueryClient();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
    console.log("Dispatched checkAuthStatus on app load");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <main className=" flex flex-col min-h-screen ">
            <Toaster position="top-right" />
            <Header />
            <SidebarTrigger className="absolute" />
            <div className="container mx-auto flex-1">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </QueryClientProvider>
  );
}

export default App;
