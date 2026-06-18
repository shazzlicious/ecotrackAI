import {
  Footprints, Bot, Zap, Globe2, ArrowRight, CheckCircle2,
  Star, ChevronRight, Leaf, BarChart3, Target, Users
} from "lucide-react";
// If TypeScript cannot find the image module types, ignore the error for this import.
// Alternatively add a declaration file (e.g. `declare module '*.png';`) in your project.
// @ts-ignore
import bannerImg from "../../imports/ecotrackbanner.png"; // update if using a public asset path

interface LandingPageProps {
  setCurrentPage: (page: string) => void;
}

const features = [
  {
    icon: Footprints,
    title: "Track Footprint",
    description: "Monitor your daily carbon emissions across transport, food, electricity, shopping, and waste with precision.",
    color: "#22C55E",
    bg: "#F0FDF4",
  },
  {
    icon: Bot,
    title: "AI Coach",
    description: "Get personalized insights and actionable recommendations from your intelligent sustainability companion.",
    color: "#16A34A",
    bg: "#DCFCE7",
  },
  {
    icon: Zap,
    title: "Take Action",
    description: "Complete daily eco-challenges, earn XP, and level up your green avatar as you build better habits.",
    color: "#84CC16",
    bg: "#F7FEE7",
  },
  {
    icon: Globe2,
    title: "Create Impact",
    description: "Visualize your cumulative impact — trees saved, emissions reduced, and communities inspired.",
    color: "#14532D",
    bg: "#F0FDF4",
  },
];

const steps = [
  { num: "01", title: "Take Assessment", desc: "Answer a quick 5-category assessment about your current lifestyle habits." },
  { num: "02", title: "Get Carbon Score", desc: "Receive your personalized carbon score with a detailed emission breakdown." },
  { num: "03", title: "Receive AI Guidance", desc: "Your EcoTrack AI Coach delivers a custom action plan just for you." },
  { num: "04", title: "Reduce Emissions", desc: "Complete challenges, track progress, and watch your footprint shrink." },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer, Bangalore",
    text: "EcoTrack AI completely changed how I think about my daily choices. I've reduced my carbon footprint by 34% in 3 months!",
    rating: 5,
    avatar: "PS",
    color: "#22C55E",
  },
  {
    name: "Rahul Mehta",
    role: "Student, Mumbai",
    text: "The AI coach is incredibly helpful. It gave me specific tips for my commute that saved me both carbon and money.",
    rating: 5,
    avatar: "RM",
    color: "#16A34A",
  },
  {
    name: "Aisha Khan",
    role: "Teacher, Delhi",
    text: "I love the gamification! Streaks and challenges keep me motivated every single day. The future simulator is mind-blowing.",
    rating: 5,
    avatar: "AK",
    color: "#84CC16",
  },
];

const stats = [
  { value: "2.4M+", label: "kg CO₂ Reduced", icon: Leaf },
  { value: "50K+", label: "Active Users", icon: Users },
  { value: "98%", label: "Accuracy Rate", icon: Target },
  { value: "4.9★", label: "User Rating", icon: Star },
];

export function LandingPage({ setCurrentPage }: LandingPageProps) {
  return (
    <div className="bg-[#F8FAF8]">
      {/* Hero Section — banner is plain image, no click handler (navbar-free new banner) */}
      <section className="pt-16">
        <div className="w-full">
          <img
            src={bannerImg}
            alt="EcoTrack AI — Understand your impact. Reduce it one habit at a time."
            className="w-full object-cover"
            style={{ maxHeight: "600px", objectPosition: "center top" }}
          />
        </div>
        {/* CTA below banner in case your new banner doesn't have a button */}
        <div className="flex justify-center py-8 bg-[#F8FAF8]">
          <button
            onClick={() => setCurrentPage("assessment")}
            className="px-10 py-4 bg-[#22C55E] text-white rounded-full hover:bg-[#16A34A] transition-colors shadow-lg flex items-center gap-2"
            style={{ fontWeight: 700, fontSize: "1rem" }}
          >
            Get Started Free <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Stats Bar */}
      
      <section className="bg-white border-y border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F0FDF4] flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-[#22C55E]" />
              </div>
              <div>
                <div className="text-xl text-[#111827]" style={{ fontWeight: 700 }}>{value}</div>
                <div className="text-xs text-[#6B7280]">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section — id="features" so navbar can scroll here */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] text-[#16A34A] text-xs mb-4" style={{ fontWeight: 600 }}>
            <Leaf className="w-3.5 h-3.5" /> FEATURES
          </span>
          <h2 className="text-[#111827] mb-3" style={{ fontWeight: 800, fontSize: "2rem", lineHeight: 1.2 }}>
            Everything you need to go green
          </h2>
          <p className="text-[#6B7280] max-w-lg mx-auto text-sm leading-relaxed">
            EcoTrack AI combines smart tracking, AI guidance, and gamified challenges to make sustainability a daily habit.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, description, color, bg }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 border border-[#E5E7EB] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: bg }}
              >
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <h3 className="text-[#111827] mb-2" style={{ fontWeight: 700, fontSize: "1rem" }}>{title}</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">{description}</p>
              <div
                className="mt-4 flex items-center gap-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color, fontWeight: 600 }}
              >
                Learn more <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works — id="how-it-works" so navbar can scroll here */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] text-[#16A34A] text-xs mb-4" style={{ fontWeight: 600 }}>
              <BarChart3 className="w-3.5 h-3.5" /> HOW IT WORKS
            </span>
            <h2 className="text-[#111827] mb-3" style={{ fontWeight: 800, fontSize: "2rem", lineHeight: 1.2 }}>
              Four simple steps to a greener you
            </h2>
            <p className="text-[#6B7280] max-w-md mx-auto text-sm leading-relaxed">
              Getting started takes less than 5 minutes. Your journey to a sustainable lifestyle begins here.
            </p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#22C55E]/20 via-[#22C55E] to-[#22C55E]/20" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {steps.map(({ num, title, desc }) => (
                <div key={num} className="flex flex-col items-center text-center">
                  <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center mb-5 shadow-lg shadow-green-200">
                    <span className="text-white" style={{ fontWeight: 700, fontSize: "1.1rem" }}>{num}</span>
                  </div>
                  <h4 className="text-[#111827] mb-2" style={{ fontWeight: 700, fontSize: "0.95rem" }}>{title}</h4>
                  <p className="text-[#6B7280] text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] text-[#16A34A] text-xs mb-4" style={{ fontWeight: 600 }}>
            <Star className="w-3.5 h-3.5" /> TESTIMONIALS
          </span>
          <h2 className="text-[#111827] mb-3" style={{ fontWeight: 800, fontSize: "2rem", lineHeight: 1.2 }}>
            Loved by eco-conscious users
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, text, rating, avatar, color }) => (
            <div key={name} className="bg-white rounded-2xl p-6 border border-[#E5E7EB] hover:shadow-md transition-shadow">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>
              <p className="text-[#374151] text-sm leading-relaxed mb-5">"{text}"</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0"
                  style={{ background: color, fontWeight: 700 }}
                >
                  {avatar}
                </div>
                <div>
                  <div className="text-sm text-[#111827]" style={{ fontWeight: 600 }}>{name}</div>
                  <div className="text-xs text-[#6B7280]">{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#14532D] to-[#16A34A]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-white mb-4" style={{ fontWeight: 800, fontSize: "2.25rem", lineHeight: 1.2 }}>
            Start Building A Greener Future Today
          </h2>
          <p className="text-green-200 mb-8 text-sm leading-relaxed max-w-md mx-auto">
            Join 50,000+ eco-conscious individuals who are already tracking, reducing, and making a real difference with EcoTrack AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setCurrentPage("assessment")}
              className="px-8 py-3.5 bg-white text-[#16A34A] rounded-full hover:bg-green-50 transition-colors shadow-lg flex items-center gap-2 justify-center"
              style={{ fontWeight: 700 }}
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage("dashboard")}
              className="px-8 py-3.5 bg-white/10 text-white border border-white/20 rounded-full hover:bg-white/20 transition-colors flex items-center gap-2 justify-center"
              style={{ fontWeight: 600 }}
            >
              View Demo Dashboard
            </button>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-green-200">
            {["Free to start", "No credit card", "Cancel anytime"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#84CC16]" /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}