import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Initialize Gemini
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generatePitch = async (idea) => {
  try {
    // Create a model instance
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Build prompt
    const prompt = `
      Generate a creative startup pitch for this idea: "${idea}".
      Include:
      - Startup name (1-2 words, catchy)
      - Tagline (short and memorable)
      - A short startup pitch paragraph
      - A single sentence hero line for website banner

      Format response as JSON:
      {
        "name": "",
        "tagline": "",
        "pitch": "",
        "hero": ""
      }
    `;

    // Get response
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Parse JSON safely
    const cleaned = text.replace(/```json|```/g, "").trim();
    const data = JSON.parse(cleaned);

    return data;
  } catch (error) {
    console.error("❌ Error generating pitch:", error);
    return {
      name: "StartupX",
      tagline: "Innovation Begins Here",
      pitch: "An AI-powered platform to turn your ideas into reality.",
      hero: "Building the future together.",
    };
  }
};
