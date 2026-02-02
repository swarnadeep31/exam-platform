"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Attempt {
  _id: string;
  score: number;
  total: number;
  createdAt: string;
}

export default function AdminAttemptsPage() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchAttempts() {
    try {
      const res = await fetch("http://localhost:5000/api/attempts");
      const data = await res.json();
      setAttempts(data);
    } catch {
      console.error("Failed to fetch attempts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAttempts();
  }, []);

  return (
    <motion.main
      className="min-h-screen bg-slate-50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-slate-900">
          Admin – Test Attempts
        </h1>

        {loading && <p className="text-slate-600">Loading attempts...</p>}

        {!loading && attempts.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 text-center text-slate-600">
            No attempts recorded yet.
          </div>
        )}

        <div className="space-y-4">
          {attempts.map((a) => {
            const percent = Math.round((a.score / a.total) * 100);

            return (
              <motion.div
                key={a._id}
                className="bg-white border border-slate-200 rounded-xl p-4 flex justify-between items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div>
                  <p className="font-medium text-slate-800">
                    Score: {a.score} / {a.total}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    {percent}% •{" "}
                    {new Date(a.createdAt).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      percent >= 70
                        ? "bg-green-100 text-green-700"
                        : percent >= 40
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}
                >
                  {percent}%
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.main>
  );
}
