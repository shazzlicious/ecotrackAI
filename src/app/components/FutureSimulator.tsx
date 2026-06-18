import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Calculator, Leaf, IndianRupee, TreeDeciduous, Zap, TrendingDown, ArrowRight, Sparkles } from "lucide-react";

const presets = [
  { current: "Car (Petrol)", proposed: "Metro", frequency: "5 days/week", co2: 216, money: 12000, trees: 10 },
  { current: "Non-Vegetarian Diet", proposed: "Vegetarian Diet", frequency: "Daily", co2: 180, money: 8400, trees: 8 },
  { current: "Air Conditioning 20°C", proposed: "Air Conditioning 24°C", frequency: "Daily", co2: 96, money: 3600, trees: 4 },
  { current: "Flight Travel", proposed: "Train Travel", frequency: "Monthly", co2: 1440, money: 18000, trees: 66 },
];

const getFrequencyMultiplier = (freq: string): number => {
  const f = freq.toLowerCase();
  if (f.includes("daily") || f.includes("every day") || f.includes("7 day")) return 1.4;
  if (f.includes("6 day")) return 1.2;
  if (f.includes("5 day")) return 1.0;
  if (f.includes("4 day")) return 0.8;
  if (f.includes("3 day")) return 0.6;
  if (f.includes("2 day") || f.includes("twice")) return 0.4;
  if (f.includes("1 day") || f.includes("once") || f.includes("weekly")) return 0.2;
  if (f.includes("monthly")) return 0.15;
  return 0.6;
};

export function FutureSimulator() {
  const [currentHabit, setCurrentHabit] = useState("Car (Petrol)");
  const [proposedHabit, setProposedHabit] = useState("Metro");
  const [frequency, setFrequency] = useState("3 days per week");
  const [result, setResult] = useState<null | { co2: number; money: number; trees: number; score: string }>(null);
  const [loading, setLoading] = useState(false);

  const simulate = () => {
    setLoading(true);
    setTimeout(() => {
      const match = presets.find(
        (p) =>
          currentHabit.toLowerCase().includes(p.current.toLowerCase().split(" ")[0].toLowerCase()) ||
          p.current.toLowerCase().includes(currentHabit.toLowerCase()) ||
          proposedHabit.toLowerCase().includes(p.proposed.toLowerCase().split(" ")[0].toLowerCase()) ||
          p.proposed.toLowerCase().includes(proposedHabit.toLowerCase())
      );

      const base = match ?? { co2: 150, money: 9000, trees: 7 };
      const multiplier = getFrequencyMultiplier(frequency);

      const co2 = Math.round(base.co2 * multiplier);
      const money = Math.round(base.money * multiplier);
      const trees = Math.round(base.trees * multiplier);
      const score =
        co2 >= 500 ? "Very High" :
        co2 >= 200 ? "High" :
        co2 >= 80  ? "Medium" : "Low";

      setResult({ co2, money, trees, score });
      setLoading(false);
    }, 1200);
  };

  const chartData = result
    ? [
        { name: "Jan", current: 212, projected: Math.round(212 - result.co2 / 12) },
        { name: "Mar", current: 212, projected: Math.round(212 - (result.co2 / 12) * 1.1) },
        { name: "Jun", current: 212, projected: Math.round(212 - (result.co2 / 12) * 1.2) },
        { name: "Sep", current: 212, projected: Math.max(80, Math.round(212 - (result.co2 / 12) * 1.3)) },
        { name: "Dec", current: 212, projected: Math.max(80, Math.round(212 - result.co2 / 12)) },
      ]
    : [];

  const scoreColors: Record<string, string> = {
    Low: "#F59E0B",
    Medium: "#84CC16",
    High: "#22C55E",
    "Very High": "#16A34A",
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] text-[#16A34A] text-xs mb-3" style={{ fontWeight: 600 }}>
            <Sparkles className="w-3.5 h-3.5" /> AI CARBON FUTURE SIMULATOR
          </span>
          <h1 className="text-[#111827] mb-3" style={{ fontWeight: 800, fontSize: "2rem", lineHeight: 1.2 }}>
            AI Carbon Future Simulator
          </h1>
          <p className="text-[#6B7280] max-w-md mx-auto text-sm leading-relaxed">
            Swap a habit and instantly see your projected CO₂ savings, money saved, and trees equivalent for an entire year.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {presets.map(({ current, proposed }) => (
            <button
              key={current}
              onClick={() => { setCurrentHabit(current); setProposedHabit(proposed); setResult(null); }}
              className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                currentHabit === current
                  ? "bg-[#22C55E] text-white border-[#22C55E]"
                  : "bg-white border-[#E5E7EB] text-[#374151] hover:border-[#22C55E] hover:text-[#22C55E]"
              }`}
              style={{ fontWeight: 500 }}
            >
              {current} → {proposed}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-[#E5E7EB]">
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="w-5 h-5 text-[#22C55E]" />
              <h2 className="text-[#111827]" style={{ fontWeight: 700 }}>Configure Simulation</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[#6B7280] mb-1.5" style={{ fontWeight: 600 }}>CURRENT HABIT</label>
                <input
                  type="text"
                  value={currentHabit}
                  onChange={(e) => { setCurrentHabit(e.target.value); setResult(null); }}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#374151] bg-[#F9FAFB] focus:outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 transition-all"
                  placeholder="e.g. Car (Petrol)"
                />
              </div>

              <div className="flex items-center justify-center">
                <div className="flex-1 h-px bg-[#E5E7EB]" />
                <div className="mx-3 w-8 h-8 rounded-full bg-[#F0FDF4] flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-[#22C55E]" />
                </div>
                <div className="flex-1 h-px bg-[#E5E7EB]" />
              </div>

              <div>
                <label className="block text-xs text-[#6B7280] mb-1.5" style={{ fontWeight: 600 }}>PROPOSED HABIT</label>
                <input
                  type="text"
                  value={proposedHabit}
                  onChange={(e) => { setProposedHabit(e.target.value); setResult(null); }}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#374151] bg-[#F9FAFB] focus:outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 transition-all"
                  placeholder="e.g. Metro"
                />
              </div>

              <div>
                <label className="block text-xs text-[#6B7280] mb-1.5" style={{ fontWeight: 600 }}>FREQUENCY</label>
                <input
                  type="text"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#374151] bg-[#F9FAFB] focus:outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 transition-all"
                  placeholder="e.g. 3 days per week"
                />
              </div>

              <button
                onClick={simulate}
                disabled={loading}
                className="w-full py-3 bg-[#22C55E] text-white rounded-xl hover:bg-[#16A34A] transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ fontWeight: 700 }}
              >
                {loading ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Simulating...</>
                ) : (
                  <><Sparkles className="w-4 h-4" /> Run Simulation</>
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-5">
            {!result ? (
              <div className="bg-white rounded-2xl p-10 border border-[#E5E7EB] flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                <div className="w-16 h-16 rounded-2xl bg-[#F0FDF4] flex items-center justify-center mb-4">
                  <Leaf className="w-8 h-8 text-[#22C55E]" />
                </div>
                <p className="text-[#374151]" style={{ fontWeight: 600 }}>Configure a habit swap and run the simulation</p>
                <p className="text-[#9CA3AF] text-sm mt-1">See your potential annual impact in seconds</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Annual CO₂ Saved", value: `${result.co2} kg`, icon: TrendingDown, color: "#22C55E", bg: "#F0FDF4" },
                    { label: "Money Saved", value: `₹${result.money.toLocaleString()}`, icon: IndianRupee, color: "#16A34A", bg: "#DCFCE7" },
                    { label: "Tree Equivalent", value: `${result.trees} Trees`, icon: TreeDeciduous, color: "#84CC16", bg: "#F7FEE7" },
                    { label: "Impact Score", value: result.score, icon: Zap, color: scoreColors[result.score] || "#22C55E", bg: "#F0FDF4" },
                  ].map(({ label, value, icon: Icon, color, bg }) => (
                    <div key={label} className="bg-white rounded-2xl p-5 border border-[#E5E7EB]">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: bg }}>
                        <Icon className="w-5 h-5" style={{ color }} />
                      </div>
                      <div className="text-[#111827]" style={{ fontWeight: 800, fontSize: "1.4rem" }}>{value}</div>
                      <div className="text-xs text-[#6B7280] mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
                  <h3 className="text-[#111827] mb-1" style={{ fontWeight: 700 }}>Projected Emission Trajectory</h3>
                  <p className="text-xs text-[#6B7280] mb-4">Monthly kg CO₂ · Current vs. After Habit Change</p>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={chartData} barGap={4}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                      <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB", fontSize: "12px" }}
                        formatter={(v: number) => [`${v.toFixed(0)} kg CO₂`, ""]}
                      />
                      <Bar dataKey="current" name="Current" radius={[4, 4, 0, 0]} fill="#E5E7EB" />
                      <Bar dataKey="projected" name="After Change" radius={[4, 4, 0, 0]} fill="#22C55E" />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="flex items-center gap-4 mt-3 justify-center">
                    <span className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                      <span className="w-3 h-3 rounded bg-[#E5E7EB] inline-block" /> Current
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                      <span className="w-3 h-3 rounded bg-[#22C55E] inline-block" /> After Change
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}