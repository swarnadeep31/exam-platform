"use client";

import { useState } from "react";
import { Question } from "@/types/question";
import ResultModal from "./ResultModal";
import { motion } from "framer-motion";

export default function QuizClient({ questions }: { questions: Question[] }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  async function handleSubmit() {
    let totalScore = 0;

    questions.forEach((q) => {
      if (answers[q._id] === q.correctOption) {
        totalScore += q.marks;
      }
    });

    setScore(totalScore);
    setSubmitted(true);
    setShowResult(true);

    // Save attempt
    await fetch("http://localhost:5000/api/attempts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        score: totalScore,
        total: totalMarks,
        answers,
      }),
    });
  }

  const totalMarks = questions.reduce((acc, q) => acc + q.marks, 0);

  return (
    <motion.main
      className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 py-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.h1
          className="text-3xl font-bold mb-8 text-center text-slate-900"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}>
          Practice Test
        </motion.h1>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((q, qIndex) => (
            <motion.div
              key={q._id}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: qIndex * 0.1,
                type: "spring",
                stiffness: 120,
              }}>
              <h2 className="font-semibold mb-4 text-lg text-slate-800">
                {qIndex + 1}. {q.question}
              </h2>

              <ul className="space-y-3">
                {q.options.map((option, i) => {
                  const isSelected = answers[q._id] === i;

                  return (
                    <motion.li
                      key={i}
                      whileHover={!submitted ? { scale: 1.02 } : {}}
                      whileTap={!submitted ? { scale: 0.98 } : {}}
                      onClick={() =>
                        !submitted &&
                        setAnswers((prev) => ({
                          ...prev,
                          [q._id]: i,
                        }))
                      }
                      className={`border rounded-xl p-3 cursor-pointer transition-all
                        ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600 shadow-md"
                            : "border-slate-300 text-slate-700 hover:bg-slate-50"
                        }
                        ${submitted ? "cursor-not-allowed opacity-80" : ""}
                      `}>
                      {option}
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Submit Button */}
        {!submitted && (
          <motion.div
            className="sticky bottom-0 bg-linear-to-t from-slate-50 to-transparent pt-6 pb-4 mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}>
            <motion.button
              onClick={handleSubmit}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 bg-blue-600 text-white rounded-xl text-lg font-medium shadow-lg hover:bg-blue-700 transition">
              Submit Test
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Result Modal */}
      {showResult && (
        <ResultModal
          score={score}
          total={totalMarks}
          onClose={() => setShowResult(false)}
        />
      )}
    </motion.main>
  );
}
