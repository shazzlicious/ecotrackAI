import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
const logoImg = "/ecotrack.png";

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handles both page navigation and same-page section scrolling
  const handleNav = (target: string) => {
    setMobileOpen(false);

    if (target === "#features" || target === "#how-it-works") {
      // If we're not on the landing page, go there first then scroll
      if (currentPage !== "landing") {
        setCurrentPage("landing");
        // Wait for landing page to mount before scrolling
        setTimeout(() => {
          const el = document.getElementById(target.replace("#", ""));
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const el = document.getElementById(target.replace("#", ""));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    setCurrentPage(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Features", target: "#features" },
    { label: "How It Works", target: "#how-it-works" },
    { label: "Dashboard", target: "dashboard" },
    { label: "AI Coach", target: "coach" },
    { label: "Future Simulator", target: "simulator" },
    { label: "Pricing", target: "pricing" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-[#E5E7EB]"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNav("landing")}
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <img src={logoImg} alt="EcoTrack AI" className="h-10 w-auto" />
          </button>

          {/* Center nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.target)}
                className="px-3 py-2 text-sm text-[#374151] hover:text-[#22C55E] transition-colors rounded-lg hover:bg-[#F0FDF4]"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNav("dashboard")}
              className="px-4 py-2 text-sm text-[#374151] hover:text-[#22C55E] transition-colors"
            >
              Log In
            </button>
            <button
              onClick={() => handleNav("login")}
              className="px-4 py-2 text-sm bg-[#22C55E] text-white rounded-full hover:bg-[#16A34A] transition-colors shadow-sm"
              style={{ fontWeight: 600 }}
            >
              Get Started
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[#F0FDF4]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#E5E7EB] px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.target)}
              className="text-left px-3 py-2 text-sm text-[#374151] hover:text-[#22C55E] hover:bg-[#F0FDF4] rounded-lg transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="flex gap-2 mt-3 pt-3 border-t border-[#E5E7EB]">
            <button
              onClick={() => handleNav("dashboard")}
              className="flex-1 px-4 py-2 text-sm border border-[#E5E7EB] rounded-full hover:border-[#22C55E] hover:text-[#22C55E] transition-colors"
            >
              Log In
            </button>
            <button
              onClick={() => handleNav("login")}
              className="flex-1 px-4 py-2 text-sm bg-[#22C55E] text-white rounded-full hover:bg-[#16A34A] transition-colors"
              style={{ fontWeight: 600 }}
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}