import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Leaf, Sparkles, MessageSquare, Plus } from "lucide-react";
import { askEcoTrackaicoach } from "../services/gemini";
interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const suggestedQuestions = [
  "How can I reduce my emissions?",
  "How much CO₂ does a flight emit?",
  "What can I do to save electricity?",
  "Should I use metro or bike?",
];

const conversations = [
  { id: 1, title: "Carbon reduction tips", date: "Today" },
  { id: 2, title: "Electric vehicle impact", date: "Yesterday" },
  { id: 3, title: "Vegetarian diet analysis", date: "Jun 12" },
  { id: 4, title: "Solar panels ROI", date: "Jun 10" },
];

export function AICoach() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi Shahzeen! 🌱 I'm your EcoTrack AI Coach. I've analyzed your carbon footprint (212 kg CO₂/month, score 68/100) and I'm ready to help you build a greener lifestyle.\n\nWhat would you like to explore today?",
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isTyping]);

const sendMessage = async (text: string) => {
  if (!text.trim()) return;

  const userMsg: Message = {
    id: Date.now(),
    role: "user",
    content: text,
    timestamp: "Just now",
  };

  setMessages((prev) => [...prev, userMsg]);
  setInput("");
  setIsTyping(true);

  try {
    const response = await askEcoTrackaicoach(text);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        role: "assistant",
        content: response,
        timestamp: "Just now",
      },
    ]);
  } 
  catch (error) {
    console.error("Gemini Error:", error);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        role: "assistant",
        content: "Sorry, Gemini AI is currently unavailable.",
        timestamp: "Just now",
      },
    ]);
  }

  setIsTyping(false);
};

const renderMarkdown = (text: string) =>
    text.split("\n").map((line, i) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={i}>
          {parts.map((part, j) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={j}>{part.slice(2, -2)}</strong>
            ) : (
              part
            )
          )}
          <br />
        </span>
      );
    });

  return (
    <div className="min-h-screen bg-[#F8FAF8] pt-16 flex">
      {/* Sidebar */}
      <div className="hidden lg:flex w-64 bg-white border-r border-[#E5E7EB] flex-col">
        <div className="p-4 border-b border-[#E5E7EB]">
          <button className="w-full flex items-center gap-2 px-4 py-2.5 bg-[#22C55E] text-white rounded-xl text-sm hover:bg-[#16A34A] transition-colors" style={{ fontWeight: 600 }}>
            <Plus className="w-4 h-4" /> New Conversation
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <p className="text-xs text-[#9CA3AF] px-2 mb-2" style={{ fontWeight: 600 }}>RECENT CHATS</p>
          {conversations.map(({ id, title, date }) => (
            <button
              key={id}
              className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left mb-1 transition-colors ${
                id === 1 ? "bg-[#F0FDF4] text-[#22C55E]" : "hover:bg-[#F9FAFB] text-[#374151]"
              }`}
            >
              <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs truncate" style={{ fontWeight: id === 1 ? 600 : 400 }}>{title}</p>
                <p className="text-xs text-[#9CA3AF]">{date}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-[#E5E7EB]">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F0FDF4]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs" style={{ fontWeight: 700 }}>SA</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#111827] truncate" style={{ fontWeight: 600 }}>Shahzeen Anwar</p>
              <p className="text-xs text-[#22C55E]">Score: 68/100</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main chat */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat header */}
        <div className="bg-white border-b border-[#E5E7EB] px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-[#111827]" style={{ fontWeight: 700 }}>EcoTrack AI Coach</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] inline-block"></span>
              <span className="text-xs text-[#6B7280]">Online · Personalized for Shahzeen</span>
            </div>
          </div>
          <div className="ml-auto">
            <span className="flex items-center gap-1 text-xs text-[#22C55E] bg-[#F0FDF4] px-2.5 py-1 rounded-full" style={{ fontWeight: 600 }}>
              <Sparkles className="w-3 h-3" /> AI Powered
            </span>
          </div>
        </div>

        {/* Messages */}
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-4 max-w-4xl w-full mx-auto">
          {messages.map(({ id, role, content }) => (
            <div key={id} className={`flex gap-3 ${role === "user" ? "flex-row-reverse" : ""}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                  role === "assistant"
                    ? "bg-gradient-to-br from-[#22C55E] to-[#16A34A]"
                    : "bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9]"
                }`}
              >
                {role === "assistant" ? (
                  <Bot className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  role === "user"
                    ? "bg-[#22C55E] text-white rounded-tr-sm"
                    : "bg-white border border-[#E5E7EB] text-[#374151] rounded-tl-sm"
                }`}
              >
                {renderMarkdown(content)}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-[#E5E7EB] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    className="w-2 h-2 rounded-full bg-[#22C55E] inline-block"
                    style={{ animation: `pulse 1.2s ease-in-out ${delay}ms infinite` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Suggested questions */}
        {messages.length <= 2 && (
          <div className="px-4 sm:px-6 pb-3 max-w-4xl w-full mx-auto">
            <p className="text-xs text-[#9CA3AF] mb-2" style={{ fontWeight: 600 }}>SUGGESTED QUESTIONS</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-full text-xs text-[#374151] hover:border-[#22C55E] hover:text-[#22C55E] transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
        {/* Input */}
        <div className="bg-white border-t border-[#E5E7EB] px-4 sm:px-6 py-4">
          <div className="max-w-4xl mx-auto flex gap-3">
            <div className="flex-1 flex items-center gap-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl px-4 py-2.5 focus-within:border-[#22C55E] focus-within:ring-2 focus-within:ring-[#22C55E]/20 transition-all">
              <Leaf className="w-4 h-4 text-[#9CA3AF] flex-shrink-0" />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Ask EcoTrack AI..."
                className="flex-1 bg-transparent text-sm text-[#374151] placeholder-[#9CA3AF] outline-none"
              />
            </div>
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 rounded-xl bg-[#22C55E] text-white flex items-center justify-center hover:bg-[#16A34A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  }
