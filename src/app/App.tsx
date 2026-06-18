import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { LandingPage } from "./components/LandingPage";
import { Dashboard } from "./components/Dashboard";
import { CarbonAssessment } from "./components/CarbonAssessment";
import { AICoach } from "./components/AICoach";
import { FutureSimulator } from "./components/FutureSimulator";
import { Profile } from "./components/Profile";
import { Settings } from "./components/Settings";
import { PricingPage } from "./components/Pricingpage";
import { LoginPage } from "./components/Loginpage";

type Page = "landing" | "dashboard" | "assessment" | "coach" | "simulator" | "profile" | "settings" | "pricing" | "login";

const SHOW_FOOTER: Page[] = ["landing", "dashboard", "assessment", "simulator", "profile", "settings" , "coach", "pricing"];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
const [carbonScore, setCarbonScore] = useState(68);

  const navigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex flex-col">
      <Navbar currentPage={currentPage} setCurrentPage={navigate} />

      <main className="flex-1">
        {currentPage === "landing" && <LandingPage setCurrentPage={navigate} />}
        {currentPage === "dashboard" && <Dashboard
  setCurrentPage={navigate}
  carbonScore={carbonScore}
/>}
        {currentPage === "assessment" && <CarbonAssessment setCurrentPage={navigate} />}
        {currentPage === "coach" && <AICoach />}
        {currentPage === "simulator" && <FutureSimulator />}
        {currentPage === "pricing" && <PricingPage setCurrentPage={navigate} />}
        {currentPage === "profile" && <Profile />}
        {currentPage === "settings" && <Settings />}
        {currentPage === "login" && <LoginPage setCurrentPage={navigate} />}
      </main>

      {SHOW_FOOTER.includes(currentPage) && <Footer setCurrentPage={navigate} />}

      {/* Bottom navigation for mobile — visible only on app pages */}
      {currentPage !== "landing" && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E5E7EB] md:hidden flex items-center">
          {([
            { page: "dashboard", emoji: "📊", label: "Dashboard" },
            { page: "assessment", emoji: "📋", label: "Assess" },
            { page: "coach", emoji: "🤖", label: "AI Coach" },
            { page: "simulator", emoji: "🔮", label: "Simulate" },
            { page: "profile", emoji: "👤", label: "Profile" },
          ] as { page: Page; emoji: string; label: string }[]).map(({ page, emoji, label }) => (
            <button
              key={page}
              onClick={() => navigate(page)}
              className={`flex-1 flex flex-col items-center py-2.5 gap-0.5 transition-colors ${
                currentPage === page ? "text-[#22C55E]" : "text-[#9CA3AF]"
              }`}
            >
              <span style={{ fontSize: "1.1rem" }}>{emoji}</span>
              <span style={{ fontSize: "9px", fontWeight: currentPage === page ? 700 : 400 }}>{label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}