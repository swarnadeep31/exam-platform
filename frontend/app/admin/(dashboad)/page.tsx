"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { API_BASE_URL } from "@/lib/config";

interface Stats {
  totalAttempts: number;
  averageScore: number;
  highestScore: number;
  bestTopic: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function loadStats() {
      const res = await fetch(
        `${API_BASE_URL}/api/dashboard/stats`
      );
      const data = await res.json();
      setStats(data);
    }

    loadStats();
  }, []);

  if (!stats) {
    return (
      <p className="text-center text-slate-500">
        Loading dashboard...
      </p>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <StatCard
        title="Total Attempts"
        value={stats.totalAttempts}
      />
      <StatCard
        title="Average Score"
        value={stats.averageScore}
      />
      <StatCard
        title="Highest Score"
        value={stats.highestScore}
      />
      <StatCard
        title="Best Subject"
        value={stats.bestTopic}
      />
    </motion.div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <motion.div
      className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
      whileHover={{ y: -5 }}
    >
      <p className="text-sm text-slate-500">
        {title}
      </p>
      <p className="text-3xl font-bold text-slate-900 mt-2">
        {value}
      </p>
    </motion.div>
  );
}
