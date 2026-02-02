"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/lib/requireAdmin";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import AdminLogoutButton from "@/components/AdminLogoutButton";
import { API_BASE_URL } from "@/lib/config";

const inputClass =
  "w-full bg-white text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500";

export default function AdminPage() {
  const router = useRouter();



  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(0);
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleOptionChange(index: number, value: string) {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetchWithAuth(`${API_BASE_URL}/api/questions`, {
        method: "POST",
        body: JSON.stringify({
          question,
          options,
          correctOption,
          topic,
          difficulty,
          marks: 1,
        }),
      });

      if (!res.ok) throw new Error();

      setMessage("✅ Question added successfully");
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectOption(0);
      setTopic("");
      setDifficulty("easy");
    } catch {
      setMessage("❌ Failed to add question");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.main
      className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}>
      
      <motion.div
        className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-lg p-8"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}>
        <motion.h1
          className="text-2xl font-bold text-center text-slate-900 mb-6"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}>
          Admin – Add Question
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Question */}
          <input
            type="text"
            placeholder="Enter question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className={inputClass}
            required
          />

          {/* Options */}
          {options.map((opt, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(i, e.target.value)}
              className={inputClass}
              required
            />
          ))}

          {/* Correct Option */}
          <select
            value={correctOption}
            onChange={(e) => setCorrectOption(Number(e.target.value))}
            className={inputClass}>
            <option value={0}>Correct Option: 1</option>
            <option value={1}>Correct Option: 2</option>
            <option value={2}>Correct Option: 3</option>
            <option value={3}>Correct Option: 4</option>
          </select>

          {/* Topic */}
          <input
            type="text"
            placeholder="Topic (e.g. JavaScript)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className={inputClass}
            required
          />

          {/* Difficulty */}
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className={inputClass}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 bg-blue-600 text-white rounded-xl text-lg font-medium hover:bg-blue-700 transition shadow-md">
            {loading ? "Adding..." : "Add Question"}
          </motion.button>

          {/* Message */}
          {message && (
            <motion.p
              className="text-center text-sm mt-2 text-slate-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}>
              {message}
            </motion.p>
          )}
        </form>
      </motion.div>
    </motion.main>
  );
}
