import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/admin/session";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminShellLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const valid = await verifySessionToken(token);
  if (!valid) {
    redirect("/admin/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
