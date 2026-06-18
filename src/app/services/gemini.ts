import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

export async function askEcoTrackaicoach(question: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: question,
      config: {
        systemInstruction: `You are EcoTrack AI Coach, a personalized sustainability assistant for Shahzeen Anwar. 
        Her carbon footprint is 212 kg CO₂/month with a score of 68/100.
        Help her reduce emissions, suggest eco-friendly habits, analyze transport/diet/energy choices.
        Be concise, encouraging, and use **bold** for key points.`,
      },
    });
    return response.text ?? "No response received.";
  } catch (error: any) {
    console.error("GEMINI ERROR:", error);
    throw error;
  }
}