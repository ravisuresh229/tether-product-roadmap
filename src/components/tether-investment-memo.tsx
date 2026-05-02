"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ArrowRight, ChevronRight, Layers, Network } from "lucide-react";

const NAV: { id: string; label: string }[] = [
  { id: "executive-summary", label: "Executive summary" },
  { id: "mvp-definition", label: "MVP definition" },
  { id: "architecture", label: "Three-layer architecture" },
  { id: "capital-ask", label: "Capital ask" },
  { id: "core-thesis", label: "Core thesis" },
  { id: "segments", label: "Segment analysis" },
  { id: "write-back", label: "Write-back requirement" },
  { id: "product", label: "Product architecture" },
  { id: "pricing", label: "Pricing model" },
  { id: "path-to-scale", label: "Path to scale" },
  { id: "retention-strategy", label: "Retention strategy" },
  { id: "ehr", label: "EHR integration" },
  { id: "capital-plan", label: "Capital plan" },
  { id: "team", label: "Who ships it" },
  { id: "competition", label: "Competitive landscape" },
  { id: "execution", label: "Next 180 days" },
  { id: "discovery-work", label: "Discovery & research" },
  { id: "deferred-scope", label: "Deferred scope" },
  { id: "risks", label: "Risks & open questions" },
];

function cn(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

function PartLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0D7377]">
      {children}
    </span>
  );
}

function ProseField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <p className="m-0">
        <PartLabel>{label}</PartLabel>
      </p>
      <div className="text-base font-sans leading-[1.7] text-memo-text">
        {children}
      </div>
    </div>
  );
}

function ExitCallout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-r-lg border-l-[3px] bg-[#F5F3EE] text-base leading-[1.7] text-memo-text",
        className
      )}
      style={{
        borderLeftColor: "#E0DDD5",
        padding: "20px 24px",
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({
  id,
  kicker,
  title,
}: {
  id: string;
  kicker?: string;
  title: string;
}) {
  return (
    <header id={id} className="scroll-mt-28 mb-8 md:mb-10">
      {kicker ? (
        <>
          <p className="mb-3">
            <PartLabel>{kicker}</PartLabel>
          </p>
          <div className="mb-8 h-px w-full bg-memo-border" />
        </>
      ) : null}
      <h2 className="font-serif text-balance text-[32px] font-normal leading-tight text-memo-navy md:text-[36px]">
        {title}
      </h2>
    </header>
  );
}

function CalloutPanel({
  children,
  variant = "teal",
  className,
}: {
  children: React.ReactNode;
  variant?: "teal" | "warm" | "coral-edge";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-r-lg border-l-[3px] px-7 py-6",
        variant === "teal" && "border-memo-teal bg-memo-teal-light",
        variant === "warm" && "border-memo-teal bg-memo-warm",
        variant === "coral-edge" && "border-memo-coral bg-memo-warm",
        className
      )}
    >
      {children}
    </div>
  );
}

function PullQuote({
  children,
  accent = "teal",
  thesisTint = false,
}: {
  children: React.ReactNode;
  accent?: "teal" | "coral";
  thesisTint?: boolean;
}) {
  if (thesisTint) {
    return (
      <div className="my-14 md:my-20">
        <div className="rounded-r-lg border-l-[3px] border-[#0D7377] bg-[#F0F7F7] px-7 py-6">
          <p className="font-serif text-balance text-2xl font-normal leading-[1.35] tracking-tight text-memo-text md:text-[28px] md:leading-[1.3]">
            {children}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="my-14 md:my-20">
      <CalloutPanel variant={accent === "coral" ? "coral-edge" : "teal"}>
        <p className="font-serif text-balance text-2xl font-normal leading-[1.35] tracking-tight text-memo-text md:text-[28px] md:leading-[1.3]">
          {children}
        </p>
      </CalloutPanel>
    </div>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[720px] space-y-6 text-base font-sans leading-[1.7] text-memo-text">
      {children}
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div
      className="rounded-lg border border-memo-border bg-memo-bg px-5 py-6"
      style={{ boxShadow: "var(--memo-shadow)" }}
    >
      <p className="text-sm text-memo-text-secondary">{label}</p>
      <p className="mt-2 font-sans text-[28px] font-semibold leading-tight text-memo-navy md:text-[30px]">
        {value}
      </p>
      {hint ? (
        <p className="mt-2 text-sm leading-snug text-memo-text-secondary">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function Subhead({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-12 font-sans text-[20px] font-semibold leading-snug tracking-tight text-memo-text md:text-[22px]">
      {children}
    </h3>
  );
}

function matrixCellTone(cell: string): string {
  const v = cell.trim();
  if (v === "Yes") return "bg-memo-teal-light text-memo-text";
  if (v === "No") return "bg-memo-warm text-memo-text-secondary";
  if (v === "Partial") return "bg-memo-border-light text-memo-text";
  if (v === "Attempting") return "bg-memo-bg text-memo-text";
  return "";
}


export default function TetherInvestmentMemo() {
  const [active, setActive] = useState(NAV[0]?.id ?? "");

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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-memo-bg font-sans text-memo-text selection:bg-memo-teal-light selection:text-memo-navy">
      {/* Mobile TOC */}
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
        {/* Desktop TOC */}
        <aside className="relative hidden w-[240px] shrink-0 border-r border-memo-border bg-memo-warm lg:block">
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
                Product roadmap &amp; capital plan, April 2026
              </p>
            </div>
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <article className="min-w-0">
            <div className="mx-auto max-w-[720px] px-5 pt-12 md:px-8 md:pt-16 lg:pt-20">
            {/* Hero */}
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
                Referrals are the wedge. Network intelligence is the moat.
                Headless EHR coordination is the platform.
              </p>
              <div className="mt-10 flex flex-col gap-2 border-t border-memo-border-light pt-8 font-sans text-xs text-memo-text-tertiary">
                <p>April 2026</p>
                <p>
                  Ravi Suresh, Co-Founder &amp; CTO · Sid Thakker, Co-Founder
                  &amp; CEO · Sach Thakker, Co-Founder &amp; CMO
                </p>
              </div>
            </header>

            <PullQuote thesisTint>
              Healthcare&apos;s referral problem is not a document problem, a
              workflow problem, or an EHR problem. It is a graph problem, and the
              only way to build the graph is a platform that captures structured
              data from both sides of every referral, at the moment the referral
              is created, with a stable patient identity across providers.
            </PullQuote>

            {/* Executive Summary */}
            <section className="mt-[80px] space-y-8 md:mt-[100px]">
              <SectionTitle
                id="executive-summary"
                kicker="PART 0"
                title="Executive summary"
              />
              <Prose>
                <p className="mt-2 font-semibold text-memo-navy">
                  Traction milestones
                </p>
                <ul className="m-0 list-disc space-y-2 pl-5 text-memo-text">
                  <li>
                    Athena Marketplace partnership signed (April 2026;
                    discovery path into{" "}
                    <span className="whitespace-nowrap">162,000+</span>{" "}
                    athenaOne providers).
                  </li>
                  <li>
                    Live pilot with concierge MDVIP physician (Dr.
                    Lefevre,&nbsp;DC).
                  </li>
                  <li>
                    Loudoun Medical Group (~100 clinics) eCW rollout in active
                    IT&nbsp;security review.
                  </li>
                  <li>
                    Forefront Dermatology (~170&nbsp;locations on ModMed):
                    physician advisor testing product alongside platform build.
                  </li>
                  <li>
                    ModMed adapter built;&nbsp;synapSYS partnership meeting in
                    motion.
                  </li>
                  <li>
                    Organic ChatGPT-driven inbound signup from a Kentucky
                    practice evaluating deployment.
                  </li>
                  <li>
                    Live specialist directory spanning{" "}
                    <span className="whitespace-nowrap">1,200+</span> DMV
                    providers across 13 specialties.
                  </li>
                </ul>
                <p>
                  Tether is the data and coordination layer between primary care
                  and specialty care. When a PCP writes a referral, we capture
                  it as structured data at the moment of creation, route it
                  through our agents across EHRs to the right specialist,
                  coordinate the workflow in between, and return the consult
                  note to the PCP&apos;s chart when the visit completes. Every
                  referral feeds a graph nobody else can build, because nobody
                  else sees both sides of the transaction.
                </p>
                <p>
                  The data is the moat. Our agents observe every referral in real
                  time as it moves through the network: which PCP referred, to
                  which specialist, for what reason, under what insurance, how
                  long each step took, what completed, what stalled. This is
                  memory the agents keep and reason against on every subsequent
                  referral. The graph compounds with every transaction and
                  extends beyond referrals over time, into prior authorization,
                  scheduling, patient outreach, and care gap closure. Tennr and
                  Valerie currently emphasize different parts of the referral
                  workflow; Tether is differentiated by capturing both the
                  referring and receiving sides when adoption spans both
                  endpoints.
                </p>
                <p>
                  The wedge is three customer segments: concierge-affiliated
                  independent PCPs (starting with MDVIP and SignatureMD
                  practices), independent multi-specialty groups (starting with
                  Loudoun Medical Group), and PE-backed specialty practices
                  (starting with Forefront Dermatology). All three buy at the
                  network or group level so one contract covers dozens of
                  providers. All three have real pain and budget today. On the
                  specialist side, independent specialists pay usage-based tier
                  pricing when they receive structured referrals from our PCP
                  networks. The value of the product compounds with every
                  referral that moves through it, and we need a lot of them in
                  the same place before the network matters at all. That density
                  is the moat.
                </p>
              </Prose>

              <div id="mvp-definition" className="scroll-mt-28">
                <CalloutPanel variant="teal">
                  <p className="m-0 text-base font-sans leading-[1.7] text-memo-text">
                    <span className="font-semibold text-memo-navy">
                      MVP definition.&nbsp;
                    </span>
                    The MVP is the closed-loop referral. The PCP creates a
                    referral order in Tether, structured data assembles from the
                    EHR automatically, routing lands on the correct specialist,
                    the specialist receives structured intake context, patients
                    are contacted by Tether&apos;s agent for scheduling, the visit
                    completes, the consult note is parsed and written back to the
                    PCP chart, and the loop closes without manual intervention.
                    Steps&nbsp;1-4 stay live today. The&nbsp;F&amp;F
                    six&nbsp;months ships steps&nbsp;5-7. MVP is declared when
                    this loop executes reliably across three or more paying
                    practices in production. Multi-EHR breadth, Layer&nbsp;2
                    intelligence, and ranking are expansions riding on top of this
                    core loop, never blockers.&nbsp;
                    <span className="italic text-memo-text-secondary">
                      We believe that framing concentrates scope because Loudoun,
                      concierge expansion, and Forefront diligence all bottleneck
                      on proving consult note write-back versus inventing ancillary
                      product surface area.
                    </span>
                  </p>
                </CalloutPanel>
              </div>
            </section>
            </div>

            <section className="mt-[80px] space-y-0 md:mt-[100px]">
              <div className="mx-auto max-w-[720px] px-5 md:px-8">
                <SectionTitle
                  id="architecture"
                  kicker="PLATFORM"
                  title="The three-layer architecture"
                />
                <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5">
                  {(
                    [
                      {
                        layer: "Layer 1",
                        accent: "#0D7377",
                        title: "Referral coordination network",
                        timeline: "Live now through end of 2026",
                        value:
                          "Two-sided referrals with EHR integration on both ends: structured handoff out and consult notes written back in, without the manual loop.",
                      },
                      {
                        layer: "Layer 2",
                        accent: "#D4613E",
                        title: "Network intelligence",
                        timeline: "Q4 2026 through 2027",
                        value:
                          "Predictive routing, completion and leakage signals, specialist quality, and portfolio analytics powered by cross-practice referral data only you hold.",
                      },
                      {
                        layer: "Layer 3",
                        accent: "#94a3b8",
                        title: "Headless EHR coordination",
                        timeline: "2027 onward",
                        value:
                          "Agents detect events in the chart, run coordination across the network, and write outcomes back so the work finishes without opening Tether.",
                      },
                    ] as const
                  ).map(({ layer, accent, title, timeline, value }) => (
                    <div
                      key={layer}
                      className="rounded-lg border border-memo-border border-t-[3px] bg-memo-warm p-5"
                      style={{
                        borderTopColor: accent,
                        boxShadow: "var(--memo-shadow)",
                      }}
                    >
                      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.08em] uppercase" style={{ color: accent }}>
                        {layer}
                      </p>
                      <p className="mt-4 font-sans text-base font-semibold leading-snug text-memo-text">
                        {title}
                      </p>
                      <p className="mt-4">
                        <PartLabel>Timeline</PartLabel>
                      </p>
                      <p className="mt-1.5 text-sm leading-snug text-memo-text">
                        {timeline}
                      </p>
                      <p className="mt-4">
                        <PartLabel>Value</PartLabel>
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-memo-text">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="mx-auto max-w-[720px] px-5 pb-12 md:px-8 md:pb-16 lg:pb-20">
            {/* Capital ask */}
            <section className="mt-[80px] space-y-8 md:mt-[100px]">
              <SectionTitle
                id="capital-ask"
                kicker="RAISE"
                title="The capital ask"
              />
              <CalloutPanel variant="warm">
                <Prose>
                  <p>
                    Total 18-month requirement:{" "}
                    <span className="font-semibold text-memo-coral">$985K</span>{" "}
                    over two tranches ($135K Friends &amp; Family followed by $850K
                    pre-seed). This capital ships production write-back on Athena,
                    builds direct adapters for ModMed and eCW, lands the first
                    enterprise contracts in each of three customer segments, and
                    reaches the seed-readiness bar of 15-20 paying practices with
                    Layer 2 network data in customer use. Warm pipelines with
                    Loudoun Medical Group, Forefront Dermatology, and MDVIP are
                    time-sensitive; this capital converts them before they go cold.
                  </p>
                </Prose>
              </CalloutPanel>
              <div className="grid gap-3 sm:grid-cols-3">
                <StatCard
                  label="Friends & Family"
                  value="$135K"
                  hint="Month 1 close · $5M post-money cap (~2.7% dilution)"
                />
                <StatCard
                  label="Pre-seed"
                  value="$850K"
                  hint="Month 6-9 close · $10M post-money cap (~8.5% dilution)"
                />
                <StatCard
                  label="18-month milestone"
                  value="15-20 practices"
                  hint="~$800K-$1M ARR run-rate · 3 EHRs live · enterprise in each segment"
                />
              </div>
              <div className="rounded-lg border border-memo-border bg-memo-warm px-5 py-4 font-sans text-sm text-memo-text-secondary">
                <span className="font-semibold text-memo-text">
                  Total dilution
                </span>{" "}
                ~11.2% across both tranches for $985K total
              </div>
            </section>

            {/* Core thesis */}
            <section className="mt-[80px] space-y-8 md:mt-[100px]">
              <SectionTitle
                id="core-thesis"
                kicker="PART 1"
                title="Core thesis"
              />
              <Prose>
                <p>
                  Everything in this document follows from one claim. If
                  it&apos;s right, the roadmap is forced. If it&apos;s wrong, no
                  amount of execution saves the company.
                </p>
              </Prose>

              <Subhead>1.1 Why it is not a document problem</Subhead>
              <Prose>
                <p>
                  Tennr has raised $101M on the bet that referrals are
                  fundamentally a document problem, faxes, scanned forms,
                  handwritten notes, and that a good enough vision-language model
                  solves it. This is the wrong frame. The documents are the
                  symptom, not the disease.
                </p>
                <p>
                  The disease is that referrals are unstructured when the PCP
                  creates them. No amount of downstream processing recovers
                  structure that never existed in the first place. If the
                  referral is structured at creation, there is no document to
                  parse later because the data flows from EHR to EHR as a clean
                  record. Tennr&apos;s product gets more necessary in a world
                  where referrals stay messy and more obsolete in a world where
                  they don&apos;t.
                </p>
              </Prose>

              <Subhead>1.2 Why it is not a workflow problem</Subhead>
              <Prose>
                <p>
                  Valerie Health has raised $39M on the bet that referrals are
                  fundamentally a specialist front-office workflow problem, phone
                  intake, scheduling, follow-up, scanning, filing, and that
                  automating those workflows solves it. This is also wrong, for a
                  different reason.
                </p>
                <p>
                  Automating one office creates no cross-office value. A
                  specialist with perfect intake automation still doesn&apos;t
                  know which referrals from which PCPs convert at what rate. The
                  closure data still doesn&apos;t flow back to the referring
                  side. They still can&apos;t prove anything to their PE operator
                  or to the network. Workflow automation inside one office is a
                  feature, not a moat, because it has no compounding effect.
                  Valerie can be the best specialist intake tool in healthcare and
                  never become Tether, because the value we create lives in the
                  connections between offices, not inside any single one.
                </p>
              </Prose>

              <Subhead>1.3 Why it is not an EHR problem</Subhead>
              <Prose>
                <p>
                  Epic CareLink and every &quot;the built-in referral module is
                  just bad&quot; alternative makes the implicit claim that a better referral feature
                  inside an existing EHR would solve the problem. EHRs are
                  single-tenant by design. A tool inside Epic only sees Epic. The
                  cross-EHR view the problem actually needs cannot exist inside
                  any single vendor.
                </p>
                <p>
                  Epic CareLink is the proof. It is Epic&apos;s attempt at this
                  exact problem, and it explicitly excludes practices that are not
                  on Epic. The patients whose referrals matter most, patients moving
                  between independent PCPs and PE specialty groups on different
                  EHRs, are exactly the population that an EHR-internal tool
                  cannot serve. Any solution gated by single-vendor adoption
                  excludes the 60%+ of independent and concierge practices not on
                  the dominant vendor in any given region.
                </p>
              </Prose>

              <Subhead>1.4 Why it is a graph problem</Subhead>
              <Prose>
                <p>
                  No entity in healthcare today holds the joined record of who
                  referred whom, when, with what context, and with what outcome.
                  That joined record is a graph: nodes are providers; edges are
                  referrals with outcomes attached; value lives in the
                  connections between nodes, not in the nodes themselves.
                </p>
                <p>
                  The graph doesn&apos;t exist because nobody is positioned to
                  capture it. Insurance companies see claims but not workflow.
                  EHRs see one tenant. Health systems see one network. Tennr and
                  Valerie each see one side of the referral. The absence of the
                  graph is the actual disease, and every visible symptom,
                  incomplete referrals, lost patients, poor coordination, leakage,
                  broken loops, is a consequence of the graph not existing.
                </p>
              </Prose>

              <Subhead>1.5 The four constraints</Subhead>
              <CalloutPanel variant="teal" className="mt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      t: "Moment of creation",
                      d: "Capture at the workflow point where the referral is born. The only clean window is when the PCP decides to refer.",
                    },
                    {
                      t: "Structured data",
                      d: "Fields at creation, not documents parsed later. Extraction degrades; structure from the start is what makes the graph meaningful.",
                    },
                    {
                      t: "Both sides",
                      d: 'Referring and receiving. Half the data is worthless because the joins answer "did this complete?"',
                    },
                    {
                      t: "Persistent patient identity",
                      d: "Same human across EHRs. Cross-EHR identity resolution turns edges into a coherent graph.",
                    },
                  ].map((x) => (
                    <div key={x.t} className="min-w-0">
                      <p className="text-sm font-semibold text-memo-teal-dark">
                        {x.t}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-memo-text">
                        {x.d}
                      </p>
                    </div>
                  ))}
                </div>
              </CalloutPanel>

              <Subhead>1.6 The lock-in mechanism</Subhead>
              <Prose>
                <p>
                  Every referral that moves through Tether does three things at
                  once. It serves the patient (coordination), it serves the
                  practices (workflow), and it feeds the graph (intelligence).
                  Practices adopt us for the first two reasons. The third reason is
                  invisible to them when they adopt. By the time they notice the
                  graph exists and has value, switching away from Tether means
                  losing the intelligence the graph has been producing, provider
                  quality scores, completion benchmarks, referral pattern analytics,
                  predictive routing, all of which compound with every additional
                  referral.
                </p>
                <p>
                  That&apos;s the structural lock-in. It isn&apos;t a contractual
                  trap or a switching-cost game. It&apos;s the lock-in that comes
                  from being the only entity holding the joined data, and from
                  that data becoming more valuable the longer a practice has been
                  on the platform. A competitor offering the same workflow
                  features can&apos;t replicate the data history. The switching cost
                  is not the cost of moving to a new tool, it&apos;s the cost of
                  losing 18 months of intelligence the practice&apos;s own data has
                  been generating.
                </p>
              </Prose>

              <Subhead>1.7 Racing time, not competitors</Subhead>
              <Prose>
                <p>
                  Tennr and Valerie currently emphasize different parts of the
                  referral workflow; Tether is differentiated by capturing both
                  the referring and receiving sides when adoption spans both
                  endpoints. Epic and Athena are single-tenant by design. Pivoting
                  to a two-sided graph model would require any of these competitors
                  to rebuild from scratch, which is not a natural motion for
                  well-funded companies already committed to their current
                  architecture.
                </p>
                <p>
                  The real race is whether we can reach graph density in the wedge
                  segments before another two-sided platform decides to enter from
                  scratch. The first mover with a dense graph across
                  concierge-affiliated PCPs, independent multi-specialty groups,
                  and PE-backed specialty networks owns the category, because the
                  lock-in above starts compounding from the first referral. Every
                  month of head start makes the graph harder to replicate, because
                  a future entrant would have to convince the same providers to
                  switch off a tool that&apos;s already generating intelligence
                  they can&apos;t get anywhere else.
                </p>
                <p>
                  This is why the capital ask is urgent. The $985K across both
                  tranches isn&apos;t for building features to beat Tennr.
                  It&apos;s for buying the speed to lock in the network before
                  anyone else figures out that documents and workflows are the
                  wrong game. Every product decision in the rest of this document
                  comes out of this thesis.
                </p>
              </Prose>
            </section>

            {/* Segments */}
            <section className="mt-[80px] space-y-10 md:mt-[100px]">
              <SectionTitle
                id="segments"
                kicker="PART 2"
                title="Segment analysis"
              />
              <Prose>
                <p>
                  The TAM for healthcare referral coordination is the wrong
                  starting number. The right question is which specific segments
                  produce the dense referral connections that generate the graph,
                  while also having the worst existing workaround, the highest
                  willingness to pay, and the most accessible buyer. The wedge
                  decision below is derived from that ranking.
                </p>
              </Prose>

              <div className="space-y-6">
                {(
                  [
                    {
                      tag: "Segment A",
                      title: "Concierge-affiliated independent PCPs",
                      ex: "MDVIP (1,100+ physicians), SignatureMD, Castle Connolly PHP, Specialdocs, PartnerMD.",
                      pain: "Concierge physicians charge patients $2,000-$5,000 per year. Coordinated specialist access is one of the explicit promises. Reality: MAs spend 15-30 minutes per referral on manual coordination, and the loop almost never closes cleanly. This is existential brand risk for the network.",
                      gap: "Concierge has exactly one feature its patients pay for (coordination) and the feature is broken. No incumbent. Pure greenfield.",
                      access:
                        "Warm. MDVIP engaged through current pilot in Washington DC. SignatureMD demoed to executive leadership. Single network contracts unlock 300-1,100+ physicians.",
                      userStories: {
                        mustHave: [
                          "As a concierge-affiliated PCP, I want to send a structured referral to a specialist and have the consult note return to my chart automatically, so that I fulfill the coordination promise patients pay annual fees to receive.",
                          "As a concierge PCP, I want to verify insurance eligibility at referral creation, so that I avoid sending patients to specialists who ultimately cannot bill their plans.",
                        ],
                        niceHave: [
                          "As a concierge PCP, I want routing suggestions informed by referrals that historically completed with similar demographics, so that outbound placement improves cohort over cohort.",
                        ],
                      },
                    },
                    {
                      tag: "Segment B",
                      title: "Independent multi-specialty groups",
                      ex: "Loudoun Medical Group (100 clinics, 300 providers), Inova-affiliated independents, Privia partner groups.",
                      pain: "Internal referrals across dozens of specialties/locations without unified visibility. Fax workflows; leakage invisible until quarterly finance.",
                      gap: "Leakage recovery + internal referral optimization. Physician-owner boards buy ROI.",
                      access:
                        "Warm: Loudoun in IT security review; one contract deploys 100 clinics / 300 providers.",
                      userStories: {
                        mustHave: [
                          "As a multi-specialty practice manager, I want visibility into completed versus leaked internal referrals, so that I quantify revenue left on the table and coach routing.",
                          "As a primary care physician embedded in a specialty-heavy group, I want one-click internal routing that distinguishes in-house specialties from external partners, so that I stop memorizing labyrinth org charts mid-visit.",
                        ],
                        niceHave: [
                          "As a physician-owner, I want a quarterly referral cohort report packaged for governance, so that I frame ROI narratives for board stewardship meetings.",
                        ],
                      },
                    },
                    {
                      tag: "Segment C",
                      title: "PE-backed specialty networks",
                      ex: "Forefront Dermatology (170+ locations), USDP, Schweiger, EyeCare Partners, ortho/GI rollups.",
                      pain: "50-200+ locations per network with no unified inbound referral processing. Each location handles referrals manually with no PCP context. Portfolio COO has no cross-location analytics, no leakage visibility, no acquisition intelligence.",
                      gap: "Tennr/Valerie are single-sided at the specialist. Tether adds referring-side context + portfolio intelligence.",
                      access:
                        "Warm via Forefront; broader PE network via investor/operator intros.",
                      userStories: {
                        mustHave: [
                          "As a specialist, I want inbound referrals annotated with deterministic PCP context, so that I enter the visit without scavenging the chart for breadcrumbs.",
                          "As a PE portfolio COO, I want cross-location referral analytics that tie leakage to EBITDA, so bolt-on diligence leans on data instead of anecdotes.",
                        ],
                        niceHave: [
                          "As a specialist office manager, I want outbound patient outreach sequencing automatically after inbound packets arrive, so clerical staffing focuses on escalations instead of repetitive cold outreach.",
                        ],
                      },
                    },
                  ] satisfies ReadonlyArray<{
                    tag: string;
                    title: string;
                    ex: string;
                    pain: string;
                    gap: string;
                    access: string;
                    userStories: { mustHave: string[]; niceHave: string[] };
                  }>
                ).map((s) => (
                  <div
                    key={s.tag}
                    className={cn(
                      "rounded-lg border-t border-b border-r border-memo-border bg-memo-warm p-6 border-l-[3px]",
                      s.tag === "Segment A" && "border-l-[#0D7377]",
                      s.tag === "Segment B" && "border-l-[#D4613E]",
                      s.tag === "Segment C" && "border-l-[#151F2B]"
                    )}
                    style={{ boxShadow: "var(--memo-shadow)" }}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <span
                        className={cn(
                          "inline-block rounded px-2 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.08em]",
                          s.tag === "Segment A" &&
                            "bg-[#E8F4F4] text-[#0D7377]",
                          s.tag === "Segment B" &&
                            "bg-[rgba(212,97,62,0.12)] text-[#BF5535]",
                          s.tag === "Segment C" &&
                            "bg-[rgba(21,31,43,0.08)] text-[#151F2B]"
                        )}
                      >
                        {s.tag}
                      </span>
                      <span className="text-xs text-memo-text-secondary">
                        {s.ex}
                      </span>
                    </div>
                    <h3 className="mt-3 font-sans text-lg font-semibold text-memo-text md:text-xl">
                      {s.title}
                    </h3>
                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.06em] text-memo-text-secondary">
                          Pain
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-memo-text">
                          {s.pain}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.06em] text-memo-text-secondary">
                          Gap / wedge
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-memo-text">
                          {s.gap}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.06em] text-memo-text-secondary">
                          Access
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-memo-text">
                          {s.access}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 border-t border-memo-border pt-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-memo-teal-dark">
                        Core user stories
                      </p>
                      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-memo-text-secondary">
                        Must-have
                      </p>
                      <ul className="mt-2 space-y-2 text-sm leading-relaxed text-memo-text">
                        {s.userStories.mustHave.map((story) => (
                          <li key={story} className="list-disc pl-4">
                            {story}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-memo-text-secondary">
                        Nice-to-have
                      </p>
                      <ul className="mt-2 space-y-2 text-sm leading-relaxed text-memo-text">
                        {s.userStories.niceHave.map((story) => (
                          <li key={story} className="list-disc pl-4">
                            {story}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <Prose>
                <p>
                  The primary wedge is a sequenced expansion across three segments,
                  starting with the fastest-moving entry points and expanding as
                  the platform proves repeatability. Concierge PCPs (Segment A)
                  generate high-value outbound referrals that establish the demand
                  side of the network. Independent multi-specialty groups (Segment
                  B) generate internal referral density that proves loop closure at
                  scale inside a single governed group. PE-backed specialty
                  networks (Segment C) generate the inbound referral volume and
                  cross-portfolio analytics demand that pays the largest
                  contracts. Together they form the two-sided density that makes
                  the network valuable. Run alone, no single segment is enough:
                  PCPs alone produce demand without supply, specialists alone
                  produce supply without demand, and an independent group alone is
                  a closed loop without the network effect across organizations.
                </p>
                <p>
                  Running all three segments is operationally sustainable because
                  the same product serves all three and each has a warm entry
                  point already in motion. The sequencing follows integration
                  readiness: concierge PCPs activate first through the MDVIP pilot
                  at Dr. Lefevre and expand into the MDVIP and SignatureMD
                  networks as Athena write-back ships. Independent multi-specialty
                  groups activate second through Loudoun Medical Group, which
                  deploys 100 clinics and 300 providers under one contract once
                  eCW clears. PE specialty networks activate third through the
                  Forefront Dermatology advisor relationship as ModMed comes
                  online. The CAC math works because we acquire 30-300 providers
                  per signed contract, not one at a time.
                </p>
              </Prose>
            </section>

            {/* Write-back */}
            <section className="mt-[80px] space-y-6 md:mt-[100px]">
              <SectionTitle
                id="write-back"
                kicker="NON-NEGOTIABLE"
                title="The write-back requirement"
              />
              <Subhead>Why a read-only product fails</Subhead>
              <PullQuote accent="coral">
                A read-only Tether that still requires manual entry is strictly
                worse in the loop-closure dimension. They adopt for the read
                benefits and churn when the loop-closure promise never
                materializes.
              </PullQuote>
              <Prose>
                <p>
                  Providers will not adopt a product that is worse than their
                  current workflow in any dimension. Their current workflow has
                  manual write-back: the MA types the consult note into the patient
                  chart. The wedge product must
                  include write-back from day one. This is non-negotiable, and
                  every integration decision in Part 4 follows from it.
                </p>
              </Prose>
            </section>

            {/* Product */}
            <section className="mt-[80px] space-y-8 md:mt-[100px]">
              <SectionTitle
                id="product"
                kicker="PART 3"
                title="Product architecture"
              />
              <Prose>
                <p>
                  Each layer has a clear value proposition, a specific segment, a
                  specific set of build items, and a specific exit state. Each
                  layer is a prerequisite for the next, and each layer is funded by
                  the previous layer&apos;s revenue. This is the operating spec,
                  not the marketing story.
                </p>
              </Prose>

              <Subhead>
                3.1 Layer 1: Referral coordination network with write-back
              </Subhead>
              <Prose>
                <ProseField label="Timeline">
                  Live now to end of 2026.
                </ProseField>
                <ProseField label="Value proposition">
                  Two-sided referrals with EHR integration on both ends. The PCP
                  sends a structured package, the specialist receives and
                  processes it, and when the visit ends the consult notes go back
                  to the PCP&apos;s chart automatically. The first time the loop
                  closes without anyone touching it on either side.
                </ProseField>
                <ProseField label="Production status">
                  Athena FHIR&nbsp;R4 read live with Marketplace partnership
                  signed April&nbsp;2026; certified FHIR workloads reduce variable
                  API spend versus Platform&nbsp;Services polling; Athena
                  write-back via Marketplace Platform&nbsp;Services in close;
                  ModMed&nbsp;EMA connector built awaiting synapSYS production
                  approvals; specialty directory spanning 1,200+ DMV providers /
                  13 specialties; Ask&nbsp;Tether operational end-to-end;
                  Loudoun eCW rollout (~100 clinics) in IT&nbsp;security
                  review.
                </ProseField>
              </Prose>
              <Subhead>Roadmap bucketing lens</Subhead>
              <Prose>
                <p>
                  Layer&nbsp;2 and Layer&nbsp;3 backlog work maps to explicit
                  product outcomes. Anything after MVP nests into one bucket:
                  <span className="font-semibold"> Foundational </span>(core rails
                  to stay production safe),
                  <span className="font-semibold"> Growth </span>(new logos or
                  locations),
                  <span className="font-semibold"> Engagement </span>(more
                  actions per enrolled provider),
                  <span className="font-semibold"> Retention </span>(reasons to
                  stay month six),
                  <span className="font-semibold"> Monetization </span>(pricing
                  tier unlocks).
                </p>
              </Prose>

              <CalloutPanel variant="warm" className="mt-4">
                <p className="text-sm font-medium text-memo-text-secondary">
                  Layer&nbsp;1 build items tagged by bucket + unlock thesis
                </p>
                <div className="mt-4 -mx-2 overflow-x-auto md:mx-0">
                  <table className="min-w-[640px] w-full border-collapse border border-memo-border text-left text-xs text-memo-text md:text-sm">
                    <thead className="bg-memo-bg font-semibold uppercase tracking-[0.05em] text-memo-text-secondary">
                      <tr>
                        <th className="border border-memo-border px-3 py-2 align-top font-sans tracking-normal normal-case md:px-4">
                          Feature
                        </th>
                        <th className="border border-memo-border px-3 py-2 align-top font-sans tracking-normal normal-case md:px-4">
                          Bucket
                        </th>
                        <th className="border border-memo-border px-3 py-2 align-top font-sans tracking-normal normal-case md:px-4">
                          Unlocks
                        </th>
                        <th className="border border-memo-border px-3 py-2 align-top font-sans tracking-normal normal-case md:px-4">
                          Estimated impact
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(
                        [
                          {
                            feature: "Athena Marketplace Platform Services write-back",
                            bucket: "Foundational",
                            unlocks: "Closes Loudoun-ready loop for Athena-only pilots",
                            impact:
                              "Converts MDVIP concierge cohort once contract covers network pricing",
                          },
                          {
                            feature:
                              "Athena Marketplace seller listing & distribution",
                            bucket: "Growth",
                            unlocks:
                              "Discovery channel into ~162k athenaOne providers",
                            impact:
                              "Target 1-3 credible inbound evaluations per month at steady state listing ops",
                          },
                          {
                            feature: "ModMed EMA connector via synapSYS",
                            bucket: "Foundational",
                            unlocks:
                              "Forefront Dermatology (170+) warm PE diligence path",
                            impact:
                              "Demonstrates repeatable specialist density per signed operator",
                          },
                          {
                            feature: "eCW write-back via partner envelope",
                            bucket: "Foundational",
                            unlocks:
                              "Loudoun Medical Group gated security review payoff",
                            impact:
                              "100 clinics / 300 providers on one enterprise agreement",
                          },
                          {
                            feature: "Structured referral orchestration rails (live increment)",
                            bucket: "Engagement",
                            unlocks:
                              "Expands concierge promise without doubling MA headcount",
                            impact:
                              "Daily active referral creation inside pilot cohort proves habit formation",
                          },
                          {
                            feature: "Loop closure + consult note parsing agent",
                            bucket: "Engagement + Retention",
                            unlocks:
                              "Ends manual chart filing for outbound referrals",
                            impact:
                              "We believe churn risk collapses once write-back survives 60 days straight because Loudoun admins already named manual QA as disqualifier.",
                          },
                          {
                            feature: "Stedi-backed eligibility probes",
                            bucket: "Foundational + Engagement",
                            unlocks: "Fails referrals before leakage begins",
                            impact:
                              "Anchors concierge must-have pairing with routing accuracy",
                          },
                          {
                            feature: "Document parsing v1 (specialist ingest)",
                            bucket: "Engagement",
                            unlocks: "Inbound packet completeness for PE desks",
                            impact:
                              "Required before Forefront locations accept volume SLAs",
                          },
                          {
                            feature: "Multi-location deployment playbook",
                            bucket: "Growth",
                            unlocks:
                              "Lets one procurement vehicle cover dozens of sites",
                            impact:
                              "Scales Concierge expansion + PE rollups without linear services cost",
                          },
                          {
                            feature: "Manager dashboard (completion + leakage KPIs)",
                            bucket: "Engagement + Monetization",
                            unlocks:
                              "Elevates Loudoun admins from anecdotes to governed metrics",
                            impact:
                              "Differentiates bundled $249 practice SKU from $99 specialist pilot",
                          },
                          {
                            feature: "Ask Tether clinician copilot v2",
                            bucket: "Engagement",
                            unlocks:
                              "Answers protocol questions anchored on structured referral payloads",
                            impact:
                              "Raises weekly actions per clinician without widening scope creep",
                          },
                        ] as const
                      ).map((row) => (
                        <tr key={row.feature} className="align-top">
                          <td className="border border-memo-border px-3 py-3 font-semibold md:px-4">
                            {row.feature}
                          </td>
                          <td className="border border-memo-border px-3 py-3 md:px-4">
                            {row.bucket}
                          </td>
                          <td className="border border-memo-border px-3 py-3 md:px-4">
                            {row.unlocks}
                          </td>
                          <td className="border border-memo-border px-3 py-3 md:px-4">
                            {row.impact}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CalloutPanel>
              <ExitCallout className="mt-6">
                <p className="m-0">
                  <span className="font-semibold text-memo-text">
                    Exit state (end of 2026):
                  </span>{" "}
                  15-20 paying practices on the platform, split across all three
                  wedge segments. Approximately $800K-$1M ARR run-rate in the
                  default case, or approximately $300K in the downside case where
                  Athena pricing stalls, the second pilot slips, and Forefront
                  delays. The default assumes at least 1 PE specialty contract at
                  30+ providers, the Loudoun deployment at 100 clinics, and 5 or
                  more concierge-affiliated PCPs at Small-to-Mid enterprise
                  pricing. Athena, ModMed, and eCW live in production. Closure data
                  from real referrals proves the wedge across three segments and
                  grounds the seed round. We believe institutional diligence will
                  treat this cohort as repeatable because Loudoun procurement and
                  Forefront advisor workflows already surfaced identical blockers:
                  deterministic write-back and eligibility before scheduling.
                </p>
              </ExitCallout>

              <Subhead>3.2 Layer 2: Network intelligence</Subhead>
              <Prose>
                <ProseField label="Timeline">Q4 2026 to 2027.</ProseField>
                <ProseField label="Value proposition">
                  The data accumulating from Layer 1 becomes product. Predictive
                  specialist routing for PCPs (which specialist takes this
                  patient&apos;s insurance with next-week availability and
                  historically converts similar referrals), completion probability
                  scoring (which referrals are likely to stall before they do),
                  leakage detection for independent multi-specialty groups (in-group
                  referral retention vs. loss to outside competitors), portfolio
                  analytics for PE operators (cross-location performance,
                  acquisition intelligence, EBITDA leakage visibility), and
                  specialist quality scoring ranked by outcomes rather than
                  self-reported credentials. Nobody else can build this layer
                  because it needs cross-provider data that only exists in a
                  two-sided network, and the agents generating the data also
                  generate the memory that powers each capability on the next
                  referral.
                </ProseField>
                <ProseField label="Prerequisite">
                  Layer 1 has to be generating enough referral volume across enough
                  practices for the dataset to matter. Roughly 5,000+ referrals per
                  month across 30+ practices.
                </ProseField>
              </Prose>
              <CalloutPanel variant="warm" className="mt-6">
                <p className="text-sm font-medium text-memo-text-secondary">
                  Layer&nbsp;2 build items tagged by bucket + unlock thesis
                </p>
                <div className="mt-4 -mx-2 overflow-x-auto md:mx-0">
                  <table className="min-w-[640px] w-full border-collapse border border-memo-border text-left text-xs text-memo-text md:text-sm">
                    <thead className="bg-memo-bg font-semibold uppercase tracking-[0.05em] text-memo-text-secondary">
                      <tr>
                        <th className="border border-memo-border px-3 py-2 align-top font-sans tracking-normal normal-case md:px-4">
                          Feature
                        </th>
                        <th className="border border-memo-border px-3 py-2 align-top font-sans tracking-normal normal-case md:px-4">
                          Bucket
                        </th>
                        <th className="border border-memo-border px-3 py-2 align-top font-sans tracking-normal normal-case md:px-4">
                          Unlocks
                        </th>
                        <th className="border border-memo-border px-3 py-2 align-top font-sans tracking-normal normal-case md:px-4">
                          Estimated impact
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(
                        [
                          {
                            feature:
                              "Historical referral analysis + benchmarking cohorts",
                            bucket: "Engagement + Monetization",
                            unlocks:
                              "Up-levels Concierge CFO conversations into quantified leakage",
                            impact:
                              "Supports $249 network analytics upsell anchored to MDVIP KPI reviews",
                          },
                          {
                            feature:
                              "Specialist quality scoring sourced from completions + cycle times",
                            bucket: "Monetization + Engagement",
                            unlocks:
                              "Feeds directory ranking tiers specialists already pay into",
                            impact:
                              "Creates defensible uplift versus static directories Valerie-style teams maintain",
                          },
                          {
                            feature:
                              "PE portfolio leakage + acquisition diagnostics console",
                            bucket: "Monetization",
                            unlocks:
                              "Gives bolt-on diligence teams EBITDA tied routing math",
                            impact:
                              "Forefront diligence explicitly asked whether portfolio-level charts could ingest referral edges; this answers that question with production data.",
                          },
                          {
                            feature:
                              "Predictive routing (insurance, distance, performance priors)",
                            bucket: "Engagement + Monetization",
                            unlocks:
                              "Shrinks Loudoun concierge leakage by defaulting in-network specialists",
                            impact:
                              "We pilot this once the referral graph crests roughly 5k monthly transactions so cohort sizes stay statistically honest.",
                          },
                          {
                            feature:
                              "Prior authorization acceleration via matured Stedi rail",
                            bucket: "Foundational + Retention",
                            unlocks:
                              "Keeps coordinators inside Tether for adjacent workflows",
                            impact:
                              "Adds non-referral ARR hooks without breaking thesis focus on outbound specialty edges",
                          },
                          {
                            feature:
                              "Directed graph service for intra-network relationship strength",
                            bucket: "Foundational + Engagement",
                            unlocks:
                              "Feeds personalization without bespoke SQL per tenant",
                            impact:
                              "Required substrate before ranking fees feel legitimate to operators",
                          },
                          {
                            feature:
                              "Orchestrated patient outreach playbook expansion",
                            bucket: "Engagement + Retention",
                            unlocks:
                              "Sequences SMS plus voice confirmations without portals",
                            impact:
                              "We believe concierge leaders accept this path because concierge MDVIP demos already prioritized agent-led reminders over another login surface.",
                          },
                        ] as const
                      ).map((row) => (
                        <tr key={row.feature} className="align-top">
                          <td className="border border-memo-border px-3 py-3 font-semibold md:px-4">
                            {row.feature}
                          </td>
                          <td className="border border-memo-border px-3 py-3 md:px-4">
                            {row.bucket}
                          </td>
                          <td className="border border-memo-border px-3 py-3 md:px-4">
                            {row.unlocks}
                          </td>
                          <td className="border border-memo-border px-3 py-3 md:px-4">
                            {row.impact}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CalloutPanel>
              <Prose>
                <p>
                  Dedicated patient portals stay off the Layer&nbsp;2 critical
                  path for now because outreach agents already authenticate
                  patients over SMS plus voice flows. Regulatory load for a gated
                  patient web surface competes directly with predictive routing work
                  and is captured explicitly under Deferred scope rather than buried
                  in 'coming soon' copy.
                </p>
              </Prose>
              <div className="mt-6">
                <ExitCallout>
                  <p className="m-0">
                    <span className="font-semibold text-memo-text">
                      Exit (end of 2027):
                    </span>{" "}
                    50+ practices live, approximately $2.5M ARR. Network
                    intelligence visible in production workflows. PE customers
                    paying for portfolio analytics. Provider quality rankings
                    become the default concierge directory standard. Agents cover
                    patient-side coordination loops without standalone portals at
                    this milestone. Series A closed.
                  </p>
                </ExitCallout>
              </div>

              <Subhead>3.3 Layer 3: Headless EHR coordination (long-horizon vision)</Subhead>
              <Prose>
                <ProseField label="Timeline">2027 to 2028+.</ProseField>
                <ProseField label="Value proposition">
                  Layer 3 is where the architecture leads. It is not a capital
                  commitment in the 18-month plan and we do not ask investors to
                  underwrite it. We include it here to show the structural direction
                  Layers 1 and 2 accumulate toward. Autonomous agents operate
                  across EHRs on the full set of coordination workflows that
                  humans do today: referrals first, then prior authorization,
                  scheduling, patient outreach, and care gap closure. A workflow
                  initiates inside the PCP&apos;s EHR (a referral order, a prior auth
                  request, a follow-up scheduled), the agent detects the event,
                  assembles context from across the connected network, executes the
                  workflow end-to-end against the relevant external parties, and
                  writes the result back to the originating chart. Zero human
                  interaction with Tether itself. Tether becomes the coordination
                  infrastructure between EHRs, not an app anyone logs into.
                </ProseField>
              </Prose>
              <CalloutPanel variant="warm" className="mt-6">
                <p className="text-sm font-medium text-memo-text-secondary">
                  Layer&nbsp;3 build items tagged by bucket + unlock thesis
                </p>
                <div className="mt-4 -mx-2 overflow-x-auto md:mx-0">
                  <table className="min-w-[640px] w-full border-collapse border border-memo-border text-left text-xs text-memo-text md:text-sm">
                    <thead className="bg-memo-bg font-semibold uppercase tracking-[0.05em] text-memo-text-secondary">
                      <tr>
                        <th className="border border-memo-border px-3 py-2 align-top font-sans tracking-normal normal-case md:px-4">
                          Feature
                        </th>
                        <th className="border border-memo-border px-3 py-2 align-top font-sans tracking-normal normal-case md:px-4">
                          Bucket
                        </th>
                        <th className="border border-memo-border px-3 py-2 align-top font-sans tracking-normal normal-case md:px-4">
                          Unlocks
                        </th>
                        <th className="border border-memo-border px-3 py-2 align-top font-sans tracking-normal normal-case md:px-4">
                          Estimated impact
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(
                        [
                          {
                            feature:
                              "Event subscription fabric across integrated EHRs",
                            bucket: "Foundational",
                            unlocks:
                              "Detects referral orders, auth requests, scheduling hooks",
                            impact:
                              "We believe event capture is the only architecture that scales past hourly polling fees without breaking compliance.",
                          },
                          {
                            feature:
                              "Autonomous orchestration across referral + adjacent workflows",
                            bucket: "Engagement + Retention",
                            unlocks:
                              "Runs detect, assemble, decide, execute, write-back loops",
                            impact:
                              "Differentiates from Tennr-style document clearinghouses that never own both chart endpoints simultaneously.",
                          },
                          {
                            feature:
                              "Production-grade cross-EHR patient identity graph",
                            bucket: "Foundational + Monetization",
                            unlocks:
                              "Turns Layer&nbsp;2 priors into closed-loop automation",
                            impact:
                              "Required before health systems trust automation on money flows like auth and scheduling.",
                          },
                        ] as const
                      ).map((row) => (
                        <tr key={row.feature} className="align-top">
                          <td className="border border-memo-border px-3 py-3 font-semibold md:px-4">
                            {row.feature}
                          </td>
                          <td className="border border-memo-border px-3 py-3 md:px-4">
                            {row.bucket}
                          </td>
                          <td className="border border-memo-border px-3 py-3 md:px-4">
                            {row.unlocks}
                          </td>
                          <td className="border border-memo-border px-3 py-3 md:px-4">
                            {row.impact}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CalloutPanel>
            </section>

            {/* Pricing */}
            <section className="mt-[80px] space-y-8 md:mt-[100px]">
              <SectionTitle
                id="pricing"
                kicker="PART 4"
                title="Pricing model"
              />
              <Prose>
                <p>
                  Specialists pay usage-based monthly tiers tied to inbound
                  referral volume. PCPs are free at the practice level under most
                  structures, with optional analytics sold at the network level.
                  The pricing structure aligns Tether&apos;s revenue with the
                  actual value the platform delivers and removes sales friction from
                  expansion.
                </p>
              </Prose>
              <div className="space-y-3">
                {[
                  ["Starter", "0-10", "$99", "Directory listing + receive referrals"],
                  ["Active", "11-30", "$249", "Full dashboard + analytics"],
                  ["Growth", "31-75", "$299", "Priority directory + EHR sync"],
                  ["High volume", "76-150", "$499", "Analytics suite + dedicated onboarding"],
                  ["Network", "150+", "$999", "Enterprise analytics + custom API"],
                ].map(([tier, vol, price, cap]) => {
                  const highlight = tier === "Growth";
                  return (
                    <div
                      key={tier}
                      className={cn(
                        "flex flex-col gap-3 rounded-lg border bg-memo-bg px-5 py-4 sm:flex-row sm:items-center sm:justify-between",
                        highlight
                          ? "border-2 border-memo-teal"
                          : "border border-memo-border"
                      )}
                      style={{ boxShadow: "var(--memo-shadow)" }}
                    >
                      <div className="min-w-0 sm:flex-1">
                        <p className="font-sans text-sm font-semibold text-memo-teal">
                          {tier}
                        </p>
                        <p className="mt-1 text-sm text-memo-text-secondary">
                          {vol} referrals/mo · {cap}
                        </p>
                      </div>
                      <p className="shrink-0 font-serif text-2xl font-normal text-memo-navy">
                        {price}
                        <span className="ml-1 font-sans text-base font-normal text-memo-text-secondary">
                          /mo
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
              <Subhead>Pricing and feature bundles</Subhead>
              <div className="overflow-x-auto rounded-lg border border-memo-border">
                <table className="min-w-[640px] w-full border-collapse text-left text-sm text-memo-text">
                  <thead className="bg-memo-warm text-xs font-semibold uppercase tracking-[0.08em] text-memo-text-secondary">
                    <tr>
                      <th className="border border-memo-border px-4 py-3 font-sans tracking-normal normal-case">
                        Tier
                      </th>
                      <th className="border border-memo-border px-4 py-3 font-sans tracking-normal normal-case">
                        Price
                      </th>
                      <th className="border border-memo-border px-4 py-3 font-sans tracking-normal normal-case">
                        Features
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(
                      [
                        [
                          "Pilot",
                          "Free or $99/mo",
                          "Outbound referrals, specialist directory, basic loop closure capped at 1-2 providers",
                        ],
                        [
                          "Practice",
                          "$249-$299/mo per location",
                          "Full bidirectional EHR integration, eligibility verification, document parsing, manager dashboard",
                        ],
                        [
                          "Network enterprise",
                          "$60K-$150K ACV",
                          "Custom routing rules, network analytics, white-label surfaces, priority support, dedicated CSM",
                        ],
                        [
                          "Specialist network",
                          "$99-$999/mo per office (volume-tiered)",
                          "Inbound referral management, ranking visibility, completion analytics, structured intake",
                        ],
                      ] as const
                    ).map(([tier, price, features]) => (
                      <tr key={tier}>
                        <td className="border border-memo-border px-4 py-3 align-top font-semibold">
                          {tier}
                        </td>
                        <td className="border border-memo-border px-4 py-3 align-top">
                          {price}
                        </td>
                        <td className="border border-memo-border px-4 py-3 align-top">
                          {features}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Prose>
                <p>
                  Auto-upgrade tiers as volume grows. A specialist who joins at
                  Starter and grows into the Network tier over 18 months
                  represents a 10x ACV increase with zero additional sales cost. A
                  30-provider PE specialty network with locations averaging Growth
                  tier ($299/mo) generates approximately $108K ARR from a single
                  contract.
                </p>
                <p>
                  For concierge networks, two contract structures exist. The
                  default is a network-level enterprise contract: the operator
                  (MDVIP, SignatureMD, etc.) signs on behalf of all member
                  physicians and pays a flat annual fee for unlimited PCP access
                  plus the network analytics module. The alternative is free PCP
                  access at the practice level with a paid analytics tier sold to
                  physicians or practice owners who want referral pattern
                  visibility for their own panel. Both structures keep PCP-side
                  adoption frictionless, which is the demand engine for the
                  specialist side. Charging PCPs would suppress the volume that
                  makes the network valuable to specialists. The two-sided
                  economics depend on PCP-free as a structural commitment, not a
                  temporary promotion.
                </p>
              </Prose>
            </section>

            {/* Path to scale */}
            <section className="mt-[80px] space-y-6 md:mt-[100px]">
              <SectionTitle
                id="path-to-scale"
                kicker="GROWTH"
                title="Path to scale"
              />
              <Prose>
                <p>
                  The pricing model above describes what one practice pays. This
                  section shows what happens when the network compounds across
                  segments. The math below is built from the unit economics already
                  described, not from top-down TAM assumptions.
                </p>
              </Prose>
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  {
                    title: "Single specialist location",
                    lines: [
                      "$99-$999/mo depending on referral volume",
                      "Starter to Network tier in 18 months = up to 10x ACV expansion",
                      "Zero incremental sales cost on tier upgrades",
                    ],
                  },
                  {
                    title: "PE network contract (30 locations)",
                    lines: [
                      "30 locations averaging Growth tier ($299/mo) = ~$108K ARR",
                      "One contract, one signer, one onboarding",
                      "Portfolio analytics module adds $2-5K/mo at the network level",
                    ],
                  },
                  {
                    title: "Concierge network contract (300+ physicians)",
                    lines: [
                      "Enterprise flat fee at the operator level ($150-250K/yr)",
                      "Unlocks 300-1,100 PCPs as demand-side network",
                      "Every PCP referral feeds specialist-side revenue",
                    ],
                  },
                ].map((c) => (
                  <div
                    key={c.title}
                    className="rounded-lg border border-memo-border bg-memo-warm p-4 md:p-5"
                    style={{ boxShadow: "var(--memo-shadow)" }}
                  >
                    <p className="font-sans text-sm font-semibold text-memo-navy">
                      {c.title}
                    </p>
                    <ul className="mt-3 space-y-2 text-sm leading-snug text-memo-text">
                      {c.lines.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="overflow-x-auto rounded-lg border border-memo-border">
                <div className="min-w-[72rem]">
                  <div
                    className="grid gap-2 border-b border-memo-border bg-memo-warm px-3 py-2.5 font-sans text-[10px] font-semibold uppercase tracking-[0.06em] text-memo-text-secondary"
                    style={{
                      gridTemplateColumns:
                        "0.92fr 0.72fr 0.6fr 1.45fr 1.05fr 1.55fr 0.92fr",
                    }}
                  >
                    <div>Phase</div>
                    <div>Timeline</div>
                    <div>Practices</div>
                    <div>Key features shipped</div>
                    <div>Bucket mix</div>
                    <div>Revenue drivers</div>
                    <div>ARR range</div>
                  </div>
                  {(
                    [
                      {
                        phase: "F&F exit",
                        timeline: "Month 6",
                        practices: "3-5",
                        features:
                          "Athena Marketplace write-back live, loop closure agent, Stedi eligibility, Ask&nbsp;Tether memory v2 ships to pilots",
                        buckets: "Foundational + Engagement-heavy",
                        drivers:
                          "$99 pilot ladders, concierge conversion to practice tier, Loudoun contingency launch window",
                        arr: "$36-60K",
                        muted: false,
                      },
                      {
                        phase: "Pre-seed exit",
                        timeline: "Month 18",
                        practices: "15-20",
                        features:
                          "ModMed + eCW adapters in prod, SOC&nbsp;2 Type&nbsp;I, Layer&nbsp;2 data plane groundwork, manager analytics dashboard bundles",
                        buckets: "Foundational + Growth + Engagement",
                        drivers:
                          "Enterprise packages across concierge, MSG, and PE simultaneously",
                        arr: "$800K-$1M",
                        muted: false,
                      },
                      {
                        phase: "Series A target",
                        timeline: "Month 30",
                        practices: "50-75",
                        features:
                          "Predictive routing, PE portfolio cockpit, embedded clinician surfaces, hardened agent-mediated patient confirmations",
                        buckets: "Engagement + Monetization",
                        drivers:
                          "Tiered analytics uplift, sponsor-backed portfolio KPIs",
                        arr: "$3-5M",
                        muted: false,
                      },
                      {
                        phase: "Growth phase",
                        timeline: "Year 3-4",
                        practices: "200-500",
                        features:
                          "Depth in ortho/GI/cardiology adapters, payer-grade export APIs, playbooked multi-metro onboarding",
                        buckets:
                          "Growth + Monetization parity with foundational maintenance",
                        drivers:
                          "Specialist tiers compounding plus intelligence licensing proofs",
                        arr: "$15-30M",
                        muted: true,
                      },
                      {
                        phase: "Platform scale",
                        timeline: "Year 5+",
                        practices: "1,000+",
                        features:
                          "Metro-density automation (Layer&nbsp;3), regulated data collaborations",
                        buckets:
                          "Retention + Monetization with heavy foundational compliance",
                        drivers:
                          "Network effects across five or more metros plus adjacency modules",
                        arr: "$75-150M",
                        muted: true,
                      },
                    ] as const
                  ).map((row, idx) => (
                    <div
                      key={row.phase}
                      className={cn(
                        "grid gap-2 border-b border-memo-border px-3 py-2.5 text-sm last:border-b-0 leading-snug",
                        idx % 2 === 0 ? "bg-memo-bg" : "bg-memo-warm",
                        row.muted ? "text-memo-text-secondary" : "text-memo-text"
                      )}
                      style={{
                        gridTemplateColumns:
                          "0.92fr 0.72fr 0.6fr 1.45fr 1.05fr 1.55fr 0.92fr",
                      }}
                    >
                      <div
                        className={cn(
                          "font-medium",
                          row.muted ? "text-memo-text-secondary" : "text-memo-text"
                        )}
                      >
                        {row.phase}
                      </div>
                      <div>{row.timeline}</div>
                      <div>{row.practices}</div>
                      <div className="min-w-0">{row.features}</div>
                      <div className="min-w-0">{row.buckets}</div>
                      <div className="min-w-0">{row.drivers}</div>
                      <div
                        className={cn(
                          "font-semibold",
                          row.muted ? "text-memo-text-secondary" : "text-memo-text"
                        )}
                      >
                        {row.arr}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Prose>
                <p>
                  Three mechanisms drive non-linear growth after Month 18. First,
                  specialist tiers auto-upgrade as referral volume increases, so
                  existing customers generate more revenue without new sales
                  activity. Second, every PCP added to the network increases
                  referral flow to every specialist already on it, which means
                  each new PCP contract simultaneously increases revenue from the
                  existing specialist base. Third, Layer 2 network intelligence
                  creates an entirely new revenue surface (analytics, routing
                  optimization, quality scoring) that does not exist in Year 1 but
                  becomes the primary expansion driver by Year 3. The $75-150M
                  range at Year 5 assumes Tether has built referral density in 5-10
                  metro markets, added 2-3 new specialty verticals beyond
                  dermatology, and begun licensing network intelligence to payers
                  and health systems. These are not baked into the 18-month capital
                  plan. They are where the architecture leads if the wedge works.
                </p>
              </Prose>
              <p className="text-xs leading-relaxed text-memo-text-tertiary">
                Projections are illustrative and derived from the unit economics and
                segment sizes described in this document. They are not financial
                commitments. The 18-month capital plan funds through the Pre-seed
                exit milestone only.
              </p>
            </section>

            <section className="mt-[80px] space-y-8 md:mt-[100px]">
              <SectionTitle
                id="retention-strategy"
                kicker="GROWTH"
                title="Retention strategy"
              />
              <Prose>
                <p>
                  <span className="font-semibold text-memo-text">
                    Loop closure locks workflow.
                  </span>{" "}
                  Consult notes flowing back erase the clipboard task MAs tolerated
                  for decades. Faxing again forces manual filings and duplicate QA.
                  Operators report habit formation inside 30&nbsp;days once
                  write-back survives nightly audits unchanged.
                </p>
                <p>
                  <span className="font-semibold text-memo-text">
                    Network recall compounds quarterly.
                  </span>{" "}
                  Routing suggestions draw on payer acceptance, turnaround, and
                  completion velocity already observed inside Tether. Leaving the
                  platform discards calibrated priors Loudoun admins cannot recreate
                  in spreadsheets.
                </p>
                <p>
                  <span className="font-semibold text-memo-text">
                    Embedded observability reinforces ownership.
                  </span>{" "}
                  Automated monthly dossiers quantify referral volume, completion
                  percentages, leakage, and specialist response SLA adherence. Few
                  practice managers historically receive that fidelity without paying
                  consultants.
                </p>
              </Prose>
              <CalloutPanel variant="teal">
                <p className="m-0 text-sm leading-relaxed text-memo-text md:text-base">
                  <span className="font-semibold text-memo-navy">
                    Retention KPI for Friends & Family cohort:&nbsp;
                  </span>
                  Target gross retention over 90&nbsp;percent at month six after
                  go-live.&nbsp;
                  <span className="italic text-memo-text-secondary">
                    We believe that benchmark is attainable because concierge pilot
                    feedback already cites manual consult filing as weekly churn bait.
                  </span>
                </p>
              </CalloutPanel>
            </section>

            {/* EHR */}
            <section className="mt-[80px] space-y-8 md:mt-[100px]">
              <SectionTitle
                id="ehr"
                kicker="PART 5"
                title="EHR integration strategy"
              />
              <Prose>
                <p>
                  Tether integrates with EHRs direct-first in the seed window.
                  Athena, ModMed, and eCW are all built as direct adapters because
                  each has a warm customer relationship, a partner program
                  accessible at our stage, and per-practice economics that direct
                  integration preserves. Redox enters the architecture at Series A
                  as the primary path for Epic, Cerner, and long-tail EHRs where
                  direct partnership is either unavailable or prohibitively slow.
                  The seed window deliberately targets three EHRs, not four. Epic is
                  explicitly deferred to the Series A window as a market
                  segmentation choice; see Part 9.2 for the reasoning.
                </p>
              </Prose>
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  {
                    ehr: "Athena",
                    st: "Live in production",
                    path: "Direct + Platform Services upgrade",
                    seg: "Concierge (MDVIP pilot)",
                  },
                  {
                    ehr: "ModMed EMA",
                    st: "Q2 build, Q3 deploy",
                    path: "synapSYS partner program",
                    seg: "PE derm (Forefront)",
                  },
                  {
                    ehr: "eClinicalWorks",
                    st: "In integration",
                    path: "Direct partner program",
                    seg: "Independent MSG (Loudoun)",
                  },
                ].map((r) => (
                  <StatCard
                    key={r.ehr}
                    label={r.ehr}
                    value={r.st}
                    hint={`${r.path} · ${r.seg}`}
                  />
                ))}
              </div>
              <Prose>
                <p>
                  Three-EHR scope is execution discipline. Epic/NextGen/Cerner
                  follow Series A when capacity exists. Direct Athena integration
                  also unlocks Marketplace distribution (160,000+ providers).
                  Middleware routing does not qualify for Marketplace listing; direct
                  integration does.
                </p>
                <p>
                  <span className="font-semibold text-memo-text">Redox:</span> deferred
                  for now with $0 cash out in this tranche window. Activation at
                  pre-seed earmarks roughly $15K annual sandbox pricing plus roughly
                  $1K per production connection per diligence notes from April&nbsp;2026 scoping whenever Epic breadth or stalled direct integrations require a parallel path.
                  Connection economics (practice vs&nbsp;tenant vs&nbsp;environment)
                  must be nailed in contract language before powering anything in
                  production.
                </p>
              </Prose>
            </section>

            {/* Capital plan */}
            <section className="mt-[80px] space-y-8 md:mt-[100px]">
              <SectionTitle
                id="capital-plan"
                kicker="PART 6"
                title="Capital plan"
              />
              <Prose>
                <p>
                  The capital ask comes out of the roadmap, not the other way
                  around. Every line item below is justified by a capability the
                  money ships, the cost of not shipping it on time, and the revenue
                  or deal flow that capability unlocks. The total is what it
                  actually costs to execute Layer 1 to the point where Tether has
                  closed-loop referrals working across three EHRs, SOC 2 Type I
                  attestation, and 15-20 paying practices split across all three
                  wedge segments.
                </p>
                <p>
                  Target investors: mid-Atlantic healthcare-savvy angels,
                  healthcare-focused seed funds, and operator-led SPVs. We are
                  optimizing for investors who have shipped into ambulatory
                  healthcare and understand why direct EHR integration at this scope
                  is defensible.
                </p>
              </Prose>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  ["Founding team", "45%", "$442,000", "3 founders + integration engineer (M9)"],
                  ["EHR infra + data", "14%", "$135,000", "Partner programs, Stedi, cloud, AI, pipelines"],
                  ["GTM + practice acq.", "9%", "$90,000", "Diagnostic sales tool, demos, conferences"],
                  ["Compliance + IP", "12%", "$120,000", "SOC 2 Type I, counsel, provisional patent"],
                  ["Operating reserve", "20%", "$198,000", "Contingency + buffer"],
                ].map(([cat, pct, amt, purpose]) => (
                  <div
                    key={cat}
                    className="rounded-lg border border-memo-border bg-memo-bg p-4"
                    style={{ boxShadow: "var(--memo-shadow)" }}
                  >
                    <p className="text-sm text-memo-text-secondary">
                      {String(cat)} · {String(pct)}
                    </p>
                    <p className="mt-2 font-sans text-xl font-semibold text-memo-navy">
                      {String(amt)}
                    </p>
                    <p className="mt-2 text-sm leading-snug text-memo-text-secondary">
                      {String(purpose)}
                    </p>
                  </div>
                ))}
              </div>
              <Subhead>Two-tranche detail</Subhead>
              <Prose>
                <p>
                  <span className="font-semibold text-memo-text">F&amp;F ($135K):</span> Athena
                  Platform Services write-back live; first closed-loop referral;
                  Stedi eligibility; document parsing v1; Ask Tether memory +
                  richer agents. Milestones include loop closure at Lefevre,
                  Loudoun eCW pilot contingent on IT, Forefront ModMed pilot
                  advanced, 3 to 5 paying practices, Marketplace listing in motion.
                </p>
                <p>
                  <span className="font-semibold text-memo-text">Pre-seed ($850K):</span>{" "}
                  Integration engineer at Month 9; eCW write-back + Layer 2
                  groundwork; ModMed deployment; SOC 2 Type I; enterprise
                  pipeline across all segments; Supabase HIPAA Team when BAA
                  requires. Milestones: 15-20 practices, ~$800K-$1M ARR, 3 EHRs
                  live, enterprise contract in each segment, Layer 2 data in
                  early use, seed conversations active.
                </p>
              </Prose>
              <Subhead>Largest line items (why they matter)</Subhead>
              <div className="max-w-[720px] space-y-4 text-sm leading-relaxed text-memo-text">
                <p>
                  <span className="font-semibold text-memo-coral">$442K</span>{" "}
                  founding team: ships Layer 1 integrations, agents, first
                  contracts; below-market comp stretches runway.
                </p>
                <p>
                  <span className="font-semibold text-memo-coral">$100K</span>{" "}
                  integration engineer: without Month 9 hire, eCW slips past
                  Month 12; ~$50K-$100K ARR at risk from a Q4 2026 eCW
                  customer.
                </p>
                <p>
                  <span className="font-semibold text-memo-coral">$135K</span> EHR +
                  infra: direct programs + inference + cloud + Stedi; Redox
                  deferred until Series A economics match Epic/Cerner expansion.
                </p>
                <p>
                  <span className="font-semibold text-memo-coral">$120K</span>{" "}
                  compliance/IP: SOC 2 gates the 5-10x ACV jumps; patent sequence
                  protects Layer 2 routing/intelligence moat.
                </p>
              </div>
              <Subhead>EHR integration unit economics</Subhead>
              <ExitCallout className="space-y-4 text-sm leading-relaxed">
                <p>
                  <span className="font-semibold text-memo-text">
                    Athena Marketplace Platform Services (Essential posture):
                  </span>
                </p>
                <ul className="m-0 list-disc space-y-2 pl-5">
                  <li>
                    Flat connection economics at roughly $30 per practice monthly
                    with no discretionary discount modeled today.
                  </li>
                  <li>
                    Variable usage bills against Athena&apos;s published rate card.
                    Tier&nbsp;1 currently floors at roughly $900 monthly when
                    throughput stays beneath 18,750 billable Platform Services calls
                    in a billing period.
                  </li>
                  <li>
                    Certified FHIR workloads sit outside Platform Services metering,
                    anchoring noisy read traffic away from punitive polling charges.
                  </li>
                </ul>
                <p>
                  Modeled Athena cash under two integration postures:&nbsp;(1)&nbsp;a
                  lean architecture that minimizes redundant /changed polling and
                  (2)&nbsp;default hourly polling telemetry. Estimated totals:&nbsp;
                  roughly $13K in Year&nbsp;one at roughly five average practices;&nbsp;
                  Year&nbsp;two spans roughly $20K (lean) vs roughly $45K
                  (default);&nbsp;Year&nbsp;three spans roughly $47K (lean) vs
                  roughly $94K (default) assuming roughly one hundred practices.
                  The spread is managerially controllable.&nbsp;
                  <span className="italic text-memo-text-secondary">
                    We treat every webhook or streaming upgrade as direct COGS
                    defense versus hoping vendor pricing magically compresses.&nbsp;
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-memo-text">Redox (deferred):</span>
                  Sandbox assumed around $15K annually plus roughly $1K per routed
                  production connection when Epic optionality outweighs incremental
                  build risk.
                </p>
                <p>
                  <span className="font-semibold text-memo-text">
                    ModMed (synapSYS) and eClinicalWorks:&nbsp;
                  </span>
                  Pricing still settles as partner paperwork closes; envelopes roll
                  into the infra budget line item above alongside Marketplace spend.
                  Note: modeled Athena figures above reconcile to the enumerated
                  $135K infra slice in the waterfall, not incremental mystery
                  allocations.
                </p>
                <p>
                  <span className="font-semibold text-memo-text">
                    Marginal cost per incremental Athena practice:&nbsp;
                  </span>
                  Roughly thirty dollars monthly connection overhead. Specialists
                  already pay about $249 to about $999, so covering integration drag takes one
                  to three invoicing cycles of active utilization.&nbsp;
                  <span className="italic text-memo-text-secondary">
                    Investors keep asking whether API fees eat margin; arithmetic
                    proves single-sided competitors never reach this wedge because they
                    never monetize the receiving side aggressively enough.&nbsp;
                  </span>
                </p>
              </ExitCallout>
            </section>

            {/* Team */}
            <section className="mt-[80px] space-y-6 md:mt-[100px]">
              <SectionTitle
                id="team"
                kicker="OPERATORS"
                title="Who ships the roadmap"
              />
              <div className="grid gap-4 md:grid-cols-3 md:items-stretch">
                {[
                  {
                    name: "Ravi Suresh",
                    initials: "RS",
                    role: "Co-Founder & CTO",
                    summary:
                      "Product, architecture, Athena/ModMed/eCW integrations. Former Scale AI infra; ships Tether full-time at F&F close.",
                  },
                  {
                    name: "Sid Thakker",
                    initials: "ST",
                    role: "Co-Founder & CEO",
                    summary:
                      "PE plus concierge GTM, diligence, capital orchestration. CapM Advisory analyst moving full-time July 1.",
                  },
                  {
                    name: "Sach Thakker",
                    initials: "SAT",
                    role: "Co-Founder & CMO",
                    summary:
                      "Clinical onboarding, MDVIP plus Forefront fronts. Georgetown MD, derm match May 2026, MedStar intern July 2026.",
                  },
                ].map((p) => (
                  <div
                    key={p.name}
                    className="flex h-full min-h-[180px] flex-col rounded-lg border border-memo-border bg-memo-bg p-4"
                    style={{ boxShadow: "var(--memo-shadow)" }}
                  >
                    <div
                      className="mb-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0D7377] font-sans text-sm font-semibold text-white"
                      aria-hidden
                    >
                      {p.initials}
                    </div>
                    <p className="font-sans text-base font-bold text-memo-text">
                      {p.name}
                    </p>
                    <p className="mt-1 text-sm text-memo-text-secondary">
                      {p.role}
                    </p>
                    <p className="mt-3 text-sm leading-snug text-memo-text">
                      {p.summary}
                    </p>
                  </div>
                ))}
              </div>
              <Prose>
                <p>
                  Ravi Suresh (CTO) leads all technical execution: product,
                  platform architecture, EHR integrations, vendor and IT
                  communications. Built Tether from zero to production in roughly
                  three months of nights-and-weekends momentum while still at
                  Scale AI inference infrastructure. Production Athena FHIR
                  integration (read/write via Marketplace Platform Services in
                  flight), agent orchestration, HIPAA-grade hosting, the 1,200+
                  provider directory, and diagnostic sales tooling live in his
                  codebase. Former medical student route (Indiana University) before
                  choosing systems over clinical practice. Sid Thakker (CEO)
                  originates PE specialty pipelines, concierge expansions,
                  diligence storytelling, forecasting, and capital execution.
                  Produced the MDVIP and Forefront relationships from cold outbound;
                  previously Investment Banking Analyst at CapM Advisory and Growth
                  Equity Analyst at Level Equity before shifting full-time to Tether
                  on&nbsp;July&nbsp;1,&nbsp;2026. Penn economics. Sach Thakker (CMO)
                  owns clinical onboarding, bedside credibility, pilots, recruiting
                  specialists, advisory councils, plus every workflow workshop tied
                  to referral closure. Anchors the wedge in lived training pain at
                  MedStar-affiliated rotations. Georgetown medical degree May 2026,
                  dermatology match May&nbsp;2026, intern orientation July&nbsp;2026.
                  Physician buyers fundamentally trust Sach in rooms where pure
                  software founders lose permission.
                </p>
                <p>
                  The operating split: Ravi handles all technical and integration
                  work end-to-end. Sid and Sach handle all outbound work, customer
                  development, pilot acquisition, sales material production, investor
                  outreach, and the operational follow-through that converts
                  conversations into signed contracts. Decisions that affect product
                  roadmap and capital strategy are made jointly, but day-to-day
                  execution does not require all three founders in every
                  conversation, which is the only way three founders ship a roadmap
                  this aggressive on this budget.
                </p>
              </Prose>
            </section>

            {/* Competition */}
            <section className="mt-[80px] space-y-8 md:mt-[100px]">
              <SectionTitle
                id="competition"
                kicker="PART 7"
                title="Competitive landscape"
              />
              <div className="space-y-3">
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-memo-text-secondary">
                  Capability matrix
                </p>
                <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
                  <div
                    className="min-w-[36rem] overflow-hidden rounded-lg border border-memo-border bg-memo-bg"
                    style={{ boxShadow: "var(--memo-shadow)" }}
                  >
                    {[
                      [
                        "Capability",
                        "Tether",
                        "Tennr",
                        "Valerie",
                        "Locata",
                        "Saffron",
                      ],
                      [
                        "Two-sided network",
                        "Yes",
                        "Attempting",
                        "No",
                        "No",
                        "No",
                      ],
                      [
                        "PCP-side free adoption",
                        "Yes",
                        "No",
                        "No",
                        "No",
                        "No",
                      ],
                      [
                        "Bidirectional EHR sync",
                        "Yes",
                        "Yes",
                        "Partial",
                        "Partial",
                        "Partial",
                      ],
                      [
                        "Automated loop closure",
                        "Yes",
                        "No",
                        "No",
                        "Partial",
                        "No",
                      ],
                      [
                        "Network intelligence layer",
                        "Yes",
                        "No",
                        "No",
                        "No",
                        "No",
                      ],
                      [
                        "Cross-portfolio analytics (PE)",
                        "Yes",
                        "No",
                        "No",
                        "No",
                        "No",
                      ],
                      [
                        "Specialist pays; PCP free",
                        "Yes",
                        "No",
                        "No",
                        "No",
                        "No",
                      ],
                    ].map((row, i) => (
                      <div
                        key={i}
                        className={cn(
                          "grid grid-cols-6 gap-px border-b border-memo-border bg-memo-border px-0 py-0 text-xs md:text-sm",
                          i === 0 &&
                            "bg-memo-warm font-sans text-[10px] font-semibold uppercase tracking-[0.08em] text-memo-text-secondary"
                        )}
                      >
                        {row.map((cell, j) => {
                          const isHeader = i === 0;
                          const tone = !isHeader && j > 0 ? matrixCellTone(cell) : "";
                          return (
                            <div
                              key={j}
                              className={cn(
                                "min-w-0 break-words bg-memo-bg px-3 py-2.5",
                                isHeader && "bg-memo-warm",
                                j === 0
                                  ? "text-left font-medium text-memo-text"
                                  : "text-center md:text-left",
                                tone
                              )}
                            >
                              {cell}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-memo-text-tertiary">
                  Horizontal scroll on narrow viewports; grid layout instead of a
                  HTML table.
                </p>
              </div>
              <Subhead>Why two-sided wins</Subhead>
              <Prose>
                <p>
                  <span className="font-semibold text-memo-text">
                    Tennr ($101M raised)
                  </span>
                </p>
                <p>
                  Built a specialist-side document processing product. Their moat
                  is a vision-language model trained on inbound referral faxes.
                  Tennr Network launched in 2025 as a bolt-on attempt at two-sided
                  visibility, but their architecture is fundamentally single-sided
                  and document-first. To actually become two-sided, they need to
                  acquire PCPs as customers, which requires a different GTM, a
                  different sales motion, a different product surface, and a
                  rearchitected data model. Their revenue depends on document chaos
                  continuing. The more we succeed at structured referrals, the
                  less their revenue engine runs.
                </p>
                <p>
                  Tennr also charges specialists for intake, which creates an
                  incentive conflict. A platform that profits from specialist
                  confusion cannot credibly position itself as the network that
                  simplifies coordination. Tether makes PCPs free to drive demand and
                  charges specialists for supply, which is the cleaner marketplace
                  structure and the reason network density compounds in our favor
                  over time.
                </p>
                <p>
                  <span className="font-semibold text-memo-text">
                    Valerie Health ($39M raised)
                  </span>
                </p>
                <p>
                  Automates specialist front-office workflows: phone intake, fax
                  processing, scheduling, intake documentation. Their moat is
                  workflow automation inside the specialist&apos;s office. They
                  have zero relationship with the referring PCP and cannot build
                  cross-provider analytics because they never see the sending side.
                  To become two-sided they face the same acquisition problem as
                  Tennr plus they would need to invest in a product surface they do
                  not currently have.
                </p>
                <p>
                  Valerie can coexist with Tether at the same PE specialty group
                  without conflict. Valerie processes location-level intake (the
                  tactical workflow inside one office), Tether provides
                  network-level intelligence (the strategic view across all locations
                  and the connection to the referring PCP side). The two products are
                  complements, not substitutes, but only Tether captures the
                  cross-portfolio data that PE operators are actually buying for at
                  the network level. Valerie cannot become Tether without rebuilding
                  from scratch.
                </p>
                <p>
                  <span className="font-semibold text-memo-text">
                    Locata (YC S25, pre-seed)
                  </span>
                </p>
                <p>
                  Builds AI agents that automate primary care referral workflow:
                  pre-fill referral forms, submit prior authorizations through payor
                  portals, and follow up with patients via voice AI. PCP-side
                  single-sided, the inverse of Tennr and Valerie. Locata sells to
                  back-office staff at primary care practices and FQHCs, where the
                  value prop is automating administrative work inside one
                  organization. They have no specialist-side relationship and no
                  cross-provider data, which means no network intelligence and no
                  current path to Layer 2 capabilities. Pre-seed stage and
                  well-positioned in their lane, but would need to build
                  specialist-side adoption and cross-EHR write-back from scratch to
                  compete on the two-sided graph.
                </p>
                <p>
                  <span className="font-semibold text-memo-text">
                    Saffron Health (YC)
                  </span>
                </p>
                <p>
                  Also PCP-side and YC-backed, focused on FQHCs and rural health
                  clinics tied to value-based care contracts. Saffron&apos;s
                  automation pitch resonates in segments where federal funding and
                  grant requirements make referral follow-through a financial
                  necessity. They serve a different customer than Tether (FQHC vs.
                  concierge / independent multi-specialty / PE specialty), which
                  means we are not in direct competition for the same accounts in
                  the seed window, but they share Locata&apos;s structural ceiling:
                  no specialist relationship, no cross-organization graph. Epic
                  CareLink is sometimes named alongside these competitors but is not
                  a meaningful threat to Tether&apos;s wedge: it is a single-EHR
                  walled garden that excludes the 60%+ of independent and
                  concierge practices not on Epic.
                </p>
              </Prose>
              <Subhead>Why now</Subhead>
              <div className="grid gap-3 md:grid-cols-3">
                <StatCard
                  label="FHIR R4 maturity"
                  value="2023-2025"
                  hint="Athena, eCW, ModMed expose structured APIs at levels unavailable when earlier entrants started."
                />
                <StatCard
                  label="PE rollups"
                  value="Critical mass"
                  hint="Derm/ortho/GI scale where portfolio analytics became a buying criterion."
                />
                <StatCard
                  label="Agents"
                  value="2024-2025"
                  hint="Reliable tool use + structured clinical workflows unlock Layer 3 feasibility."
                />
              </div>
            </section>

            {/* Execution */}
            <section className="mt-[80px] space-y-8 md:mt-[100px]">
              <SectionTitle
                id="execution"
                kicker="PART 8"
                title="Execution plan: next 180 days"
              />
              <div className="grid gap-10 md:grid-cols-2 md:gap-12">
                {(
                  [
                    {
                      quarter: "Q2 2026",
                      subtitle: "Ship the wedge",
                      commitments: [
                        {
                          headline:
                            "Athena Marketplace Platform Services write-back live.",
                          userGoal:
                            "Lefevre team files zero outbound consult summaries after visits complete inside Tether; charts stay native to Athena workflows.",
                          businessGoal:
                            "Eliminates blocker explicitly raised by four practices in diligence this quarter: without write-back pilots convert to churn risk instead of contracted expansion.",
                        },
                        {
                          headline:
                            "Loop closure orchestration agent plus specialist document parsing v1.",
                          userGoal:
                            "Specialists keep existing note habits while Tether normalizes payloads and fires completion triggers without coordinators babysitting statuses.",
                          businessGoal:
                            "Unlocks Forefront-ready intake narrative plus satisfies MVP step five for MDVIP escalation conversations chasing closed-loop proofs.",
                        },
                        {
                          headline:
                            "ModMed build cutoff, live Stedi eligibility, Telnyx patient outreach sequencing.",
                          userGoal:
                            "Coordinators clear insurance uncertainty before outbound routing and templated SMS nudges keep patients moving without portals.",
                          businessGoal:
                            "Protects Loudoun-aligned eligibility promise for Segment B ROI math while finishing ModMed scaffolding ahead of synapSYS production gate.",
                        },
                        {
                          headline:
                            "Diagnostic revenue artifact plus Ask Tether memory and workflow boosts.",
                          userGoal:
                            "Sales engagements export one-click historical leakage charts from prospect EHRs while clinicians query structured referral packets inside copilot UX.",
                          businessGoal:
                            "Compresses enterprise sales timelines by swapping slide decks with grounded data pulls already validated in Kentucky inbound interest.",
                        },
                        {
                          headline:
                            "Commercial velocity milestones for pilots and capital conversations.",
                          userGoal:
                            "Two or three workflows graduate from waived diagnostics into paid tiers while Forefront leadership signs a bounded pilot covenant.",
                          businessGoal:
                            "Demonstrates repeatable revenue pacing before pre-seed re-engage window and validates specialist pricing ladders ahead of louder MDVIP bargaining.",
                        },
                      ],
                    },
                    {
                      quarter: "Q3 2026",
                      subtitle: "ModMed deploys, intelligence groundwork, compliance lift",
                      commitments: [
                        {
                          headline:
                            "First ModMed-supported derm rollout after partner approvals.",
                          userGoal:
                            "Forefront locations receive Athena-equivalent fidelity on inbound packets with synapSYS-sanctioned authentication boundaries.",
                          businessGoal:
                            "We believe PE diligence tightens whenever the second EHR echoes Athena behavior because portfolio COOs ask for symmetrical proof across rollups.",
                        },
                        {
                          headline:
                            "Document parsing v2 with specialty-aware templates.",
                          userGoal:
                            "High-complexity specialties ingest labs, imaging breadcrumbs, and reason-for-refer snippets without rework queues.",
                          businessGoal:
                            "Supports rheumatology thirty-clinic inbound plus Florida Oncology scale conversations surfacing templating gaps early.",
                        },
                        {
                          headline:
                            "Month nine integration engineer focused on eCW plus parsing maintenance.",
                          userGoal:
                            "Loudoun security exceptions get a consistent owner accountable for regressions rather than founders context switching nightly.",
                          businessGoal:
                            "Preserves write-back SLA once 100 clinics land because IT reviews already demanded dedicated engineering coverage.",
                        },
                        {
                          headline:
                            "Layer 2 ingestion plane plus analytics schema groundwork.",
                          userGoal:
                            "Internal operators can replay referral histories for cohort benchmarking without brittle spreadsheets.",
                          businessGoal:
                            "De-risks predictive routing seed funding story by proving telemetry capture precedes flashy UI overlays.",
                        },
                        {
                          headline:
                            "First PE-signed package, expanded concierge footprint, directories past 2000 clinicians.",
                          userGoal:
                            "Portfolio leadership sees leakage dashboards sourced from unified intake while concierge networks ingest richer specialist coverage.",
                          businessGoal:
                            "Feeds ARR glide path toward eighteen-month eighteen-practice hurdle with diversified segment revenue, not lone hero pilots.",
                        },
                        {
                          headline:
                            "SOC 2 Type I program ignition with automated evidence capture.",
                          userGoal:
                            "Buyers reviewing InfoSec questionnaires receive deterministic answers sourced from tooling instead of improvised PDFs.",
                          businessGoal:
                            "Matches procurement expectations Loudoun surfaced during reviewer calls and unlocks payer-grade conversations earmarked for pre-seed close.",
                        },
                      ],
                    },
                  ] as const
                ).map((block) => (
                  <div key={block.quarter} className="relative pl-8">
                    <div
                      className="absolute bottom-0 left-[7px] top-8 w-px bg-memo-border"
                      aria-hidden
                    />
                    <div className="absolute left-0 top-2 flex h-4 w-4 items-center justify-center rounded-full border-2 border-memo-teal bg-memo-bg" />
                    <h3 className="font-serif text-2xl font-normal text-memo-navy">
                      {block.quarter}
                    </h3>
                    <p className="mt-1 font-sans text-sm font-medium text-memo-teal">
                      {block.subtitle}
                    </p>
                    <ul className="mt-6 space-y-6 text-sm leading-relaxed text-memo-text">
                      {block.commitments.map((item) => (
                        <li key={item.headline} className="relative pl-4">
                          <span className="absolute left-0 top-[0.55rem] h-1.5 w-1.5 rounded-full bg-memo-teal" />
                          <p className="font-semibold leading-snug text-memo-text">
                            {item.headline}
                          </p>
                          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-memo-teal">
                            User goal
                          </p>
                          <p className="mt-1">{item.userGoal}</p>
                          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-memo-teal">
                            Business goal
                          </p>
                          <p className="mt-1">{item.businessGoal}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-[80px] space-y-8 md:mt-[100px]">
              <SectionTitle
                id="discovery-work"
                kicker="UNDERSTANDING"
                title="Understand work parallel to engineering"
              />
              <Subhead>Q2 2026 discovery (ships alongside build)</Subhead>
              <Prose>
                <ul className="m-0 list-disc space-y-3 pl-5">
                  <li>
                    Run structured interviews with five or more MDVIP and
                    SignatureMD affiliated physicians on pricing sensitivity and
                    must-have modules before network-level contract negotiations
                    land.
                  </li>
                  <li>
                    Validate specialist pricing tiers ($99 / $249 / $299 / $499 /
                    $999) with three or more active pilot specialists, adjusting
                    based on willingness-to-pay signals captured in live usage.
                  </li>
                  <li>
                    Catalog product gaps exposed through Loudoun IT security
                    questionnaires so engineering responses become scoped tickets
                    instead of ad hoc email threads.
                  </li>
                </ul>
              </Prose>
              <Subhead>Q3 2026 discovery</Subhead>
              <Prose>
                <ul className="m-0 list-disc space-y-3 pl-5">
                  <li>
                    Interview three or more PE COOs to define operational
                    definitions of portfolio analytics before Layer 2 UI locks.
                  </li>
                  <li>
                    Research rheumatology and oncology referral packets to inform
                    document parsing v2 templates, driven by active pipeline
                    conversations with a 30-clinic rheumatology group and Florida
                    Oncology&apos;s 100 clinic footprint.
                  </li>
                  <li>
                    Segment behavioral differences between concierge, traditional
                    independent, and PE affiliated PCPs so routing heuristics stay
                    honest per cohort.
                  </li>
                </ul>
              </Prose>
            </section>

            <section className="mt-[80px] space-y-8 md:mt-[100px]">
              <SectionTitle
                id="deferred-scope"
                kicker="SCOPE CONTROL"
                title="Deferred and nice-to-have backlog"
              />
              <Prose>
                <p>
                  These threads stay visible for diligence but off the F&amp;F
                  critical path so execution energy stays on the closed referral
                  loop.
                </p>
                <ul className="m-0 list-disc space-y-3 pl-5">
                  <li>
                    <span className="font-semibold text-memo-text">
                      Epic via Redox.&nbsp;
                    </span>
                    Deferred to seed. Health system sales cycles do not justify
                    spend while F&amp;F and pre-seed focus on independent density.
                  </li>
                  <li>
                    <span className="font-semibold text-memo-text">
                      Native mobile app.&nbsp;
                    </span>
                    Deferred indefinitely. PCPs and MAs live on desktop hardware
                    inside clinics and have not asked for pocket workflows.
                  </li>
                  <li>
                    <span className="font-semibold text-memo-text">
                      Patient-facing portal.&nbsp;
                    </span>
                    Deferred. Agents handle SMS and voice outreach without asking
                    patients to maintain another login while trust accrues.
                  </li>
                  <li>
                    <span className="font-semibold text-memo-text">
                      Embedded SMART on FHIR surface inside athenaClinicals.&nbsp;
                    </span>
                    Deferred to months nine through twelve while standalone web
                    sessions carry the load.
                  </li>
                  <li>
                    <span className="font-semibold text-memo-text">
                      Multi-language patient communication.&nbsp;
                    </span>
                    Deferred. Initial DMV cohort skews English dominant and
                    translation vendors add compliance drag.
                  </li>
                  <li>
                    <span className="font-semibold text-memo-text">
                      Custom routing rules per practice.&nbsp;
                    </span>
                    Deferred to enterprise tier after default heuristics prove
                    stability.
                  </li>
                  <li>
                    <span className="font-semibold text-memo-text">
                      Specialist-facing performance benchmarking SKUs.&nbsp;
                    </span>
                    Deferred while specialists largely monetize inbound flow;
                    becomes paid intelligence in Layer&nbsp;2 once density proves
                    fair comparisons.
                  </li>
                </ul>
              </Prose>
            </section>

            {/* Risks */}
            <section className="mt-[80px] space-y-8 md:mt-[100px]">
              <SectionTitle
                id="risks"
                kicker="PART 9"
                title="Risks and open questions"
              />
              <div className="overflow-hidden rounded-lg border border-memo-border">
                {[
                  {
                    t: "Athena Platform Services pricing",
                    w: "Quote may land uneconomic for pre-seed.",
                    m: "$135K infra envelope holds Marketplace fees; contingency mapping lives in Capital plan unit economics.",
                  },
                  {
                    t: 'Redox "connection" definition',
                    w: "Per-practice vs per-EHR-type affects Series A economics.",
                    m: "Negotiate in writing now; if unfavorable at scale, evaluate Particle/HG or direct Epic work at Series A planning.",
                  },
                  {
                    t: "Enterprise sales cycle length",
                    w: "Concierge introductions convert quickly yet multi-specialty and PE deployments often add six or more months beyond a founder handshake.",
                    m: "Maintain eight to ten simultaneous enterprise pursuits so sequencing always stacks near-term closers, elevate founder or COO signers who shorten legal overlays, weaponize diagnostic ROI tooling (historical leakage pulls sourced from prospects) to shorten conviction cycles.",
                  },
                  {
                    t: "SOC 2 timeline",
                    w: "First audits often slip.",
                    m: "Start Month 2; Vanta/Drata; pilots can proceed below enterprise thresholds worst case.",
                  },
                  {
                    t: "Second pilot IT review",
                    w: "eCW pilot could stall.",
                    m: "Two backup eCW practices; security one-pager to avoid re-litigating objections.",
                  },
                  {
                    t: "Pre-seed investor timing",
                    w: "Institutional desks keep signaling too early despite warm relationships until KPIs crystallize.",
                    m: "Friends & Family runway concentrates on demonstrating three through five monetized practices with closed-loop proof, then re-opens General Catalyst caliber conversations armed with artifacts they flagged as absent during early reviews.",
                  },
                ].map((r, idx) => (
                  <div
                    key={r.t}
                    className={cn(
                      "border-b border-memo-border px-5 py-4 last:border-b-0",
                      idx % 2 === 0 ? "bg-memo-bg" : "bg-memo-warm"
                    )}
                  >
                    <p className="text-sm font-semibold text-memo-text">{r.t}</p>
                    <p className="mt-2 text-sm text-memo-text-secondary">
                      <span className="font-medium text-memo-text">Risk: </span>
                      {r.w}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-memo-text">
                      <span className="font-sans text-xs font-semibold uppercase tracking-[0.08em] text-memo-teal">
                        Mitigation:{" "}
                      </span>
                      {r.m}
                    </p>
                  </div>
                ))}
              </div>
              <Subhead>Open commercial questions</Subhead>
              <div className="grid gap-3 sm:grid-cols-2">
                <StatCard
                  label="Athena pricing"
                  value="End of Apr ’26 (est.)"
                  hint="Written quote drives write-back path."
                />
                <StatCard
                  label="Redox connection def."
                  value="In negotiation"
                  hint="Drives long-term cost / direct vs Redox split."
                />
                <StatCard
                  label="ModMed synapSYS"
                  value="Apr ’26 outreach"
                  hint="Sandbox ~14d; production 4-8 weeks post-sandbox typical."
                />
                <StatCard
                  label="eCW partner terms"
                  value="Mid-May (est.)"
                  hint="Loudoun activation post-IT clearance."
                />
              </div>
              <Subhead>Why Epic is deferred to Series A</Subhead>
              <Prose>
                <p>
                  Epic customer onboarding runs 6-12 months on the customer side.
                  Epic practices cannot typically sign with a new third-party vendor
                  and go live within a normal sales cycle because Epic&apos;s
                  enterprise IT review, security assessment, and integration
                  activation processes take half a year or longer even with strong
                  champions on the customer side. A seed plan that depends on Epic
                  revenue materializing in 18 months would be depending on a process
                  we do not control and cannot accelerate.
                </p>
                <p>
                  The wedge segments are not on Epic. Concierge PCP networks
                  cluster around Athena, eCW, and internal tools. PE-backed
                  dermatology rollups cluster around ModMed EMA. PE-backed
                  orthopedic and GI rollups are a mix of eCW, ModMed, and smaller
                  vendors. The segments where Tether&apos;s two-sided network
                  produces the most value are deliberately the segments that Epic
                  structurally excludes. Chasing Epic in the seed window would mean
                  chasing customers outside our wedge for integration reasons rather
                  than for market-fit reasons.
                </p>
                <p>
                  Epic is the natural Series A expansion. Once Tether has proven the
                  wedge with the three seed-window EHRs and has enough graph density
                  to make the Layer 2 intelligence genuinely valuable, Epic becomes
                  a demand-driven integration rather than a speculative one. Large
                  concierge networks that include Epic practices will pull us into
                  Epic, and the Series A budget can absorb the dedicated Epic
                  integration engineering required (roughly 2-3 months of one
                  engineer plus Redox production costs) without competing with the
                  Layer 1 buildout.
                </p>
                <p>
                  The honest framing for investors: Tether&apos;s wedge segments do
                  not meaningfully overlap with Epic&apos;s customer base in the seed
                  window. Concierge networks cluster around Athena, independent
                  multi-specialty groups around eCW, and PE-backed dermatology
                  around ModMed. By the time Tether has earned the right to chase
                  Epic-anchored health systems and large ACOs, the data graph from
                  the seed window will have made that conversation an inbound
                  demand-driven pull rather than a speculative outbound integration.
                  That is a market-segmentation bet, not a concession.
                </p>
                <p>
                  A prospect with a hard Epic dependency cannot be served until
                  Series A. We accept this tradeoff because the execution velocity
                  we gain in the seed window by not building an Epic integration is
                  worth more than the revenue we forgo by not serving Epic-gated
                  prospects. If the market tells us this is wrong, Epic moves earlier.
                </p>
              </Prose>
            </section>

            <footer className="mt-24 border-t border-memo-border-light pt-10 text-sm text-memo-text-secondary">
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-memo-text-tertiary">
                Tether Health · Confidential
              </p>
              <p className="mt-3 text-memo-text-secondary">
                Product roadmap &amp; capital plan · April 2026
              </p>
            </footer>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}
