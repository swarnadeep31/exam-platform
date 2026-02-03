"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { isAdmin } from "@/lib/requireAdmin";
import { API_BASE_URL } from "@/lib/config";

const inputClass =
  "w-full bg-white text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500";

export default function EditQuestionPage() {
  const { id } = useParams();
  const router = useRouter();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(0);
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!isAdmin()) {
    router.push("/admin/login");
  }
}, [router]);


  useEffect(() => {
    async function load() {
      const res = await fetch(`${API_BASE_URL}/api/questions/${id}`);
      const data = await res.json();
      setQuestion(data.question);
      setOptions(data.options);
      setCorrectOption(data.correctOption);
      setTopic(data.topic);
      setDifficulty(data.difficulty);
      setLoading(false);
    }
    load();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch(`${API_BASE_URL}/api/questions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        options,
        correctOption,
        topic,
        difficulty,
        marks: 1,
      }),
    });

    router.push("/admin/questions");
  }

  function handleOptionChange(i: number, value: string) {
    const copy = [...options];
    copy[i] = value;
    setOptions(copy);
  }

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <motion.main
      className="min-h-screen bg-slate-50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-lg p-8"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Edit Question
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className={inputClass}
            required
          />

          {options.map((opt, i) => (
            <input
              key={i}
              value={opt}
              onChange={(e) => handleOptionChange(i, e.target.value)}
              className={inputClass}
              required
            />
          ))}

          <select
            value={correctOption}
            onChange={(e) => setCorrectOption(Number(e.target.value))}
            className={inputClass}
          >
            <option value={0}>Correct Option: 1</option>
            <option value={1}>Correct Option: 2</option>
            <option value={2}>Correct Option: 3</option>
            <option value={3}>Correct Option: 4</option>
          </select>

          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className={inputClass}
            required
          />

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className={inputClass}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <button className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
            Save Changes
          </button>
        </form>
      </motion.div>
    </motion.main>
  );
}
