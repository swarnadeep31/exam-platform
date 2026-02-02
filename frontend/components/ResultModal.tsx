"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function ResultModal({
  score,
  total,
  onClose,
}: {
  score: number;
  total: number;
  onClose: () => void;
}) {
  const percentage = Math.round((score / total) * 100);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Modal Card */}
        <motion.div
          className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-xl p-8"
          initial={{ scale: 0.8, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 40 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          {/* Header */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <motion.div
              className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-2xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: 0.2,
              }}
            >
              🎉
            </motion.div>

            <h2 className="text-2xl font-bold mt-4 text-slate-900">
              Test Completed
            </h2>

            <p className="text-slate-500 mt-1 text-sm">
              Here’s how you performed
            </p>
          </motion.div>

          {/* Score */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <p className="text-sm text-slate-500">Your Score</p>

            <motion.p
              className="text-4xl font-bold text-blue-600 mt-2"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 12,
                delay: 0.45,
              }}
            >
              {score} <span className="text-slate-400">/ {total}</span>
            </motion.p>

            <p className="mt-2 text-sm text-slate-600">
              {percentage}% correct answers
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="my-6 h-px bg-slate-200"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.55 }}
            style={{ transformOrigin: "left" }}
          />

          {/* Action */}
          <motion.button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Close
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
