import { SITE_ORIGIN } from "@/lib/seo-config";

export const dynamic = "force-dynamic";

function StatusRow({ label, configured, hint }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 py-4 last:border-0">
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-xs text-white/40">{hint}</p>
      </div>
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
          configured ? "bg-emerald-500/10 text-emerald-400" : "bg-white/[0.06] text-white/40"
        }`}
      >
        {configured ? "Configured" : "Not configured"}
      </span>
    </div>
  );
}

export default function AdminSettingsPage() {
  const aiConfigured = Boolean(process.env.ANTHROPIC_API_KEY?.trim());
  const emailConfigured = Boolean(process.env.RESEND_API_KEY?.trim());

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-8">
      <h1 className="mb-1 text-2xl font-semibold text-white">Settings</h1>
      <p className="mb-8 text-sm text-white/50">Read-only status of environment-configured features.</p>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-5">
        <StatusRow
          label="Site URL"
          configured
          hint={SITE_ORIGIN}
        />
        <StatusRow
          label="AI Content Generation"
          configured={aiConfigured}
          hint={aiConfigured ? "Anthropic Claude — ANTHROPIC_API_KEY is set" : "Set ANTHROPIC_API_KEY to enable the AI panel"}
        />
        <StatusRow
          label="Email delivery"
          configured={emailConfigured}
          hint={emailConfigured ? "Resend — RESEND_API_KEY is set" : "Set RESEND_API_KEY to enable contact/careers emails"}
        />
      </div>

      <p className="mt-6 text-xs text-white/30">
        These values are read from environment variables at server start and cannot be edited here — update
        your <code className="rounded bg-white/[0.06] px-1 py-0.5">.env.local</code> (or hosting provider's
        environment settings) and restart the server.
      </p>
    </div>
  );
}
