import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./components/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { Energy } from "./pages/Energy";
import { Map } from "./pages/Map";
import { Alerts } from "./pages/Alerts";
import { AIInsights } from "./pages/AIInsights";
import { Analytics } from "./pages/Analytics";
import { Logs } from "./pages/Logs";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "energy", Component: Energy },
      { path: "map", Component: Map },
      { path: "alerts", Component: Alerts },
      { path: "ai-insights", Component: AIInsights },
      { path: "analytics", Component: Analytics },
      { path: "logs", Component: Logs },
      { path: "settings", Component: Settings },
    ],
  },
]);
