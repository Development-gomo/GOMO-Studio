import { Suspense } from "react";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata = {
  title: "Sign in — GOMO Studio",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0f0f0f] px-6">
      <div className="flex w-full max-w-sm flex-col items-center">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#c9ff33] text-lg font-bold text-[#0f0f0f]">
            G
          </div>
          <div className="text-center">
            <p className="text-base font-semibold text-white">GOMO Studio</p>
            <p className="text-sm text-white/50">Sign in to manage your site</p>
          </div>
        </div>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
