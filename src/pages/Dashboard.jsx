

import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { exportPitchToPDF } from "../utils/exportToPDF";

const Dashboard = () => {
  const { user } = useAuth();
  const [pitches, setPitches] = useState([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "pitches"),
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userPitches = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPitches(userPitches);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto text-white">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-teal-400 text-transparent bg-clip-text mb-8 text-center">
        Your AI-Generated Startup Pitches 💡
      </h1>

      {pitches.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-400"
        >
          No pitches yet. Go generate one from the home page!
        </motion.p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pitches.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-lg hover:shadow-teal-500/30 transition-all duration-300"
            >
              <h2 className="text-xl font-bold text-teal-400 mb-1">{p.name}</h2>
              <p className="italic text-indigo-300 mb-2">{p.tagline}</p>
              <p className="text-sm text-gray-300 mb-2">{p.pitch}</p>
              {p.hero && (
                <p className="text-xs text-gray-400 mb-2">{p.hero}</p>
              )}
              <p className="text-[10px] text-gray-500 mt-1">
                {p.createdAt?.toDate
                  ? p.createdAt.toDate().toLocaleString()
                  : "Just now"}
              </p>

              {/* 🔽 Export Button */}
              <div className="flex justify-end mt-3">
                <button
                  onClick={() => exportPitchToPDF(p)}
                  className="text-xs text-teal-400 hover:text-teal-500 transition"
                >
                  Export PDF
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

