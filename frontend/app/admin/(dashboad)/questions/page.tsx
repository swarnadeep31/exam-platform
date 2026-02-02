"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/lib/requireAdmin";

interface Question {
  _id: string;
  question: string;
  topic: string;
  difficulty: string;
}

export default function AdminQuestionsPage() {
  const router = useRouter();


  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchQuestions() {
    try {
      const res = await fetch("http://localhost:5000/api/questions");
      const data = await res.json();
      setQuestions(data);
    } catch (err) {
      console.error("Failed to fetch questions");
    } finally {
      setLoading(false);
    }
  }

  async function deleteQuestion(id: string) {
    const confirmed = confirm("Are you sure you want to delete this question?");
    if (!confirmed) return;

    await fetch(`http://localhost:5000/api/questions/${id}`, {
      method: "DELETE",
    });

    setQuestions((prev) => prev.filter((q) => q._id !== id));
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <motion.main
      className="min-h-screen bg-slate-50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-slate-900">
          Admin – All Questions
        </h1>

        {/* Loading */}
        {loading && <p className="text-slate-600">Loading questions...</p>}

        {/* Empty state */}
        {!loading && questions.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 text-center text-slate-600">
            No questions found. Add some from the admin panel.
          </div>
        )}

        {/* Questions list */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08 },
            },
          }}>
          {questions.map((q) => (
            <motion.div
              key={q._id}
              className="bg-white border border-slate-200 rounded-xl p-4 flex justify-between items-start gap-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}>
              {/* Question info */}
              <div className="flex-1">
                <p className="font-medium text-slate-800">{q.question}</p>
                <p className="text-sm text-slate-500 mt-1">
                  {q.topic} • {q.difficulty}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/questions/${q._id}`}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Edit
                </Link>

                <button
                  onClick={() => deleteQuestion(q._id)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium">
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.main>
  );
}
