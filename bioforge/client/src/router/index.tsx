import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Loadable } from "./Loadable";
import { PATHS } from "./paths";

// --- LAYOUTS---
import MainLayout from "@/layouts/MainLayout";
import { AuthGuard, GuestGuard } from "./Guards";
import LoginPage from "@pages/auth/LoginPage";

// --- PAGES (Code Splitting - Lazy Load) ---
// Landing Page
const LandingPage = Loadable(lazy(() => import("@/pages/LandingPage")));
// Bio-CAD
const BioCADPage = Loadable(lazy(() => import("@pages/bioCAD/index")));
// 404
const NotFoundPage = Loadable(lazy(() => import("@/pages/NotFoundPage")));

// --- ROUTER DEFINITION ---
export const router = createBrowserRouter([
  // 1. PUBLIC (Landing)
  { path: PATHS.root, element: <LandingPage /> },

  // 2. AUTH (GuestGuard)
  {
    element: <GuestGuard />,
    children: [{ path: PATHS.auth.login, element: <LoginPage /> }],
  },

  // 3. APP (AuthGuard + Layout)
  {
    element: <AuthGuard />,
    children: [
      {
        element: <MainLayout />,
        children: [{ path: PATHS.design, element: <BioCADPage /> }],
      },
    ],
  },

  // 404
  { path: "*", element: <NotFoundPage /> },
]);
