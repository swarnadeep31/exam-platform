"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/lib/requireAdmin";
import AdminLogoutButton from "@/components/AdminLogoutButton";

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
      {/* Admin Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-bold text-slate-900">
          Admin Dashboard
        </h1>

        <AdminLogoutButton />
      </header>

      {/* Page Content */}
      <main className="p-6">{children}</main>
    </div>
  );
}
