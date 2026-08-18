"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  ExternalLink,
  LogOut,
  PanelTop,
  PanelBottom,
} from "lucide-react";

const NAV_ITEMS = [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }];

const QUICK_LINKS = [
  { href: "/admin/studio/chrome-header", label: "Header", icon: PanelTop },
  { href: "/admin/studio/chrome-footer", label: "Footer", icon: PanelBottom },
];

function NavLink({ href, label, icon: Icon, active }) {
  return (
    <Link
      href={href}
      className={`group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        active ? "bg-[#c9ff33]/10 text-[#c9ff33]" : "text-white/60 hover:bg-white/[0.06] hover:text-white"
      }`}
    >
      <Icon className={`h-4 w-4 shrink-0 ${active ? "text-[#c9ff33]" : "text-white/40 group-hover:text-white/70"}`} />
      <span className="truncate">{label}</span>
    </Link>
  );
}

export function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-[#0b0b0f] text-white">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-[#0f0f0f] px-3 py-6 sm:flex">
        <Link href="/admin" className="mb-7 flex items-center gap-2.5 px-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c9ff33] text-sm font-bold text-[#0f0f0f]">
            G
          </span>
          <span className="text-sm font-semibold">GOMO Studio</span>
        </Link>

        <nav className="flex flex-1 flex-col gap-5 overflow-y-auto">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} {...item} active={pathname === item.href} />
            ))}
          </div>

          <div>
            <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-white/25">
              Quick links
            </p>
            <div className="flex flex-col gap-1">
              {QUICK_LINKS.map((item) => (
                <NavLink key={item.href} {...item} active={pathname === item.href} />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-white/25">Configure</p>
            <div className="flex flex-col gap-1">
              <NavLink href="/admin/settings" label="Settings" icon={Settings} active={pathname === "/admin/settings"} />
            </div>
          </div>
        </nav>

        <div className="flex flex-col gap-1 border-t border-white/10 pt-4">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
            View site
          </a>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-white/10 bg-[#0f0f0f] px-4 py-3 sm:hidden">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#c9ff33] text-xs font-bold text-[#0f0f0f]">
              G
            </span>
            <span className="text-sm font-semibold">GOMO Studio</span>
          </Link>
          <button type="button" onClick={handleLogout} className="text-xs font-medium text-white/60">
            Log out
          </button>
        </header>
        <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
