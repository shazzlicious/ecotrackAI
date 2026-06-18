import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import {
  Leaf, Flame, Trophy, CheckCircle, TrendingDown, TrendingUp,
  Car, Utensils, Zap, ShoppingBag, Trash2, ArrowRight, Star
} from "lucide-react";

interface DashboardProps {
  setCurrentPage: (page: string) => void;
  carbonScore: number;
}

const monthlyData = [
  { month: "Jan", emissions: 298, target: 250 },
  { month: "Feb", emissions: 285, target: 250 },
  { month: "Mar", emissions: 271, target: 250 },
  { month: "Apr", emissions: 260, target: 250 },
  { month: "May", emissions: 238, target: 250 },
  { month: "Jun", emissions: 212, target: 250 },
];

const emissionBreakdown = [
  { name: "Transport", value: 38, color: "#22C55E", icon: Car },
  { name: "Food", value: 22, color: "#16A34A", icon: Utensils },
  { name: "Electricity", value: 20, color: "#84CC16", icon: Zap },
  { name: "Shopping", value: 12, color: "#F59E0B", icon: ShoppingBag },
  { name: "Waste", value: 8, color: "#6B7280", icon: Trash2 },
];

const recentActivities = [
  { text: "Completed 'Use public transport' challenge", pts: "+20", time: "2h ago", color: "#22C55E" },
  { text: "Logged vegetarian meal", pts: "+5", time: "5h ago", color: "#16A34A" },
  { text: "Reduced electricity usage by 10%", pts: "+15", time: "Yesterday", color: "#84CC16" },
  { text: "Skipped online shopping", pts: "+10", time: "2d ago", color: "#F59E0B" },
];

const metricCards = [
  {
    label: "Carbon Score",
    value: "68",
    unit: "/100",
    trend: "+4 this month",
    up: true,
    icon: Leaf,
    color: "#22C55E",
    bg: "#F0FDF4",
    desc: "Above Average",
  },
  {
    label: "Monthly Emissions",
    value: "212",
    unit: " kg CO₂",
    trend: "−28 vs last month",
    up: false,
    icon: TrendingDown,
    color: "#16A34A",
    bg: "#DCFCE7",
    desc: "Great Progress",
  },
  {
    label: "Current Streak",
    value: "12",
    unit: " Days",
    trend: "Best: 25 days",
    up: true,
    icon: Flame,
    color: "#F59E0B",
    bg: "#FFFBEB",
    desc: "Keep Going!",
  },
  {
    label: "Challenges Done",
    value: "27",
    unit: "",
    trend: "+3 this week",
    up: true,
    icon: Trophy,
    color: "#8B5CF6",
    bg: "#F5F3FF",
    desc: "Eco Champion",
  },
];

export function Dashboard({
  setCurrentPage,
  carbonScore
}: DashboardProps) {
  const [challengeDone, setChallengedone] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAF8] pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-[#6B7280] text-sm mb-1">Welcome back,</p>
            <h1 className="text-[#111827]" style={{ fontWeight: 800, fontSize: "1.75rem" }}>
              SHAHZEEN ANWAR 🌱
            </h1>
            <p className="text-[#6B7280] text-sm mt-1">Lucknow, India · Last updated today</p>
          </div>
          <div className="flex gap-2">
            <button
  onClick={() => setCurrentPage("login")}
  className="px-4 py-2 bg-red-500 text-white rounded-xl text-sm hover:bg-red-50 hover:text-red-600 hover:border-red-300 border border-red-500 transition-colors"
>
  Log Out
</button>
            <button
              onClick={() => setCurrentPage("assessment")}
              className="px-4 py-2 border border-[#E5E7EB] bg-white rounded-xl text-sm text-[#374151] hover:border-[#22C55E] hover:text-[#22C55E] transition-colors"
            >
              Retake Assessment
            </button>
            <button
              onClick={() => setCurrentPage("coach")}
              className="px-4 py-2 bg-[#22C55E] text-white rounded-xl text-sm hover:bg-[#16A34A] transition-colors flex items-center gap-1.5"
              style={{ fontWeight: 600 }}
            >
              <span>AI Coach</span> <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metricCards.map(({ label, value, unit, trend, up, icon: Icon, color, bg, desc }) => (
            <div key={label} className="bg-white rounded-2xl p-5 border border-[#E5E7EB] hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: bg, color, fontWeight: 600 }}
                >
                  {desc}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-[#111827]" style={{ fontWeight: 800, fontSize: "1.75rem" }}>{value}</span>
                <span className="text-[#6B7280] text-sm">{unit}</span>
              </div>
              <p className="text-[#6B7280] text-xs mt-0.5">{label}</p>
              <div className={`flex items-center gap-1 mt-2 text-xs ${up ? "text-[#22C55E]" : "text-[#22C55E]"}`} style={{ fontWeight: 500 }}>
                {up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {trend}
              </div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Monthly Trends */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-[#E5E7EB]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-[#111827]" style={{ fontWeight: 700 }}>Monthly Emissions Trend</h3>
                <p className="text-xs text-[#6B7280] mt-0.5">kg CO₂ · Last 6 months</p>
              </div>
              <span className="text-xs text-[#22C55E] bg-[#F0FDF4] px-2 py-1 rounded-full" style={{ fontWeight: 600 }}>
                ↓ 28.8%
              </span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="emGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB", fontSize: "12px" }}
                  labelStyle={{ fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="emissions" stroke="#22C55E" strokeWidth={2.5} fill="url(#emGrad)" name="Emissions (kg CO₂)" />
                <Area type="monotone" dataKey="target" stroke="#E5E7EB" strokeWidth={1.5} strokeDasharray="4 4" fill="none" name="Target" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Emission Breakdown Pie */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
            <h3 className="text-[#111827] mb-1" style={{ fontWeight: 700 }}>Emission Breakdown</h3>
            <p className="text-xs text-[#6B7280] mb-4">By category · June 2026</p>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={emissionBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                  {emissionBreakdown.map(({ color }, i) => (
                    <Cell key={i} fill={color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB", fontSize: "12px" }}
                  formatter={(v: number) => [`${v}%`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-1 gap-1.5 mt-2">
              {emissionBreakdown.map(({ name, value, color, icon: Icon }) => (
                <div key={name} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
                    <span className="text-xs text-[#374151]">{name}</span>
                  </div>
                  <span className="text-xs text-[#6B7280]" style={{ fontWeight: 600 }}>{value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Challenge */}
          <div className="bg-gradient-to-br from-[#14532D] to-[#16A34A] rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Star className="w-4 h-4 text-yellow-300" />
              </div>
              <span className="text-xs text-green-200" style={{ fontWeight: 600 }}>TODAY'S CHALLENGE</span>
            </div>
            <p className="text-white mb-2" style={{ fontWeight: 700, fontSize: "1.05rem", lineHeight: 1.4 }}>
              Use public transport instead of personal vehicle.
            </p>
            <p className="text-green-200 text-xs mb-5">Complete this to earn +20 XP points</p>
            <div className="flex items-center justify-between">
              <span className="text-yellow-300" style={{ fontWeight: 700 }}>+20 Points</span>
              <button
                onClick={() => setChallengedone(!challengeDone)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-all ${
                  challengeDone
                    ? "bg-white/20 text-white cursor-default"
                    : "bg-white text-[#16A34A] hover:bg-green-50"
                }`}
                style={{ fontWeight: 600 }}
              >
                {challengeDone ? (
                  <><CheckCircle className="w-4 h-4" /> Completed!</>
                ) : (
                  "Mark Completed"
                )}
              </button>
            </div>
          </div>

          {/* Green Avatar */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
            <h3 className="text-[#111827] mb-4" style={{ fontWeight: 700 }}>Your Green Avatar</h3>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center mb-3 shadow-lg shadow-green-200">
                <span style={{ fontSize: "2.5rem" }}>🌳</span>
              </div>
              <div className="text-[#111827]" style={{ fontWeight: 700, fontSize: "1.1rem" }}>Tree</div>
              <div className="text-[#22C55E] text-sm mb-4" style={{ fontWeight: 600 }}>Level 3</div>
              <div className="w-full">
                <div className="flex justify-between text-xs text-[#6B7280] mb-1.5">
                  <span>320 XP</span>
                  <span>500 XP</span>
                </div>
                <div className="w-full h-2.5 bg-[#F0FDF4] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#22C55E] to-[#84CC16] rounded-full" style={{ width: "64%" }} />
                </div>
                <p className="text-xs text-[#6B7280] mt-2">180 XP to Level 4 🌲</p>
              </div>
            </div>
          </div>
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
            <h3 className="text-[#111827] mb-4" style={{ fontWeight: 700 }}>Recent Activity</h3>
            <div className="flex flex-col gap-3">
              {recentActivities.map(({ text, pts, time, color }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: color + "20" }}>
                    <CheckCircle className="w-4 h-4" style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#374151] leading-snug">{text}</p>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">{time}</p>
                  </div>
                  <span className="text-xs flex-shrink-0" style={{ color, fontWeight: 600 }}>{pts}</span>
                </div>
                
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
