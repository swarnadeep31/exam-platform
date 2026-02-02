"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

const inputClass =
  "w-full bg-white text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetchWithAuth(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          skipAuth: true, // 🔑 VERY IMPORTANT
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      const data = await res.json();
      localStorage.setItem("adminToken", data.token);
      router.push("/admin");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.main
      className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-white to-slate-100 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.form
        onSubmit={handleLogin}
        className="bg-white border border-slate-200 rounded-2xl shadow-xl w-full max-w-sm p-8 space-y-5"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mx-auto w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
            🔐
          </div>
          <h1 className="text-2xl font-bold mt-4 text-slate-900">
            Admin Login
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Access the admin dashboard
          </p>
        </motion.div>

        {/* Email */}
        <input
          type="email"
          className={inputClass}
          placeholder="Admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password */}
        <input
          type="password"
          className={inputClass}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Error */}
        {error && (
          <motion.p
            className="text-red-600 text-sm text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}

        {/* Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 bg-blue-600 text-white rounded-xl text-lg font-medium hover:bg-blue-700 transition shadow-md disabled:opacity-70"
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>
      </motion.form>
    </motion.main>
  );
}
