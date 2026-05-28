"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronRight, Layers, Network } from "lucide-react";
import { PartLabel } from "@/components/memo-ui";
import { InvestmentMemoBody } from "@/components/investment-memo-v21-body";

const NAV: { id: string; label: string }[] = [
  { id: "one-page-pitch", label: "One-page pitch" },
  { id: "executive-summary", label: "Executive summary" },
  { id: "core-thesis", label: "Core thesis" },
  { id: "segments", label: "Segments & ARR" },
  { id: "product", label: "Product architecture" },
  { id: "pricing", label: "Pricing model" },
  { id: "path-to-scale", label: "Path to scale" },
  { id: "capital-plan", label: "Capital plan" },
  { id: "gtm", label: "Go-to-market" },
  { id: "retention", label: "Retention & economics" },
  { id: "data-flywheel", label: "Data flywheel" },
  { id: "team", label: "Team" },
  { id: "competition", label: "Competition" },
  { id: "execution", label: "180-day execution" },
  { id: "risks", label: "Risks" },
  { id: "deferred-scope", label: "Deferred scope" },
  { id: "exit-landscape", label: "Exit landscape" },
  { id: "closing", label: "Closing" },
];

function cn(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export default function TetherInvestmentMemo() {
  const [active, setActive] = useState("one-page-pitch");

  const ids = useMemo(() => NAV.map((n) => n.id), []);

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActive(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-12% 0px -55% 0px",
        threshold: [0, 0.08, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);

  const scrollTo = useCallback((id: string) => {
    setActive(id);
    const el = document.getElementById(id);
    if (!el) return;
    const top =
      window.scrollY + el.getBoundingClientRect().top - 112;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-memo-bg font-sans text-memo-text selection:bg-memo-teal-light selection:text-memo-navy">
      <div className="sticky top-0 z-30 border-b border-memo-border bg-memo-warm px-4 py-3 md:px-5 lg:hidden">
        <label className="sr-only" htmlFor="memo-nav">
          Jump to section
        </label>
        <div className="mx-auto flex max-w-[720px] items-center gap-2">
          <Layers
            className="h-4 w-4 shrink-0 text-memo-text-tertiary"
            aria-hidden
          />
          <select
            id="memo-nav"
            value={active}
            onChange={(e) => {
              const id = e.target.value;
              setActive(id);
              scrollTo(id);
            }}
            className="w-full rounded-lg border border-memo-border bg-memo-bg px-3 py-2 font-sans text-sm text-memo-text outline-none focus:border-memo-teal focus:ring-2 focus:ring-memo-teal/20"
          >
            {NAV.map((n) => (
              <option key={n.id} value={n.id}>
                {n.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex min-h-screen">
        <aside className="relative z-10 hidden w-[240px] shrink-0 border-r border-memo-border bg-memo-warm lg:block">
          <nav
            className="sticky top-0 max-h-screen overflow-y-auto px-5 py-10"
            aria-label="Table of contents"
          >
            <p className="mb-4 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-memo-text-secondary">
              Contents
            </p>
            <ul className="space-y-0.5">
              {NAV.map((item) => {
                const isActive = item.id === active;
                return (
                  <li
                    key={item.id}
                    className={cn(
                      "border-l-2",
                      isActive ? "border-[#0D7377]" : "border-transparent"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => scrollTo(item.id)}
                      className={cn(
                        "group flex w-full items-start gap-2 py-1.5 pl-3 text-left text-sm",
                        isActive
                          ? "font-medium text-[#0D7377]"
                          : "text-memo-text-secondary hover:text-memo-text"
                      )}
                    >
                      <ChevronRight
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          isActive
                            ? "text-[#0D7377] opacity-100"
                            : "opacity-0 text-memo-text-tertiary group-hover:opacity-70"
                        )}
                        aria-hidden
                      />
                      <span className="leading-snug">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div
              className="mt-10 rounded-lg border border-memo-border bg-memo-bg p-4"
              style={{ boxShadow: "var(--memo-shadow)" }}
            >
              <p className="text-sm text-memo-text-secondary">Document</p>
              <p className="mt-2 text-sm text-memo-text">
                Product roadmap &amp; capital plan, May 2026 (v4.6)
              </p>
            </div>
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <article className="min-w-0">
            <div className="mx-auto max-w-[720px] px-5 pt-12 md:px-8 md:pt-16 lg:pt-20">
              <header className="mb-20 md:mb-24">
                <div className="flex flex-wrap items-center gap-2 text-memo-text-secondary">
                  <Network className="h-4 w-4 text-memo-teal" aria-hidden />
                  <PartLabel>Tether Health</PartLabel>
                </div>
                <h1 className="mt-5 font-serif text-balance text-[2.5rem] font-normal leading-[1.1] tracking-tight text-memo-navy md:text-[3.25rem]">
                  Product roadmap{" "}
                  <span className="font-serif text-[#0D7377]">&amp;</span> capital
                  plan
                </h1>
                <p className="mt-7 max-w-[720px] font-sans text-lg leading-[1.65] text-memo-text">
                  Referrals are the wedge. PCP workflow automation is the platform.
                  Network density is the long-game moat.
                </p>
                <div className="mt-10 flex flex-col gap-2 border-t border-memo-border-light pt-8 font-sans text-xs text-memo-text-tertiary">
                  <p>May 2026 (v4.6)</p>
                  <p>
                    Ravi Suresh, Co-Founder and CTO · Sid Thakker, Co-Founder and
                    CEO · Sach Thakker, Co-Founder and CMO
                  </p>
                </div>
              </header>

              <InvestmentMemoBody />

              <footer className="mt-24 border-t border-memo-border-light pt-10 text-sm text-memo-text-secondary">
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-memo-text-tertiary">
                  Tether Health · Confidential
                </p>
                <p className="mt-3 text-memo-text-secondary">
                  Product roadmap &amp; capital plan · May 2026 (v4.6)
                </p>
              </footer>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}
