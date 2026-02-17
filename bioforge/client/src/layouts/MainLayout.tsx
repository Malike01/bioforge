import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"; // Shadcn Sonner
import { AppSidebar } from "./AppSidebar";
import { SupportModal } from "@/components/support/SupportModal";
import { SupportFab } from "@/components/support/SupportFab";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <AppSidebar />
      <main className="relative flex min-h-screen flex-col">
        <Outlet />
      </main>
      <Toaster position="top-right" richColors closeButton />
      <SupportFab />
      <SupportModal />
    </div>
  );
}
