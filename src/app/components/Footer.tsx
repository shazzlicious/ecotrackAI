import { Instagram, Facebook, Youtube, Linkedin, Twitter } from "lucide-react";
const logoImg = "/ecotrack.png";

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export function Footer({ setCurrentPage }: FooterProps) {
  const footerLinks = [
    { label: "Features", page: "landing" },
    { label: "How It Works", page: "landing" },
    { label: "Dashboard", page: "dashboard" },
    { label: "AI Coach", page: "coach" },
    { label: "Future Simulator", page: "simulator" },
    { label: "About", page: "landing" },
    { label: "Contact", page: "landing" },
    { label: "Resources", page: "landing" },
    { label: "Privacy Policy", page: "landing" },
    { label: "Terms", page: "landing" },
  ];

  const socials = [
    { Icon: Instagram, label: "Instagram", url: "https://www.instagram.com/_shazzlicious_/" },
    { Icon: Facebook, label: "Facebook", url: "https://www.facebook.com/shazzlicious.78661" },
    { Icon: Youtube, label: "YouTube", url: "https://www.youtube.com/@shazzlicious" },
    { Icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/shahzeenanwar/" },
    { Icon: Twitter, label: "Twitter/X", url: "https://x.com/_shazzlicious_" },
  ];

  return (
    <footer className="bg-[#14532D] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <img src={logoImg} alt="EcoTrack AI" className="h-12 w-auto mb-4 brightness-0 invert" />
            <p className="text-sm text-green-200 leading-relaxed max-w-xs">
              Understand your impact. Reduce it one habit at a time. AI-powered sustainability companion.
            </p>
            <div className="flex gap-3 mt-5">
              {socials.map(({ Icon, label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#22C55E] transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {footerLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => setCurrentPage(link.page)}
                  className="text-left text-sm text-green-200 hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-green-300">
          <span>Copyright © 2026 SHAHZEEN ANWAR. All Rights Reserved.</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] inline-block"></span>
            EcoTrack AI — Powered by AI
          </span>
        </div>
      </div>
    </footer>
  );
}