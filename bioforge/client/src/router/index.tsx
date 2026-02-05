import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Loadable } from "./Loadable";
import { PATHS } from "./paths";

// --- LAYOUTS---
import MainLayout from "@/layouts/MainLayout";

// --- PAGES (Code Splitting - Lazy Load) ---
// Landing Page
const LandingPage = Loadable(lazy(() => import("@/pages/LandingPage")));
// Bio-CAD
const BioCADPage = Loadable(lazy(() => import("@/pages/BioCAD/index")));
// 404
const NotFoundPage = Loadable(lazy(() => import("@/pages/NotFoundPage")));

// --- ROUTER DEFINITION ---
export const router = createBrowserRouter([
  {
    path: PATHS.root,
    element: <LandingPage />,
  },
  // 2. APP ROUTES -> DashboardLayout
  {
    element: <MainLayout />,
    children: [
      {
        path: PATHS.design,
        element: <BioCADPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
