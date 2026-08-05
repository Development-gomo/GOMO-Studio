import { listRegistryWithStatus } from "@/lib/admin/registry-content";
import { DashboardClient } from "@/components/admin/DashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const items = await listRegistryWithStatus();
  return <DashboardClient items={items} />;
}
