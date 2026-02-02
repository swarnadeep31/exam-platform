"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/lib/requireAdmin";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // 🔐 Global admin protection
  useEffect(() => {
    if (!isAdmin()) {
      router.push("/admin/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Global Navbar */}
      <Navbar />

      {/* Page Content */}
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="max-w-7xl mx-auto p-6"
      >
        {children}
      </motion.main>
    </div>
  );
}
