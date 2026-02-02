"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  function logout() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    router.push("/admin/login");
  }

  const linkClass = (path: string) =>
    `relative px-3 py-2 text-sm font-medium transition
     ${
       pathname === path
         ? "text-blue-600"
         : "text-slate-600 hover:text-slate-900"
     }`;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/admin"
          className="text-lg font-bold text-slate-900 tracking-tight"
        >
          Exam<span className="text-blue-600">Platform</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link href="/admin" className={linkClass("/admin")}>
            Dashboard
          </Link>

          <Link
            href="/admin/questions"
            className={linkClass("/admin/questions")}
          >
            Questions
          </Link>

          <Link
            href="/admin/attempts"
            className={linkClass("/admin/attempts")}
          >
            Attempts
          </Link>

          {/* Logout */}
          <motion.button
            onClick={logout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              ml-2 px-4 py-2 rounded-lg text-sm font-medium
              text-slate-700 border border-slate-300
              hover:bg-slate-100 hover:text-slate-900
              transition shadow-sm
            "
          >
            Logout
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
