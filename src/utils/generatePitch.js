// src/utils/generatePitch.js
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Unified AI Pitch Generator — supports Gemini (default) and OpenAI.
 */

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

/**
 * @param {string} idea - The startup idea or concept.
 * @param {"Gemini"|"OpenAI"} engine - Which model to use (default: Gemini).
 * @returns {Promise<object>} - The generated pitch details.
 */
export const generatePitch = async (idea, engine = "Gemini") => {
  if (!idea?.trim()) {
    return {
      name: "Idea Missing",
      tagline: "Please enter a startup idea first.",
      pitch: "No input provided.",
      hero: "Waiting for inspiration...",
      provider: engine,
    };
  }

  try {
    if (engine === "Gemini") {
      // ✅ Use Google Gemini (frontend)
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
        Generate a creative startup pitch for this idea: "${idea}".
        Include:
        - name (1-2 words, catchy)
        - tagline (short, memorable)
        - pitch (1 short paragraph)
        - hero (1 sentence for a website banner)
        Format as JSON:
        {
          "name": "",
          "tagline": "",
          "pitch": "",
          "hero": ""
        }
      `;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const cleaned = text.replace(/```json|```/g, "").trim();
      const data = JSON.parse(cleaned);

      return { ...data, provider: "Gemini" };
    } else {
      // ✅ Use OpenAI via your backend
      const res = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });

      if (!res.ok) throw new Error("OpenAI backend error");

      const data = await res.json();
      return {
        name: data.name || "Unnamed Project",
        tagline: data.tagline || "Innovating the future.",
        pitch: data.description || "A groundbreaking AI-driven concept.",
        hero: data.hero || "Where creativity meets intelligence.",
        provider: "OpenAI",
      };
    }
  } catch (error) {
    console.error("Error generating pitch:", error);
    return {
      name: "FallbackAI",
      tagline: "Ideas Never Stop.",
      pitch: "An intelligent tool to help creators bring ideas to life.",
      hero: "Turning imagination into innovation.",
      provider: engine,
    };
  }
};
