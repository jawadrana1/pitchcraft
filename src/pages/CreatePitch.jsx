import { useState } from "react";
import { motion } from "framer-motion";
import { generatePitch } from "../utils/generatePitch";
import { db } from "../firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Sparkles } from "lucide-react";

const CreatePitch = () => {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { user } = useAuth();

  const handleGenerate = async () => {
    // 1️⃣ Check if user is logged in
    if (!user) return alert("Please login to save your pitches!");
    if (!idea.trim()) return alert("Please enter your startup idea!");

    setLoading(true);
    try {
      // 2️⃣ Generate pitch using AI
      const data = await generatePitch(idea);

      // 3️⃣ Save generated data into Firestore
      await addDoc(collection(db, "pitches"), {
        uid: user.uid,          // which user this pitch belongs to
        idea,                   // what they typed
        ...data,                // name, tagline, pitch, hero, etc.
        createdAt: serverTimestamp(), // Firestore server timestamp
      });

      // 4️⃣ Show result on screen
      setResult(data);
      console.log("Pitch saved to Firestore!");
    } catch (err) {
      console.error("Error generating pitch:", err);
      alert("Something went wrong while generating the pitch.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="pt-24 px-6 text-center max-w-3xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-teal-400 text-transparent bg-clip-text mb-6">
        PitchCraft – Tumhara AI Startup Partner 🚀
      </h1>

      <motion.textarea
        whileFocus={{ scale: 1.02 }}
        className="w-full h-32 p-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 outline-none resize-none"
        placeholder="Describe your startup idea..."
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleGenerate}
        disabled={loading}
        className="mt-4 px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-indigo-500 to-teal-500 shadow-lg hover:shadow-teal-500/30 transition-all"
      >
        {loading ? "Generating..." : <><Sparkles className="inline mr-2" /> Generate Pitch</>}
      </motion.button>

      {result && (
        <motion.div
          className="mt-8 p-6 rounded-xl bg-white/10 border border-white/20 text-left shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold text-indigo-300 mb-2">{result.name}</h2>
          <p className="italic text-teal-400 mb-2">{result.tagline}</p>
          <p className="mb-2">{result.pitch}</p>
          <p className="text-gray-300 text-sm mt-2">{result.hero}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CreatePitch;
