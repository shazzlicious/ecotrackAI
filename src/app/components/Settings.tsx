import { useState } from "react";
import {
  Bell, Moon, Globe, Shield, Link2, Bot, ChevronRight,
  User, Mail, Phone, Lock, Trash2, Save
} from "lucide-react";

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-10 h-5.5 rounded-full transition-colors duration-200 flex-shrink-0 ${
        checked ? "bg-[#22C55E]" : "bg-[#D1D5DB]"
      }`}
      style={{ height: "22px", width: "40px" }}
      role="switch"
      aria-checked={checked}
    >
      <span
        className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200"
        style={{ transform: checked ? "translateX(18px)" : "translateX(0)" }}
      />
    </button>
  );
}

function SettingRow({ icon: Icon, label, desc, children }: { icon: any; label: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-[#F3F4F6] last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#F0FDF4] flex items-center justify-center flex-shrink-0">
          <Icon className="w-4.5 h-4.5 text-[#22C55E]" style={{ width: "18px", height: "18px" }} />
        </div>
        <div>
          <div className="text-sm text-[#111827]" style={{ fontWeight: 500 }}>{label}</div>
          {desc && <div className="text-xs text-[#6B7280]">{desc}</div>}
        </div>
      </div>
      {children}
    </div>
  );
}

export function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({ daily: true, weekly: true, achievements: true, tips: false });
  const [language, setLanguage] = useState("English");
  const [aiPersonality, setAiPersonality] = useState("Motivational");
  const [privacy, setPrivacy] = useState({ publicProfile: false, shareStats: true });

  const sections = [
    {
      title: "Account",
      icon: User,
      content: (
        <div className="space-y-4 pt-2">
          {[
            { label: "Full Name", value: "SHAHZEEN ANWAR", icon: User, type: "text" },
            { label: "Email", value: "shahzeen@ecotrack.ai", icon: Mail, type: "email" },
            { label: "Phone", value: "+91 98765 43210", icon: Phone, type: "tel" },
          ].map(({ label, value, icon: Icon, type }) => (
            <div key={label}>
              <label className="block text-xs text-[#6B7280] mb-1.5" style={{ fontWeight: 600 }}>{label}</label>
              <div className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input
                  type={type}
                  defaultValue={value}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#374151] bg-[#F9FAFB] focus:outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 transition-all"
                />
              </div>
            </div>
          ))}
          <button className="flex items-center gap-2 px-4 py-2 bg-[#22C55E] text-white rounded-xl text-sm hover:bg-[#16A34A] transition-colors" style={{ fontWeight: 600 }}>
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF8] pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="text-[#111827]" style={{ fontWeight: 800, fontSize: "1.75rem" }}>Settings</h1>
          <p className="text-[#6B7280] text-sm mt-1">Manage your account, preferences, and privacy.</p>
        </div>

        <div className="space-y-4">
          {/* Account */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
            <h2 className="text-[#111827] mb-4 flex items-center gap-2" style={{ fontWeight: 700 }}>
              <User className="w-5 h-5 text-[#22C55E]" /> Account Settings
            </h2>
            <div className="space-y-4">
              {[
                { label: "Full Name", value: "SHAHZEEN ANWAR", icon: User, type: "text" },
                { label: "Email", value: "shahzeen@ecotrack.ai", icon: Mail, type: "email" },
                { label: "Phone", value: "+91 98765 43210", icon: Phone, type: "tel" },
              ].map(({ label, value, icon: Icon, type }) => (
                <div key={label}>
                  <label className="block text-xs text-[#6B7280] mb-1.5" style={{ fontWeight: 600 }}>{label.toUpperCase()}</label>
                  <div className="relative">
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                    <input
                      type={type}
                      defaultValue={value}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#374151] bg-[#F9FAFB] focus:outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 transition-all"
                    />
                  </div>
                </div>
              ))}
              <button className="flex items-center gap-2 px-4 py-2.5 bg-[#22C55E] text-white rounded-xl text-sm hover:bg-[#16A34A] transition-colors" style={{ fontWeight: 600 }}>
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
            <h2 className="text-[#111827] mb-2 flex items-center gap-2" style={{ fontWeight: 700 }}>
              <Bell className="w-5 h-5 text-[#22C55E]" /> Notification Preferences
            </h2>
            <SettingRow icon={Bell} label="Daily Challenge Reminders" desc="Get reminded about today's eco challenge">
              <Toggle checked={notifications.daily} onChange={() => setNotifications(n => ({ ...n, daily: !n.daily }))} />
            </SettingRow>
            <SettingRow icon={Bell} label="Weekly Progress Report" desc="Summary of your weekly emission data">
              <Toggle checked={notifications.weekly} onChange={() => setNotifications(n => ({ ...n, weekly: !n.weekly }))} />
            </SettingRow>
            <SettingRow icon={Bell} label="Achievement Alerts" desc="Get notified when you unlock badges">
              <Toggle checked={notifications.achievements} onChange={() => setNotifications(n => ({ ...n, achievements: !n.achievements }))} />
            </SettingRow>
            <SettingRow icon={Bell} label="Eco Tips & Insights" desc="Weekly sustainability tips from AI Coach">
              <Toggle checked={notifications.tips} onChange={() => setNotifications(n => ({ ...n, tips: !n.tips }))} />
            </SettingRow>
          </div>

          {/* Appearance */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
            <h2 className="text-[#111827] mb-2 flex items-center gap-2" style={{ fontWeight: 700 }}>
              <Moon className="w-5 h-5 text-[#22C55E]" /> Appearance
            </h2>
            <SettingRow icon={Moon} label="Dark Mode" desc="Switch to dark theme">
              <Toggle checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            </SettingRow>
            <SettingRow icon={Globe} label="Language" desc="Interface language">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-sm border border-[#E5E7EB] rounded-lg px-2 py-1.5 text-[#374151] bg-white focus:outline-none focus:border-[#22C55E]"
              >
                {["English", "Hindi", "Urdu", "Bengali", "Tamil"].map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </SettingRow>
          </div>

          {/* Privacy */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
            <h2 className="text-[#111827] mb-2 flex items-center gap-2" style={{ fontWeight: 700 }}>
              <Shield className="w-5 h-5 text-[#22C55E]" /> Privacy Settings
            </h2>
            <SettingRow icon={Shield} label="Public Profile" desc="Allow others to find your eco profile">
              <Toggle checked={privacy.publicProfile} onChange={() => setPrivacy(p => ({ ...p, publicProfile: !p.publicProfile }))} />
            </SettingRow>
            <SettingRow icon={Shield} label="Share My Stats" desc="Contribute anonymized data to research">
              <Toggle checked={privacy.shareStats} onChange={() => setPrivacy(p => ({ ...p, shareStats: !p.shareStats }))} />
            </SettingRow>
            <SettingRow icon={Lock} label="Change Password" desc="Update your account password">
              <button className="flex items-center gap-1 text-xs text-[#22C55E] hover:text-[#16A34A]" style={{ fontWeight: 600 }}>
                Update <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </SettingRow>
          </div>

          {/* Connected Accounts */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
            <h2 className="text-[#111827] mb-2 flex items-center gap-2" style={{ fontWeight: 700 }}>
              <Link2 className="w-5 h-5 text-[#22C55E]" /> Connected Accounts
            </h2>
            {[
              { name: "Google", icon: "🔵", connected: true },
              { name: "Apple", icon: "⚫", connected: false },
              { name: "Facebook", icon: "🔵", connected: false },
            ].map(({ name, icon, connected }) => (
              <SettingRow key={name} icon={Link2} label={name} desc={connected ? "Connected" : "Not connected"}>
                <button
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    connected
                      ? "border-red-200 text-red-500 hover:bg-red-50"
                      : "border-[#22C55E] text-[#22C55E] hover:bg-[#F0FDF4]"
                  }`}
                  style={{ fontWeight: 600 }}
                >
                  {connected ? "Disconnect" : "Connect"}
                </button>
              </SettingRow>
            ))}
          </div>

          {/* AI Preferences */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
            <h2 className="text-[#111827] mb-2 flex items-center gap-2" style={{ fontWeight: 700 }}>
              <Bot className="w-5 h-5 text-[#22C55E]" /> AI Preferences
            </h2>
            <SettingRow icon={Bot} label="AI Coach Personality" desc="Choose your preferred coaching style">
              <select
                value={aiPersonality}
                onChange={(e) => setAiPersonality(e.target.value)}
                className="text-sm border border-[#E5E7EB] rounded-lg px-2 py-1.5 text-[#374151] bg-white focus:outline-none focus:border-[#22C55E]"
              >
                {["Motivational", "Scientific", "Friendly", "Concise"].map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </SettingRow>
            <SettingRow icon={Bot} label="Smart Suggestions" desc="Personalized recommendations in dashboard">
              <Toggle checked={true} onChange={() => {}} />
            </SettingRow>
          </div>

          {/* Danger zone */}
          <div className="bg-white rounded-2xl p-6 border border-red-100">
            <h2 className="text-red-600 mb-3 flex items-center gap-2" style={{ fontWeight: 700 }}>
              <Trash2 className="w-5 h-5" /> Danger Zone
            </h2>
            <p className="text-sm text-[#6B7280] mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-red-200 text-red-500 rounded-xl text-sm hover:bg-red-50 transition-colors" style={{ fontWeight: 600 }}>
              <Trash2 className="w-4 h-4" /> Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
