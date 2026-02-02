"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsLoggedIn(!!token);
  }, []);

  // ⏳ While checking login state
  if (isLoggedIn === null) {
    return <LandingSkeleton />;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl text-center space-y-6"
      >
        <h1 className="text-4xl font-bold text-slate-900">
          Welcome to <span className="text-blue-600">ExamPlatform</span>
        </h1>

        <p className="text-slate-600 text-lg">
          AI-Integrated online examination and assessment system.
        </p>

        {/* 🔀 CONDITIONAL ACTIONS */}
        {!isLoggedIn ? (
          <div className="flex gap-4 justify-center">
            <PrimaryButton href="/admin/login">
              Login
            </PrimaryButton>
            <SecondaryButton href="/admin/login">
              Get Started
            </SecondaryButton>
          </div>
        ) : (
          <div className="flex gap-4 justify-center">
            <PrimaryButton href="/admin">
              Go to Dashboard
            </PrimaryButton>
            <SecondaryButton href="/admin/questions">
              Manage Questions
            </SecondaryButton>
          </div>
        )}
      </motion.div>
    </main>
  );
}

function PrimaryButton({ href, children }: any) {
  return (
    <Link
      href={href}
      className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition shadow"
    >
      {children}
    </Link>
  );
}

function SecondaryButton({ href, children }: any) {
  return (
    <Link
      href={href}
      className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-100 transition"
    >
      {children}
    </Link>
  );
}

function LandingSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-64 bg-slate-200 rounded" />
        <div className="h-4 w-80 bg-slate-200 rounded" />
        <div className="flex gap-4 justify-center mt-6">
          <div className="h-10 w-32 bg-slate-200 rounded-xl" />
          <div className="h-10 w-32 bg-slate-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

