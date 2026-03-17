import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ================= FARMER PAGES ================= */

import FarmerDashboard from "./pages/FarmerDashboard";
import Experts from "./pages/Experts";
import AskExpert from "./pages/AskExpert";
import FarmerAnswers from "./pages/FarmerAnswers";
import Crop from "./pages/Crop";
import AIChat from "./pages/AIChat";
import Weather from "./pages/Weather";
import FarmerProfile from "./pages/FarmerProfile";

/* ================= EXPERT PAGES ================= */

import ExpertDashboard from "./pages/ExpertDashboard";
import ExpertQuestions from "./pages/ExpertQuestions";
import ExpertProfile from "./pages/ExpertProfile";

/* ================= OTHER ROLES ================= */

import GovernmentDashboard from "./pages/GovernmentDashboard";
import PublicDashboard from "./pages/PublicDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
return ( <BrowserRouter> <Routes>

```
    {/* ================= FARMER ROUTES ================= */}

    <Route path="/" element={<FarmerDashboard />} />
    <Route path="/experts" element={<Experts />} />
    <Route path="/ask-expert" element={<AskExpert />} />
    <Route path="/my-questions" element={<FarmerAnswers />} />
    <Route path="/crop" element={<Crop />} />
    <Route path="/ai-chat" element={<AIChat />} />
    <Route path="/weather" element={<Weather />} />
    <Route path="/farmer-view" element={<FarmerProfile />} />

    {/* ================= EXPERT ROUTES ================= */}

    <Route path="/expert-dashboard" element={<ExpertDashboard />} />
    <Route path="/expert-questions" element={<ExpertQuestions />} />
    <Route path="/expert-profile" element={<ExpertProfile />} />

    {/* ================= GOVERNMENT ROUTES ================= */}

    <Route path="/government-dashboard" element={<GovernmentDashboard />} />

    {/* ================= PUBLIC ROUTES ================= */}

    <Route path="/public-dashboard" element={<PublicDashboard />} />

    {/* ================= ADMIN ROUTES ================= */}

    <Route path="/admin-dashboard" element={<AdminDashboard />} />

  </Routes>
</BrowserRouter>


);
}

export default App;
