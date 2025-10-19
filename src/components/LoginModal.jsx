import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// 💡 IMPORTANT: Import Link from React Router
import { Link } from 'react-router-dom'; 

const LoginModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} 
        >
          
          <motion.div
            className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-sm w-full text-center relative border border-indigo-700 text-white"
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: "0", opacity: 1 }}
            exit={{ y: "100vh", opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-3xl transition leading-none"
              aria-label="Close"
            >
              &times;
            </button>

            {/* Icon (Example: Key/Lock Icon) */}
            <svg className="w-14 h-14 mx-auto text-indigo-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>

            {/* Title & Message */}
            <h2 className="text-3xl font-bold text-indigo-300 mb-3">Login Required 🔒</h2>
            <p className="text-gray-300 mb-8 text-lg">
              You need to be signed in to generate and **save** your innovative pitches.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-4">
                {/* 🚨 FIX: Replaced <a> with Link and href with to */}
              <Link 
                to="/login" 
                onClick={onClose} // Close the modal before navigating
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg 
                           hover:bg-indigo-700 transition duration-300 ease-in-out shadow-md
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                Log In Now
              </Link>
                
                {/* 🚨 FIX: Replaced <a> with Link and href with to */}
              <Link 
                to="/register" 
                className="px-6 py-3 text-indigo-300 border border-indigo-500 rounded-lg 
                           hover:bg-indigo-700/20 transition duration-300 ease-in-out"
                onClick={onClose} // Close the modal before navigating
              >
                Create an Account
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;