import { useState } from "react";
import { motion } from "framer-motion";
import { generatePitch } from "../utils/generatePitch";
import { db } from "../firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Sparkles } from "lucide-react";

import LoginModal from "../components/LoginModal"; 

const CreatePitch = () => {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { user } = useAuth();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [ideaError, setIdeaError] = useState("");

  const handleGenerate = async () => {
    // Clear previous errors
    setIdeaError("");

    
    if (!user) {
        setIsModalOpen(true); // Open the modal
        return; 
    }
    
    
    if (!idea.trim()) {
        setIdeaError("Please enter your startup idea!");
        return; 
    }

    setLoading(true);
    try {
      // Generate pitch using AI
      const data = await generatePitch(idea);

      
      await addDoc(collection(db, "pitches"), {
        uid: user.uid,          // which user this pitch belongs to
        idea,                   // what they typed
        ...data,                // name, tagline, pitch, hero, etc.
        createdAt: serverTimestamp(), // Firestore server timestamp
      });

      
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
        className={`w-full h-32 p-4 rounded-lg backdrop-blur-md text-white placeholder-gray-300 outline-none resize-none 
                 ${ideaError ? 'border-red-500 bg-red-900/10' : 'border-white/20 bg-white/10'}`}
        placeholder="Describe your startup idea..."
        value={idea}
        onChange={(e) => {
            setIdea(e.target.value);
            // Clear the idea error as the user types
            if (ideaError) setIdeaError("");
        }}
      />
      
      {/* 🆕 Display the idea validation error */}
      {ideaError && (
          <motion.p 
              className="text-red-400 text-sm mt-2 text-left"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
          >
              {ideaError}
          </motion.p>
      )}

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
      
      {/* 🆕 Render the Login Modal */}
      <LoginModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
      />
      
    </motion.div>
  );
};

export default CreatePitch;