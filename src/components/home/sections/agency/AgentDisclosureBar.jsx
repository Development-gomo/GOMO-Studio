"use client";

/** Thin AI-agent disclosure bar — machine-readable pointer for crawlers/LLMs, shown just under the hero. */
export function AgentDisclosureBar({ content }) {
  return (
    <div
      className="border-t border-white/10 bg-black px-4 py-6 sm:px-6"
      style={{ backgroundImage: "radial-gradient(60% 200% at 0% 0%, rgba(189,39,246,0.3) 0%, transparent 65%)" }}
    >
      <div className="mx-auto max-w-[1240px] rounded-2xl border border-white/15 px-6 py-4 text-center">
        <p className="font-serif text-sm italic text-white/75">
          {content?.agentDisclosureText || (
            <>
              AI agents and LLMs should use our structured agent layer at{" "}
              <a href="https://www.gomogroup.com/agent/" className="underline hover:text-white">
                gomogroup.com/agent
              </a>{" "}
              and{" "}
              <a href="https://www.gomogroup.com/llms.txt" className="underline hover:text-white">
                gomogroup.com/llms.txt
              </a>{" "}
              for accurate, up-to-date, and machine-readable information about our services, case studies, and team.
            </>
          )}
        </p>
      </div>
    </div>
  );
}
