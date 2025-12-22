import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Billing from "./pages/Billing";
import RefillAlerts from "./pages/RefillAlerts";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/refills" element={<RefillAlerts />} />

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
