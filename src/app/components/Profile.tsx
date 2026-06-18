import { useState } from "react";
import { MapPin, Edit3, Trophy, Flame, Leaf, CheckCircle2, Lock, Star } from "lucide-react";

const achievements = [
  { id: 1, title: "First Carbon Audit", desc: "Completed your first assessment", emoji: "🎯", unlocked: true },
  { id: 2, title: "7 Day Streak", desc: "Completed challenges 7 days in a row", emoji: "🔥", unlocked: true },
  { id: 3, title: "30 Day Streak", desc: "30 consecutive challenge days", emoji: "⚡", unlocked: false },
  { id: 4, title: "Eco Warrior", desc: "Reduced emissions by 25%", emoji: "🌍", unlocked: true },
  { id: 5, title: "Climate Hero", desc: "Inspired 5 friends to join EcoTrack", emoji: "🦸", unlocked: false },
  { id: 6, title: "Green Champion", desc: "Achieved carbon score 80+", emoji: "🏆", unlocked: false },
];

export function Profile() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("SHAHZEEN ANWAR");
  const [bio, setBio] = useState("Passionate about sustainability. Working towards a carbon-neutral lifestyle one habit at a time. 🌱");

  return (
    <div className="min-h-screen bg-[#F8FAF8] pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-[#14532D] to-[#16A34A] rounded-3xl p-8 text-white mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/3 translate-x-1/3" />
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center text-white border-2 border-white/20 backdrop-blur-sm">
                  <span style={{ fontSize: "2.5rem" }}>👩</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#22C55E] flex items-center justify-center border-2 border-[#14532D]">
                  <span className="text-xs">✓</span>
                </div>
              </div>
              <div className="flex-1">
                {editing ? (
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white text-lg mb-1 outline-none focus:border-white/50 w-full max-w-xs"
                    style={{ fontWeight: 700 }}
                  />
                ) : (
                  <h1 className="text-white mb-1" style={{ fontWeight: 800, fontSize: "1.4rem" }}>{name}</h1>
                )}
                <div className="flex flex-wrap items-center gap-3 text-green-200 text-sm">
                  <span className="flex items-center gap-1"><span>👩</span> Female · Age 25</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Lucknow, India</span>
                </div>
                {editing ? (
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={2}
                    className="mt-2 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-xs outline-none focus:border-white/50 resize-none"
                  />
                ) : (
                  <p className="text-green-100 text-xs mt-2 max-w-md leading-relaxed">{bio}</p>
                )}
              </div>
              <button
                onClick={() => setEditing(!editing)}
                className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white text-sm transition-colors border border-white/20"
                style={{ fontWeight: 600 }}
              >
                <Edit3 className="w-4 h-4" />
                {editing ? "Save" : "Edit Profile"}
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Carbon Score", value: "68", unit: "/100", icon: Leaf, color: "#22C55E", bg: "#F0FDF4" },
            { label: "Challenges Done", value: "27", unit: "", icon: Trophy, color: "#8B5CF6", bg: "#F5F3FF" },
            { label: "Current Streak", value: "12", unit: " days", icon: Flame, color: "#F59E0B", bg: "#FFFBEB" },
            { label: "Total XP", value: "320", unit: " xp", icon: Star, color: "#16A34A", bg: "#DCFCE7" },
          ].map(({ label, value, unit, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl p-5 border border-[#E5E7EB] text-center">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: bg }}>
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <div className="text-[#111827]" style={{ fontWeight: 800, fontSize: "1.4rem" }}>
                {value}<span className="text-sm text-[#6B7280]">{unit}</span>
              </div>
              <div className="text-xs text-[#6B7280] mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Green Avatar Progress */}
        <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] mb-6">
          <h2 className="text-[#111827] mb-4" style={{ fontWeight: 700 }}>Green Avatar Progress</h2>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center flex-shrink-0 shadow-md shadow-green-200">
              <span style={{ fontSize: "2rem" }}>🌳</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <span className="text-[#111827] text-sm" style={{ fontWeight: 700 }}>Tree · Level 3</span>
                  <span className="text-xs text-[#22C55E] ml-2">+180 XP to Level 4</span>
                </div>
                <span className="text-xs text-[#6B7280]">320 / 500 XP</span>
              </div>
              <div className="w-full h-3 bg-[#F0FDF4] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#22C55E] to-[#84CC16] rounded-full transition-all duration-1000"
                  style={{ width: "64%" }}
                />
              </div>
              <div className="flex gap-2 mt-3">
                {["🌱 Seed", "🌿 Sprout", "🌳 Tree", "🌲 Forest", "🌍 Planet"].map((lvl, i) => (
                  <span
                    key={lvl}
                    className={`text-xs px-2 py-0.5 rounded-full ${i <= 2 ? "bg-[#F0FDF4] text-[#22C55E]" : "bg-[#F9FAFB] text-[#9CA3AF]"}`}
                    style={{ fontWeight: i === 2 ? 700 : 400 }}
                  >
                    {lvl}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[#111827]" style={{ fontWeight: 700 }}>Achievements</h2>
            <span className="text-xs text-[#6B7280]">3 / 6 unlocked</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map(({ id, title, desc, emoji, unlocked }) => (
              <div
                key={id}
                className={`p-4 rounded-xl border transition-all ${
                  unlocked
                    ? "border-[#22C55E]/30 bg-[#F0FDF4]"
                    : "border-[#E5E7EB] bg-[#F9FAFB] opacity-60"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      unlocked ? "bg-white shadow-sm" : "bg-[#F3F4F6]"
                    }`}
                  >
                    {unlocked ? (
                      <span style={{ fontSize: "1.25rem" }}>{emoji}</span>
                    ) : (
                      <Lock className="w-4 h-4 text-[#9CA3AF]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#111827]" style={{ fontWeight: 600 }}>{title}</span>
                      {unlocked && <CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-[#6B7280] mt-0.5 leading-snug">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
