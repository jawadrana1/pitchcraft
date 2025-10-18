import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-teal-400 text-transparent bg-clip-text mb-4">
          Create Account
        </h1>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            className="w-full mb-3 p-3 rounded bg-white/10 border border-white/20 outline-none text-white"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full mb-3 p-3 rounded bg-white/10 border border-white/20 outline-none text-white"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-indigo-500 to-teal-500 hover:scale-105 transition-transform"
          >
            Register
          </button>
          {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
        </form>
        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-teal-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </motion.div>
  );
};

export default Register;
