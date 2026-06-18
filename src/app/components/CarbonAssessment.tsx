import { useState } from "react";
import {
  Car, Zap, Utensils, ShoppingBag, Trash2, CheckCircle2,
  ArrowRight, ArrowLeft, Leaf
} from "lucide-react";

interface CarbonAssessmentProps {
  setCurrentPage: (page: string) => void;
}

const steps = [
  { id: 1, label: "Transportation", icon: Car },
  { id: 2, label: "Electricity", icon: Zap },
  { id: 3, label: "Food Habits", icon: Utensils },
  { id: 4, label: "Shopping", icon: ShoppingBag },
  { id: 5, label: "Waste", icon: Trash2 },
];

export function CarbonAssessment({ setCurrentPage }: CarbonAssessmentProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const setAnswer = (key: string, value: string) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep((s) => s + 1);
    else setSubmitted(true);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F8FAF8] pt-20 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-10 border border-[#E5E7EB] max-w-md w-full text-center shadow-xl">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-green-200">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-[#111827] mb-2" style={{ fontWeight: 800, fontSize: "1.5rem" }}>
            Assessment Complete!
          </h2>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-6">
            Your carbon footprint has been calculated. Your score is <strong className="text-[#22C55E]">68/100</strong> — above average and improving!
          </p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { label: "Carbon Score", value: "68/100" },
              { label: "Monthly CO₂", value: "212 kg" },
              { label: "Global Avg", value: "400 kg" },
              { label: "Your Rank", value: "Top 32%" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[#F0FDF4] rounded-xl p-3">
                <div className="text-[#22C55E]" style={{ fontWeight: 700 }}>{value}</div>
                <div className="text-xs text-[#6B7280]">{label}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage("dashboard")}
            className="w-full py-3.5 bg-[#22C55E] text-white rounded-full hover:bg-[#16A34A] transition-colors flex items-center justify-center gap-2"
            style={{ fontWeight: 700 }}
          >
            View Your Dashboard <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const progress = ((currentStep - 1) / 4) * 100;

  return (
    <div className="min-h-screen bg-[#F8FAF8] pt-20 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] text-[#16A34A] text-xs mb-3" style={{ fontWeight: 600 }}>
            <Leaf className="w-3.5 h-3.5" /> CARBON ASSESSMENT
          </span>
          <h1 className="text-[#111827] mb-2" style={{ fontWeight: 800, fontSize: "1.75rem" }}>
            Know Your Carbon Footprint
          </h1>
          <p className="text-[#6B7280] text-sm">5 quick categories · Takes less than 3 minutes</p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute top-4 left-4 right-4 h-0.5 bg-[#E5E7EB] z-0" />
          <div
            className="absolute top-4 left-4 h-0.5 bg-[#22C55E] z-0 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
          {steps.map(({ id, label, icon: Icon }) => {
            const done = id < currentStep;
            const active = id === currentStep;
            return (
              <div key={id} className="flex flex-col items-center gap-2 z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    done
                      ? "bg-[#22C55E]"
                      : active
                      ? "bg-[#22C55E] ring-4 ring-[#22C55E]/20"
                      : "bg-white border-2 border-[#E5E7EB]"
                  }`}
                >
                  {done ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : (
                    <Icon className={`w-4 h-4 ${active ? "text-white" : "text-[#9CA3AF]"}`} />
                  )}
                </div>
                <span
                  className={`text-xs hidden sm:block ${active ? "text-[#22C55E]" : done ? "text-[#374151]" : "text-[#9CA3AF]"}`}
                  style={{ fontWeight: active ? 600 : 400 }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-8 border border-[#E5E7EB] shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            {(() => {
              const { icon: Icon, label } = steps[currentStep - 1];
              return (
                <>
                  <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#22C55E]" />
                  </div>
                  <div>
                    <div className="text-xs text-[#6B7280]">Step {currentStep} of 5</div>
                    <h2 className="text-[#111827]" style={{ fontWeight: 700, fontSize: "1.15rem" }}>{label}</h2>
                  </div>
                </>
              );
            })()}
          </div>

          {/* Step 1: Transportation */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm text-[#374151] mb-2" style={{ fontWeight: 600 }}>
                  How far do you travel daily?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["< 5 km", "5–15 km", "15–30 km", "> 30 km"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setAnswer("distance", opt)}
                      className={`py-2.5 rounded-xl text-sm border transition-all ${
                        answers.distance === opt
                          ? "bg-[#22C55E] text-white border-[#22C55E]"
                          : "border-[#E5E7EB] text-[#374151] hover:border-[#22C55E] hover:text-[#22C55E]"
                      }`}
                      style={{ fontWeight: answers.distance === opt ? 600 : 400 }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#374151] mb-2" style={{ fontWeight: 600 }}>
                  Primary vehicle type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {["Car (Petrol)", "Car (Diesel)", "Electric Car", "Bike/Scooter", "Public Transit", "Walk/Cycle"].map((v) => (
                    <button
                      key={v}
                      onClick={() => setAnswer("vehicle", v)}
                      className={`py-2.5 px-3 rounded-xl text-sm border transition-all text-left ${
                        answers.vehicle === v
                          ? "bg-[#22C55E] text-white border-[#22C55E]"
                          : "border-[#E5E7EB] text-[#374151] hover:border-[#22C55E] hover:text-[#22C55E]"
                      }`}
                      style={{ fontWeight: answers.vehicle === v ? 600 : 400 }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Electricity */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm text-[#374151] mb-2" style={{ fontWeight: 600 }}>
                  Monthly electricity consumption
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["< 100 units", "100–200 units", "200–400 units", "> 400 units"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setAnswer("electricity", opt)}
                      className={`py-2.5 rounded-xl text-sm border transition-all ${
                        answers.electricity === opt
                          ? "bg-[#22C55E] text-white border-[#22C55E]"
                          : "border-[#E5E7EB] text-[#374151] hover:border-[#22C55E] hover:text-[#22C55E]"
                      }`}
                      style={{ fontWeight: answers.electricity === opt ? 600 : 400 }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#374151] mb-2" style={{ fontWeight: 600 }}>
                  Do you use renewable energy?
                </label>
                <div className="flex gap-2">
                  {["Yes, fully", "Partially", "No"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setAnswer("renewable", opt)}
                      className={`flex-1 py-2.5 rounded-xl text-sm border transition-all ${
                        answers.renewable === opt
                          ? "bg-[#22C55E] text-white border-[#22C55E]"
                          : "border-[#E5E7EB] text-[#374151] hover:border-[#22C55E] hover:text-[#22C55E]"
                      }`}
                      style={{ fontWeight: answers.renewable === opt ? 600 : 400 }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Food */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm text-[#374151] mb-2" style={{ fontWeight: 600 }}>
                  What best describes your diet?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: "Vegetarian", desc: "No meat", emoji: "🥗", co2: "Low impact" },
                    { label: "Mixed", desc: "Occasionally meat", emoji: "🍽️", co2: "Medium impact" },
                    { label: "Non-Vegetarian", desc: "Regular meat", emoji: "🥩", co2: "Higher impact" },
                  ].map(({ label, desc, emoji, co2 }) => (
                    <button
                      key={label}
                      onClick={() => setAnswer("diet", label)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        answers.diet === label
                          ? "bg-[#F0FDF4] border-[#22C55E]"
                          : "border-[#E5E7EB] hover:border-[#22C55E]"
                      }`}
                    >
                      <div className="text-2xl mb-2">{emoji}</div>
                      <div className="text-sm text-[#111827]" style={{ fontWeight: 600 }}>{label}</div>
                      <div className="text-xs text-[#6B7280]">{desc}</div>
                      <div className={`text-xs mt-1 ${answers.diet === label ? "text-[#22C55E]" : "text-[#9CA3AF]"}`} style={{ fontWeight: 500 }}>
                        {co2}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Shopping */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm text-[#374151] mb-2" style={{ fontWeight: 600 }}>
                  How often do you shop for new clothes/electronics?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["Rarely", "Monthly", "Weekly", "Very Often"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setAnswer("shopping", opt)}
                      className={`py-2.5 rounded-xl text-sm border transition-all ${
                        answers.shopping === opt
                          ? "bg-[#22C55E] text-white border-[#22C55E]"
                          : "border-[#E5E7EB] text-[#374151] hover:border-[#22C55E] hover:text-[#22C55E]"
                      }`}
                      style={{ fontWeight: answers.shopping === opt ? 600 : 400 }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#374151] mb-2" style={{ fontWeight: 600 }}>
                  Do you prefer sustainable/second-hand items?
                </label>
                <div className="flex gap-2">
                  {["Always", "Sometimes", "Rarely"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setAnswer("sustainable_shopping", opt)}
                      className={`flex-1 py-2.5 rounded-xl text-sm border transition-all ${
                        answers.sustainable_shopping === opt
                          ? "bg-[#22C55E] text-white border-[#22C55E]"
                          : "border-[#E5E7EB] text-[#374151] hover:border-[#22C55E] hover:text-[#22C55E]"
                      }`}
                      style={{ fontWeight: answers.sustainable_shopping === opt ? 600 : 400 }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Waste */}
          {currentStep === 5 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm text-[#374151] mb-2" style={{ fontWeight: 600 }}>
                  How much of your household waste do you recycle?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["Almost all", "More than half", "Less than half", "Rarely"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setAnswer("recycling", opt)}
                      className={`py-2.5 rounded-xl text-sm border transition-all ${
                        answers.recycling === opt
                          ? "bg-[#22C55E] text-white border-[#22C55E]"
                          : "border-[#E5E7EB] text-[#374151] hover:border-[#22C55E] hover:text-[#22C55E]"
                      }`}
                      style={{ fontWeight: answers.recycling === opt ? 600 : 400 }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#374151] mb-2" style={{ fontWeight: 600 }}>
                  Do you compost food waste?
                </label>
                <div className="flex gap-2">
                  {["Yes, regularly", "Sometimes", "Never"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setAnswer("compost", opt)}
                      className={`flex-1 py-2.5 rounded-xl text-sm border transition-all ${
                        answers.compost === opt
                          ? "bg-[#22C55E] text-white border-[#22C55E]"
                          : "border-[#E5E7EB] text-[#374151] hover:border-[#22C55E] hover:text-[#22C55E]"
                      }`}
                      style={{ fontWeight: answers.compost === opt ? 600 : 400 }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#F3F4F6]">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-4 py-2.5 border border-[#E5E7EB] rounded-full text-sm text-[#374151] hover:border-[#22C55E] hover:text-[#22C55E] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="text-xs text-[#9CA3AF]">{currentStep} / 5</div>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#22C55E] text-white rounded-full text-sm hover:bg-[#16A34A] transition-colors shadow-sm"
              style={{ fontWeight: 600 }}
            >
              {currentStep === 5 ? "Calculate Score" : "Continue"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
