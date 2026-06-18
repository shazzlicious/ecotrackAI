import { CheckCircle2, ArrowRight, Leaf, Zap, Star, Shield } from "lucide-react";

interface PricingPageProps {
  setCurrentPage: (page: string) => void;
}

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Perfect for getting started with your eco journey.",
    color: "#6B7280",
    accent: "#F3F4F6",
    border: "#E5E7EB",
    badge: null,
    features: [
      "Carbon footprint assessment",
      "Basic dashboard & score",
      "5 eco-challenges per month",
      "Community leaderboard",
      "Email weekly summary",
    ],
    cta: "Get Started Free",
    ctaStyle: "outline",
  },
  {
    name: "Pro",
    price: "₹299",
    period: "per month",
    description: "For individuals serious about reducing their impact.",
    color: "#22C55E",
    accent: "#F0FDF4",
    border: "#22C55E",
    badge: "Most Popular",
    features: [
      "Everything in Free",
      "Unlimited AI Coach sessions",
      "Future Simulator access",
      "Detailed emission breakdowns",
      "Unlimited eco-challenges",
      "Priority support",
      "Custom action plans",
    ],
    cta: "Start Pro Trial",
    ctaStyle: "filled",
  },
  {
    name: "Team",
    price: "₹199",
    period: "per user / month",
    description: "Built for offices, schools, and sustainability teams.",
    color: "#16A34A",
    accent: "#DCFCE7",
    border: "#E5E7EB",
    badge: "For Teams",
    features: [
      "Everything in Pro",
      "Team carbon dashboard",
      "Group challenges & leaderboards",
      "Admin analytics panel",
      "Bulk onboarding (10+ users)",
      "Dedicated account manager",
      "Custom branding",
    ],
    cta: "Contact Sales",
    ctaStyle: "outline-green",
  },
];

const faqs = [
  {
    q: "Is the free plan really free forever?",
    a: "Yes. No credit card needed, no time limit. The Free plan gives you core tracking and assessment features at no cost.",
  },
  {
    q: "Can I cancel my Pro subscription anytime?",
    a: "Absolutely. Cancel from your account settings in one click. You keep access until the end of your billing period.",
  },
  {
    q: "How does the Team plan billing work?",
    a: "You're billed monthly per active user. Add or remove members anytime — billing adjusts automatically.",
  },
  {
    q: "Do you offer annual discounts?",
    a: "Yes — pay annually and get 2 months free on Pro (₹2,990/year) and Team (₹1,990/user/year).",
  },
];

const guarantees = [
  { icon: Shield, text: "30-day money-back guarantee" },
  { icon: Zap, text: "Cancel anytime, no questions" },
  { icon: Star, text: "4.9★ rated by 50,000+ users" },
];

export function PricingPage({ setCurrentPage }: PricingPageProps) {
  return (
    <div className="bg-[#F8FAF8] pt-20">
      {/* Header */}
      <section className="py-16 text-center px-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] text-[#16A34A] text-xs mb-4" style={{ fontWeight: 600 }}>
          <Leaf className="w-3.5 h-3.5" /> PRICING
        </span>
        <h1 className="text-[#111827] mb-3" style={{ fontWeight: 800, fontSize: "2.5rem", lineHeight: 1.2 }}>
          Simple, transparent pricing
        </h1>
        <p className="text-[#6B7280] max-w-md mx-auto text-sm leading-relaxed">
          Start free and upgrade as your eco journey grows. No hidden fees, no surprises.
        </p>

        {/* Annual toggle hint */}
        <div className="mt-6 inline-flex items-center gap-2 bg-white border border-[#E5E7EB] rounded-full px-4 py-2 text-sm text-[#374151]">
          <span>💡</span>
          <span>Switch to annual and save 2 months — <strong className="text-[#22C55E]">up to ₹600/year</strong></span>
        </div>
      </section>

      {/* Plans */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map(({ name, price, period, description, color, accent, border, badge, features, cta, ctaStyle }) => (
            <div
              key={name}
              className="relative bg-white rounded-3xl p-8 border-2 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{ borderColor: border }}
            >
              {/* Badge */}
              {badge && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs text-white"
                  style={{ background: color, fontWeight: 700 }}
                >
                  {badge}
                </div>
              )}

              {/* Plan name & icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: accent }}
              >
                <Leaf className="w-5 h-5" style={{ color }} />
              </div>

              <div className="mb-1 text-[#111827]" style={{ fontWeight: 700, fontSize: "1.1rem" }}>{name}</div>
              <p className="text-[#6B7280] text-xs mb-5 leading-relaxed">{description}</p>

              {/* Price */}
              <div className="flex items-end gap-1 mb-6">
                <span className="text-[#111827]" style={{ fontWeight: 800, fontSize: "2.25rem", lineHeight: 1 }}>{price}</span>
                <span className="text-[#9CA3AF] text-sm mb-1">/{period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[#374151]">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color }} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {ctaStyle === "filled" ? (
                <button
                  onClick={() => setCurrentPage("assessment")}
                  className="w-full py-3.5 rounded-full text-white flex items-center justify-center gap-2 transition-colors shadow-md"
                  style={{ background: color, fontWeight: 700 }}
                  onMouseOver={(e) => (e.currentTarget.style.background = "#16A34A")}
                  onMouseOut={(e) => (e.currentTarget.style.background = color)}
                >
                  {cta} <ArrowRight className="w-4 h-4" />
                </button>
              ) : ctaStyle === "outline-green" ? (
                <button
                  onClick={() => setCurrentPage("landing")}
                  className="w-full py-3.5 rounded-full border-2 text-[#16A34A] hover:bg-[#F0FDF4] flex items-center justify-center gap-2 transition-colors"
                  style={{ borderColor: "#22C55E", fontWeight: 600 }}
                >
                  {cta} <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setCurrentPage("assessment")}
                  className="w-full py-3.5 rounded-full border border-[#E5E7EB] text-[#374151] hover:border-[#22C55E] hover:text-[#22C55E] flex items-center justify-center gap-2 transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  {cta} <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Guarantees */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          {guarantees.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm text-[#6B7280]">
              <Icon className="w-4 h-4 text-[#22C55E]" />
              {text}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] text-[#16A34A] text-xs mb-4" style={{ fontWeight: 600 }}>
              FAQ
            </span>
            <h2 className="text-[#111827]" style={{ fontWeight: 800, fontSize: "1.75rem" }}>
              Common questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="bg-[#F8FAF8] rounded-2xl p-6 border border-[#E5E7EB]">
                <div className="text-[#111827] mb-2" style={{ fontWeight: 700, fontSize: "0.95rem" }}>{q}</div>
                <p className="text-[#6B7280] text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-gradient-to-br from-[#14532D] to-[#16A34A]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-white mb-4" style={{ fontWeight: 800, fontSize: "2rem" }}>
            Ready to reduce your footprint?
          </h2>
          <p className="text-green-200 mb-8 text-sm">Start free — no credit card required.</p>
          <button
            onClick={() => setCurrentPage("assessment")}
            className="px-10 py-4 bg-white text-[#16A34A] rounded-full hover:bg-green-50 transition-colors shadow-lg flex items-center gap-2 mx-auto"
            style={{ fontWeight: 700 }}
          >
            Take the Free Assessment <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}