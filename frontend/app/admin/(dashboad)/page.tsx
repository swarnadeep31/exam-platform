"use client";

import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

type Attempt = {
  score: number;
  total: number;
  subject: string;
};

export default function DashboardPage() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("adminUser"); // email / googleId later
    if (!userId) return;

    fetchWithAuth(`/api/attempts?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setAttempts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <DashboardSkeleton/>
  }

  const totalAttempts = attempts.length;
  const highestScore =
    attempts.length > 0
      ? Math.max(...attempts.map((a) => a.score))
      : 0;

  const subjectScores = attempts.reduce<Record<string, number>>(
    (acc, curr) => {
      acc[curr.subject] = Math.max(acc[curr.subject] || 0, curr.score);
      return acc;
    },
    {}
  );

  const bestSubject =
    Object.entries(subjectScores).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Stat title="Exams Taken" value={totalAttempts} />
        <Stat title="Highest Score" value={highestScore} />
        <Stat title="Best Subject" value={bestSubject} />
      </div>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: any }) {
  return (
    <div className="bg-white border rounded-xl p-5 shadow">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      <div className="h-6 w-40 bg-slate-200 rounded" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white border rounded-xl p-5 shadow space-y-3"
          >
            <div className="h-4 w-24 bg-slate-200 rounded" />
            <div className="h-8 w-16 bg-slate-300 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

