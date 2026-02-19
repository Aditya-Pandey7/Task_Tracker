import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/shared/header";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import AppSidebar from "./components/shared/sidebar/AppSidebar";

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="h-screen flex flex-col ">
          <Header />
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default App;
