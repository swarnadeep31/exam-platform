"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  function logout() {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-white">
      <h1 className="font-bold text-lg">Exam Platform</h1>

      <div className="flex gap-6 items-center">
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/questions">Questions</Link>
        <Link href="/admin/attempts">Attempts</Link>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
