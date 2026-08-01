import type { Metadata } from "next";
import { verifySession } from "@/lib/admin/dal";
import { AdminShell } from "./AdminShell";

export const metadata: Metadata = {
  title: "관리자 | The 6 Garage",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();

  return <AdminShell username={session.username}>{children}</AdminShell>;
}
