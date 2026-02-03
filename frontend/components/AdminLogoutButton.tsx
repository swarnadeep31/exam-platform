"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLogoutButton() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  }

  return (
    <motion.button
      onClick={handleLogout}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition"
    >
      Logout
    </motion.button>
  );
}
