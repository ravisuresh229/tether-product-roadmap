"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  ChevronRight,
  Layers,
  Network,
  Shield,
} from "lucide-react";

const NAV: { id: string; label: string }[] = [
  { id: "executive-summary", label: "Executive summary" },
  { id: "architecture", label: "Three-layer architecture" },
  { id: "capital-ask", label: "Capital ask" },
  { id: "core-thesis", label: "Core thesis" },
  { id: "segments", label: "Segment analysis" },
  { id: "write-back", label: "Write-back requirement" },
  { id: "product", label: "Product architecture" },
  { id: "pricing", label: "Pricing model" },
  { id: "ehr", label: "EHR integration" },
  { id: "capital-plan", label: "Capital plan" },
  { id: "team", label: "Who ships it" },
  { id: "competition", label: "Competitive landscape" },
  { id: "execution", label: "Next 180 days" },
  { id: "risks", label: "Risks & open questions" },
];

function cn(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

function Mono({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-sky-300/90">
      {children}
    </span>
  );
}

function SectionTitle({
  id,
  eyebrow,
  title,
}: {
  id: string;
  eyebrow?: string;
  title: string;
}) {
  return (
    <header id={id} className="scroll-mt-28">
      {eyebrow ? (
        <p className="mb-3">
          <Mono>{eyebrow}</Mono>
        </p>
      ) : null}
      <h2 className="text-balance text-2xl font-medium tracking-tight text-zinc-50 md:text-3xl">
        {title}
      </h2>
    </header>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-14 border-l-2 border-sky-400/50 py-2 pl-6 md:my-20 md:pl-10">
      <p className="text-balance text-2xl font-medium leading-snug tracking-tight text-zinc-50 md:text-4xl md:leading-[1.15]">
        {children}
      </p>
    </blockquote>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-5 text-[17px] leading-relaxed text-zinc-400 md:text-[17px] md:leading-[1.7]">
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
    <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 px-4 py-4">
      <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <p className="mt-2 text-lg font-medium text-zinc-100">{value}</p>
      {hint ? (
        <p className="mt-2 text-sm leading-snug text-zinc-500">{hint}</p>
      ) : null}
    </div>
  );
}

function Subhead({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-12 text-lg font-medium tracking-tight text-zinc-100">
      {children}
    </h3>
  );
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-sky-500/25 selection:text-sky-100">
      {/* Mobile TOC */}
      <div className="sticky top-0 z-30 border-b border-zinc-800/80 bg-zinc-950/90 px-4 py-3 backdrop-blur-md lg:hidden">
        <label className="sr-only" htmlFor="memo-nav">
          Jump to section
        </label>
        <div className="mx-auto flex max-w-3xl items-center gap-2">
          <Layers className="h-4 w-4 shrink-0 text-zinc-500" aria-hidden />
          <select
            id="memo-nav"
            value={active}
            onChange={(e) => {
              const id = e.target.value;
              setActive(id);
              scrollTo(id);
            }}
            className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-200 outline-none ring-sky-500/40 focus:ring-2"
          >
            {NAV.map((n) => (
              <option key={n.id} value={n.id}>
                {n.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl gap-10 px-4 pb-24 pt-10 md:px-8 lg:gap-16 lg:pt-16">
        {/* Desktop TOC */}
        <aside className="relative hidden w-1/4 shrink-0 lg:block">
          <nav
            className="sticky top-10 max-h-[calc(100vh-3rem)] overflow-y-auto pr-2"
            aria-label="Table of contents"
          >
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              Contents
            </p>
            <ul className="space-y-1 border-l border-zinc-800">
              {NAV.map((item) => {
                const isActive = item.id === active;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => scrollTo(item.id)}
                      className={cn(
                        "group flex w-full items-start gap-2 py-1.5 pl-4 text-left text-sm transition-colors",
                        isActive
                          ? "text-sky-300"
                          : "text-zinc-500 hover:text-zinc-200"
                      )}
                    >
                      <ChevronRight
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0 transition-opacity",
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                        )}
                        aria-hidden
                      />
                      <span className="leading-snug">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-10 rounded-lg border border-zinc-800/80 bg-zinc-900/30 p-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                Doc
              </p>
              <p className="mt-2 text-sm text-zinc-300">
                Product roadmap &amp; capital plan — April 2026
              </p>
            </div>
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <article className="max-w-[70ch]">
            {/* Hero */}
            <header className="mb-16 md:mb-24">
              <div className="flex flex-wrap items-center gap-2 text-zinc-500">
                <Network className="h-4 w-4 text-sky-400/80" aria-hidden />
                <Mono>Tether Health</Mono>
              </div>
              <h1 className="mt-4 text-balance text-4xl font-medium tracking-tight text-white md:text-5xl">
                Product roadmap
                <span className="text-zinc-600"> &amp; </span>
                capital plan
              </h1>
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-zinc-400">
                Referrals are the wedge. Network intelligence is the moat.
                Headless EHR coordination is the platform.
              </p>
              <div className="mt-10 flex flex-col gap-2 border-t border-zinc-800/80 pt-8 font-mono text-xs text-zinc-500">
                <p>April 2026</p>
                <p>
                  Ravi Suresh, Co-Founder &amp; CTO · Sid Thakker, Co-Founder
                  &amp; CEO · Sach Thakker, Co-Founder &amp; CMO
                </p>
              </div>
            </header>

            <PullQuote>
              Healthcare&apos;s referral problem is not a document problem, a
              workflow problem, or an EHR problem. It is a graph problem — and
              the only way to build the graph is a platform that captures
              structured data from both sides of every referral, at the moment
              the referral is created, with stable patient identity across
              providers.
            </PullQuote>

            {/* Executive Summary */}
            <section className="space-y-8">
              <SectionTitle
                id="executive-summary"
                eyebrow="Part 0"
                title="Executive summary"
              />
              <Prose>
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
                  extends beyond referrals over time — into prior authorization,
                  scheduling, patient outreach, and care gap closure. Tennr and
                  Valerie each see one side of the transaction. Tether sees both
                  sides and the workflow between them.
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
                  referral that moves through it — and we need a lot of them in
                  the same place before the network matters at all. That density
                  is the moat.
                </p>
              </Prose>
            </section>

            {/* Architecture */}
            <section className="mt-20 space-y-8 md:mt-28">
              <SectionTitle
                id="architecture"
                eyebrow="Platform"
                title="The three-layer architecture"
              />
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/25 p-5">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Activity className="h-4 w-4 text-sky-400/90" />
                    <Mono>Layer 1</Mono>
                  </div>
                  <p className="mt-3 text-base font-medium text-zinc-100">
                    Referral coordination network
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                    Live → end of 2026. Two-sided referrals with EHR integration
                    on both ends. Athena is live in production; ModMed and eCW
                    in active integration; Epic deferred to Series A as a
                    deliberate market-segmentation choice.
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/25 p-5">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Network className="h-4 w-4 text-sky-400/90" />
                    <Mono>Layer 2</Mono>
                  </div>
                  <p className="mt-3 text-base font-medium text-zinc-100">
                    Network intelligence
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                    Q4 2026 → 2027. Predictive routing, completion scoring,
                    leakage detection, specialist quality scoring, portfolio
                    analytics. Architecture starts Month 9 of the seed window;
                    first surfaces ship Q1 2027; maturity by end of 2027.
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/25 p-5 md:col-span-1">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Shield className="h-4 w-4 text-sky-400/90" />
                    <Mono>Layer 3</Mono>
                  </div>
                  <p className="mt-3 text-base font-medium text-zinc-100">
                    Headless EHR coordination
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                    2027+. Autonomous agents operate across EHRs on coordination
                    work humans do today. Workflows initiate from the PCP&apos;s
                    EHR, execute across the network, and complete without anyone
                    opening Tether.
                  </p>
                </div>
              </div>
            </section>

            {/* Capital ask */}
            <section className="mt-20 space-y-8 md:mt-28">
              <SectionTitle
                id="capital-ask"
                eyebrow="Raise"
                title="The capital ask"
              />
              <Prose>
                <p>
                  Total 18-month requirement:{" "}
                  <span className="text-zinc-200">$985K</span> over two tranches
                  ($135K Friends &amp; Family followed by $850K pre-seed). This
                  capital ships production write-back on Athena, builds direct
                  adapters for ModMed and eCW, lands the first enterprise
                  contracts in each of three customer segments, and reaches the
                  seed-readiness bar of 15–20 paying practices with Layer 2
                  network data in customer use. Warm pipelines with Loudoun
                  Medical Group, Forefront Dermatology, and MDVIP are
                  time-sensitive; this capital converts them before they go cold.
                </p>
              </Prose>
              <div className="grid gap-3 sm:grid-cols-3">
                <StatCard
                  label="Friends & Family"
                  value="$135K"
                  hint="Month 1 close · $5M post-money cap (~2.7% dilution)"
                />
                <StatCard
                  label="Pre-seed"
                  value="$850K"
                  hint="Month 6–9 close · $10M post-money cap (~8.5% dilution)"
                />
                <StatCard
                  label="18-month milestone"
                  value="15–20 practices"
                  hint="~$800K–$1M ARR run-rate · 3 EHRs live · enterprise in each segment"
                />
              </div>
              <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/30 px-4 py-3 font-mono text-xs text-zinc-400">
                <span className="text-zinc-200">Total dilution</span> ~11.2%
                across both tranches for $985K total
              </div>
            </section>

            {/* Core thesis */}
            <section className="mt-20 space-y-8 md:mt-28">
              <SectionTitle
                id="core-thesis"
                eyebrow="Part 1"
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
                  fundamentally a document problem — faxes, scanned forms,
                  handwritten notes — and that a good enough vision-language
                  model solves it. This is the wrong frame. The documents are the
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
                  fundamentally a specialist front-office workflow problem — phone
                  intake, scheduling, follow-up, scanning, filing — and that
                  automating those workflows solves it. This is also wrong, for a
                  different reason.
                </p>
                <p>
                  Automating one office creates no cross-office value. A
                  specialist with perfect intake automation still doesn&apos;t
                  know which referrals from which PCPs convert at what rate. The
                  closure data still doesn&apos;t flow back to the referring
                  side. Workflow automation inside one office is a feature, not a
                  moat, because it has no compounding effect.
                </p>
              </Prose>

              <Subhead>1.3 Why it is not an EHR problem</Subhead>
              <Prose>
                <p>
                  Epic CareLink and every &quot;the built-in referral module is
                  just bad&quot; alternative implies a better referral feature
                  inside an existing EHR would solve the problem. EHRs are
                  single-tenant by design. A tool inside Epic only sees Epic. The
                  cross-EHR view the problem actually needs cannot exist inside
                  any single vendor.
                </p>
                <p>
                  Epic CareLink explicitly excludes practices that are not on
                  Epic. The patients whose referrals matter most — moving
                  between independent PCPs and PE specialty groups on different
                  EHRs — are exactly the population an EHR-internal tool cannot
                  serve.
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
                  EHRs see one tenant. Tennr and Valerie each see one side. The
                  absence of the graph is the actual disease — and incomplete
                  referrals, lost patients, poor coordination, leakage, and
                  broken loops are symptoms.
                </p>
              </Prose>

              <Subhead>1.5 The four constraints</Subhead>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    t: "Moment of creation",
                    d: "Capture at the workflow point where the referral is born — the only clean window is when the PCP decides to refer.",
                  },
                  {
                    t: "Structured data",
                    d: "Fields at creation, not documents parsed later. Extraction degrades; structure from the start is what makes the graph meaningful.",
                  },
                  {
                    t: "Both sides",
                    d: "Referring and receiving. Half the data is worthless — the joins answer “did this complete?”",
                  },
                  {
                    t: "Persistent patient identity",
                    d: "Same human across EHRs. Cross-EHR identity resolution turns edges into a coherent graph.",
                  },
                ].map((x) => (
                  <div
                    key={x.t}
                    className="rounded-lg border border-zinc-800/90 bg-zinc-900/35 p-4"
                  >
                    <p className="font-mono text-[11px] uppercase tracking-wide text-sky-300/85">
                      {x.t}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      {x.d}
                    </p>
                  </div>
                ))}
              </div>

              <Subhead>1.6 The lock-in mechanism</Subhead>
              <Prose>
                <p>
                  Every referral serves the patient, serves the practices — and
                  feeds the graph invisibly at adoption. By the time practices
                  notice the graph has value, switching means losing intelligence
                  that compounds with every referral. The switching cost is not
                  moving tools; it&apos;s losing months of intelligence their own
                  data generated.
                </p>
              </Prose>

              <Subhead>1.7 Racing time, not competitors</Subhead>
              <Prose>
                <p>
                  Pivoting to a two-sided graph model would force well-funded
                  incumbents to rebuild from scratch — an unnatural motion once
                  architecture and GTM are committed. The real race is graph
                  density in wedge segments before another two-sided platform
                  enters from scratch. The $985K isn&apos;t to beat Tennr on
                  features; it&apos;s to buy speed to lock the network before the
                  market realizes documents and workflows are the wrong game.
                </p>
              </Prose>
            </section>

            {/* Segments */}
            <section className="mt-20 space-y-10 md:mt-28">
              <SectionTitle
                id="segments"
                eyebrow="Part 2"
                title="Segment analysis"
              />
              <Prose>
                <p>
                  The TAM for healthcare referral coordination is the wrong
                  starting number. The right question is which segments produce
                  dense referral connections that generate the graph — while
                  having the worst workarounds, highest willingness to pay, and
                  most accessible buyer.
                </p>
              </Prose>

              <div className="space-y-6">
                {[
                  {
                    tag: "Segment A",
                    title: "Concierge-affiliated independent PCPs",
                    ex: "MDVIP (1,100+ physicians), SignatureMD, Castle Connolly PHP, Specialdocs, PartnerMD.",
                    pain: "Concierge physicians promise coordinated specialist access. Reality: MAs spend 15–30 minutes per referral on manual coordination; the loop rarely closes cleanly — existential brand risk.",
                    gap: "Coordination is the product patients pay for — and it’s broken. Pure greenfield.",
                    access:
                      "Warm: MDVIP pilot (DC); SignatureMD to exec leadership. Network contracts unlock 300–1,100+ physicians.",
                  },
                  {
                    tag: "Segment B",
                    title: "Independent multi-specialty groups",
                    ex: "Loudoun Medical Group (100 clinics, 300 providers), Inova-affiliated independents, Privia partner groups.",
                    pain: "Internal referrals across dozens of specialties/locations without unified visibility. Fax workflows; leakage invisible until quarterly finance.",
                    gap: "Leakage recovery + internal referral optimization. Physician-owner boards buy ROI.",
                    access:
                      "Warm: Loudoun in IT security review; one contract deploys 100 clinics / 300 providers.",
                  },
                  {
                    tag: "Segment C",
                    title: "PE-backed specialty networks",
                    ex: "Forefront Dermatology (170+ locations), USDP, Schweiger, EyeCare Partners, ortho/GI rollups.",
                    pain: "50–200+ locations; no unified inbound referral processing; portfolio COO lacks cross-location analytics.",
                    gap: "Tennr/Valerie are single-sided at the specialist. Tether adds referring-side context + portfolio intelligence.",
                    access:
                      "Warm via Forefront; broader PE network via investor/operator intros.",
                  },
                ].map((s) => (
                  <div
                    key={s.tag}
                    className="rounded-xl border border-zinc-800 bg-zinc-900/20 p-6"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <Mono>{s.tag}</Mono>
                      <span className="text-xs text-zinc-600">{s.ex}</span>
                    </div>
                    <h3 className="mt-3 text-xl font-medium text-zinc-50">
                      {s.title}
                    </h3>
                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                          Pain
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                          {s.pain}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                          Gap / wedge
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                          {s.gap}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                          Access
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                          {s.access}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Prose>
                <p>
                  Running all three segments is sustainable because the same
                  product serves each and each has a warm entry point.
                  Sequencing follows integration readiness: concierge via MDVIP +
                  Athena write-back; Loudoun + eCW; Forefront + ModMed. CAC
                  works because contracts deploy 30–300 providers — not one at a
                  time.
                </p>
              </Prose>
            </section>

            {/* Write-back */}
            <section className="mt-20 space-y-6 md:mt-28">
              <SectionTitle
                id="write-back"
                eyebrow="Non-negotiable"
                title="The write-back requirement"
              />
              <PullQuote>
                A read-only product that still requires manual entry is strictly
                worse in the loop-closure dimension — practices adopt for read
                benefits and churn when closure never arrives.
              </PullQuote>
              <Prose>
                <p>
                  Providers will not adopt something worse than current workflow
                  in any dimension. Their workflow already includes manual
                  write-back (the MA types the consult note). The wedge must
                  include write-back from day one; every integration decision in
                  Part 4 follows.
                </p>
              </Prose>
            </section>

            {/* Product */}
            <section className="mt-20 space-y-8 md:mt-28">
              <SectionTitle
                id="product"
                eyebrow="Part 3"
                title="Product architecture"
              />
              <Prose>
                <p>
                  Each layer has a clear value proposition, segment focus, build
                  list, and exit state — prerequisite-ordered and funded by
                  prior-layer revenue. Operating spec, not marketing story.
                </p>
              </Prose>

              <Subhead>3.1 Layer 1 — coordination + write-back</Subhead>
              <Prose>
                <p>
                  <span className="text-zinc-200">Timeline:</span> Live now → end
                  of 2026. Two-sided referrals with EHR integration on both
                  ends: structured package out, specialist processing, consult
                  notes back to the PCP chart automatically.
                </p>
                <p>
                  <span className="text-zinc-200">Production status:</span>{" "}
                  Athena read-only FHIR live with BAA; write-back via Platform
                  Services in negotiation; specialist directory 1,200+ providers /
                  13+ specialties (DMV); Ask Tether operational; structured
                  referral assembly end-to-end; second pilot (eCW, 100 clinics)
                  in IT review.
                </p>
              </Prose>
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/25 p-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                  Build items to complete Layer 1
                </p>
                <ul className="mt-3 space-y-2 text-sm text-zinc-400">
                  {[
                    "Athena write-back via Platform Services",
                    "ModMed EMA via synapSYS (derm PE)",
                    "eCW write-back via partner program",
                    "Multi-location deployment tooling (5–300 providers / operator)",
                    "Document parsing agent → structured EHR push",
                    "Loop closure agent on visit completion → automatic write-back",
                  ].map((x) => (
                    <li key={x} className="flex gap-2">
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Prose>
                <p>
                  <span className="text-zinc-200">Exit state (end of 2026):</span>{" "}
                  15–20 paying practices across segments; ~$800K–$1M ARR default
                  (or ~$300K downside if Athena pricing stalls / pilots slip).
                  Athena, ModMed, eCW live; closure data proves the wedge.
                </p>
              </Prose>

              <Subhead>3.2 Layer 2 — network intelligence</Subhead>
              <Prose>
                <p>
                  Predictive routing, completion scoring, leakage detection,
                  portfolio analytics, specialist quality scoring from outcomes —
                  impossible without cross-provider data from a two-sided
                  network. Prerequisite: meaningful volume (~5,000+ referrals/mo
                  across 30+ practices).
                </p>
                <p>
                  Patient portal v1 is intentionally narrow: read-only referral
                  history, consult notes, upcoming appointments — no
                  patient-initiated messaging in v1 (regulatory / support
                  sequencing).
                </p>
                <p>
                  <span className="text-zinc-200">Exit (end of 2027):</span> 50+
                  practices; ~$2.5M ARR; intelligence visible in product; PE
                  paying for portfolio analytics; portal v1 in concierge
                  networks; Series A closed.
                </p>
              </Prose>

              <Subhead>3.3 Layer 3 — headless coordination</Subhead>
              <Prose>
                <p>
                  Not a capital commitment in the 18-month plan — included to
                  show where Layers 1–2 accumulate. Agents across EHRs handle                  referrals, prior auth, scheduling, outreach, care gaps; events
                  originate in the PCP EHR; results write back; users never log
                  into Tether.
                </p>
              </Prose>
            </section>

            {/* Pricing */}
            <section className="mt-20 space-y-8 md:mt-28">
              <SectionTitle
                id="pricing"
                eyebrow="Part 4"
                title="Pricing model"
              />
              <Prose>
                <p>
                  Specialists pay usage-based monthly tiers tied to inbound
                  referral volume. PCPs are free at the practice level under most
                  structures, with optional analytics sold at the network level —
                  aligning revenue to delivered value and removing expansion
                  friction.
                </p>
              </Prose>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  ["Starter", "0–10", "$99", "Directory + receive"],
                  ["Active", "11–30", "$249", "Dashboard + analytics"],
                  ["Growth", "31–75", "$299", "Priority directory + EHR sync"],
                  ["High volume", "76–150", "$499", "Analytics suite + onboarding"],
                  ["Network", "150+", "$999", "Enterprise analytics + API"],
                ].map(([tier, vol, price, cap]) => (
                  <div
                    key={tier}
                    className="rounded-lg border border-zinc-800/90 bg-zinc-900/30 p-4"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="font-mono text-[11px] uppercase tracking-wide text-sky-300/90">
                        {tier}
                      </p>
                      <p className="text-sm text-zinc-500">{vol}/mo</p>
                    </div>
                    <p className="mt-2 text-2xl font-medium text-white">
                      {price}
                      <span className="text-base font-normal text-zinc-500">
                        /mo
                      </span>
                    </p>
                    <p className="mt-2 text-sm text-zinc-500">{cap}</p>
                  </div>
                ))}
              </div>
              <Prose>
                <p>
                  Auto-upgrade tiers as volume grows — a specialist moving
                  Starter → Network over 18 months can mean ~10× ACV with no new
                  sales motion. A 30-provider PE network averaging Growth
                  (~$299/mo/location) is ~$108K ARR from one contract.
                </p>
                <p>
                  Concierge: default enterprise contract at network operator
                  level (unlimited PCP access + analytics); alternative free PCP
                  access with paid analytics to owners — keeps demand-side
                  friction at zero.
                </p>
              </Prose>
            </section>

            {/* EHR */}
            <section className="mt-20 space-y-8 md:mt-28">
              <SectionTitle
                id="ehr"
                eyebrow="Part 5"
                title="EHR integration strategy"
              />
              <Prose>
                <p>
                  Direct-first in the seed window for Athena, ModMed, and eCW —
                  warm customers, accessible partner programs, preserved                  economics. Redox enters at Series A for Epic, Cerner, and
                  long-tail where direct partnership is slow or unavailable.
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
                  also unlocks Marketplace distribution (160k+ providers) —
                  middleware routing doesn&apos;t qualify.
                </p>
                <p>
                  <span className="text-zinc-200">Redox:</span> scoped; seed
                  window cost $0 (not activated). Illustrative later-year costs:
                  ~$50K Y2 (2–4 production connections), ~$135K Y3 (Epic +
                  long-tail, 8–15 connections) — ~$160K cumulative over 3 years
                  when activated post-raise. Connection definition (per-practice
                  vs per-EHR-type) is the key commercial term — negotiated before
                  production commitment.
                </p>
              </Prose>
            </section>

            {/* Capital plan */}
            <section className="mt-20 space-y-8 md:mt-28">
              <SectionTitle
                id="capital-plan"
                eyebrow="Part 6"
                title="Capital plan"
              />
              <Prose>
                <p>
                  The ask comes from the roadmap. Target investors: mid-Atlantic
                  healthcare-savvy angels, healthcare seed funds, operator-led
                  SPVs — people who&apos;ve shipped ambulatory software and
                  understand why this integration scope is defensible.
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
                    className="rounded-lg border border-zinc-800/90 bg-zinc-900/25 p-4"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                      {String(cat)} · {String(pct)}
                    </p>
                    <p className="mt-2 text-xl font-medium text-white">
                      {String(amt)}
                    </p>
                    <p className="mt-2 text-sm leading-snug text-zinc-500">
                      {String(purpose)}
                    </p>
                  </div>
                ))}
              </div>
              <Subhead>Two-tranche detail</Subhead>
              <Prose>
                <p>
                  <span className="text-zinc-200">F&amp;F ($135K):</span> Athena
                  Platform Services write-back live; first closed-loop referral;
                  Stedi eligibility; document parsing v1; Ask Tether memory +
                  richer agents. Milestones include loop closure at Lefevre,
                  Loudoun eCW pilot contingent on IT, Forefront ModMed pilot
                  advanced, 3–5 paying practices, Marketplace listing in motion.
                </p>
                <p>
                  <span className="text-zinc-200">Pre-seed ($850K):</span>{" "}
                  Integration engineer at Month 9; eCW write-back + Layer 2
                  groundwork; ModMed deployment; SOC 2 Type I; enterprise
                  pipeline across all segments; Supabase HIPAA Team when BAA
                  requires. Milestones: 15–20 practices, ~$800K–$1M ARR, 3 EHRs
                  live, enterprise contract in each segment, Layer 2 data in
                  early use, seed conversations active.
                </p>
              </Prose>
              <Subhead>Largest line items (why they matter)</Subhead>
              <div className="space-y-3 text-sm leading-relaxed text-zinc-400">
                <p>
                  <span className="font-mono text-sky-300/90">$442K</span>{" "}
                  founding team: ships Layer 1 integrations, agents, first
                  contracts; below-market comp stretches runway.
                </p>
                <p>
                  <span className="font-mono text-sky-300/90">$100K</span>{" "}
                  integration engineer: without Month 9 hire, eCW slips past
                  Month 12; ~$50–100K ARR at risk from a Q4&apos;26 eCW
                  customer.
                </p>
                <p>
                  <span className="font-mono text-sky-300/90">$135K</span> EHR +
                  infra: direct programs + inference + cloud + Stedi; Redox
                  deferred until Series A economics match Epic/Cerner expansion.
                </p>
                <p>
                  <span className="font-mono text-sky-300/90">$120K</span>{" "}
                  compliance/IP: SOC 2 gates the 5–10× ACV jumps; patent sequence
                  protects Layer 2 routing/intelligence moat.
                </p>
              </div>
            </section>

            {/* Team */}
            <section className="mt-20 space-y-6 md:mt-28">
              <SectionTitle id="team" eyebrow="Operators" title="Who ships the roadmap" />
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    name: "Ravi Suresh",
                    role: "Co-Founder & CTO",
                    body: "Product, platform architecture, EHR integrations, vendor + IT comms. Built production Athena FHIR (read today; write-back negotiating), agents, HIPAA infra, 1,200+ directory, diagnostic sales tool — ~3 months part-time while employed. Former IU med student.",
                  },
                  {
                    name: "Sid Thakker",
                    role: "Co-Founder & CEO",
                    body: "PE specialty + concierge BD, modeling, capital. Originated MDVIP + Forefront from cold — now active pilots/pipeline. Ex CapM IB; Level Equity growth equity. UPenn economics.",
                  },
                  {
                    name: "Sach Thakker",
                    role: "Co-Founder & CMO",
                    body: "Clinical partnerships, pilot onboarding, network growth, credibility. Insight from referral failures in training. Georgetown MS4 (May ’26); MedStar intern year (July ’26) — execution structured around clinical schedule.",
                  },
                ].map((p) => (
                  <div
                    key={p.name}
                    className="rounded-xl border border-zinc-800 bg-zinc-900/20 p-5"
                  >
                    <p className="text-base font-medium text-zinc-50">
                      {p.name}
                    </p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-zinc-500">
                      {p.role}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>
              <Prose>
                <p>
                  Ravi owns all technical/integration execution end-to-end; Sid
                  and Sach own outbound, pilots, sales materials, investor
                  outreach, and contract follow-through. Roadmap decisions are
                  joint; day-to-day doesn&apos;t require three founders in every
                  room — required to ship this aggressively on this budget.
                </p>
              </Prose>
            </section>

            {/* Competition */}
            <section className="mt-20 space-y-8 md:mt-28">
              <SectionTitle
                id="competition"
                eyebrow="Part 7"
                title="Competitive landscape"
              />
              <div className="space-y-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                  Capability matrix
                </p>
                <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
                  <div className="min-w-[36rem] rounded-xl border border-zinc-800 overflow-hidden">
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
                          "grid grid-cols-6 gap-2 border-b border-zinc-800/80 px-3 py-2.5 text-xs md:text-sm",
                          i === 0
                            ? "bg-zinc-900/60 font-mono uppercase tracking-wider text-[10px] text-zinc-500"
                            : "text-zinc-400"
                        )}
                      >
                        {row.map((cell, j) => (
                          <div
                            key={j}
                            className={cn(
                              "min-w-0 break-words",
                              j === 0
                                ? "text-zinc-300"
                                : "text-center md:text-left"
                            )}
                          >
                            {cell}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-zinc-600">
                  Horizontal scroll on narrow viewports; grid layout instead of a
                  HTML table.
                </p>
              </div>
              <Prose>
                <p>
                  <span className="text-zinc-200">Tennr (~$101M):</span>{" "}
                  document-first, specialist-side; Network is bolt-on. Becoming
                  two-sided implies different GTM, surface, and data model —
                  structured referrals erode their engine. Charging specialists for
                  intake creates incentive conflict vs. Tether&apos;s demand-side
                  free model.
                </p>
                <p>
                  <span className="text-zinc-200">Valerie (~$39M):</span>{" "}
                  workflow inside the specialist office — no referring-side
                  relationship; can complement Tether at a location (intake vs.
                  portfolio intelligence) but cannot capture PE-level cross-portfolio
                  data without a rebuild.
                </p>
                <p>
                  <span className="text-zinc-200">Locata (YC S25):</span> PCP-side
                  automation — inverse of Tennr/Valerie; no specialist graph.
                </p>
                <p>
                  <span className="text-zinc-200">Saffron (YC):</span> FQHC/rural
                  VBC lane — different accounts in the seed window; same
                  structural ceiling without specialist-side edges.
                </p>
              </Prose>
              <Subhead>Why now</Subhead>
              <div className="grid gap-3 md:grid-cols-3">
                <StatCard
                  label="FHIR R4 maturity"
                  value="2023–2025"
                  hint="Athena, eCW, ModMed expose structured APIs at levels unavailable when earlier entrants started."
                />
                <StatCard
                  label="PE rollups"
                  value="Critical mass"
                  hint="Derm/ortho/GI scale where portfolio analytics became a buying criterion."
                />
                <StatCard
                  label="Agents"
                  value="2024–2025"
                  hint="Reliable tool use + structured clinical workflows unlock Layer 3 feasibility."
                />
              </div>
            </section>

            {/* Execution */}
            <section className="mt-20 space-y-8 md:mt-28">
              <SectionTitle
                id="execution"
                eyebrow="Part 8"
                title="Execution plan: next 180 days"
              />
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/20 p-6">
                  <Mono>Q2 2026 · Ship the wedge</Mono>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-400">
                    {[
                      "Athena write-back live at Lefevre; first closed-loop referral",
                      "Loop closure agent + document parsing v1",
                      "ModMed dev complete by end of M5; Stedi live; Telnyx SMS",
                      "Diagnostic sales tool + Ask Tether upgrades (memory, workflows, matching)",
                      "Commercial: 2–3 paying practices via diagnostic; Forefront → signed pilot; pre-seed conversations",
                    ].map((x) => (
                      <li key={x} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sky-400/80" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/20 p-6">
                  <Mono>Q3 2026 · ModMed + PE + hire</Mono>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-400">
                    {[
                      "ModMed shipped to first derm customer post-approval",
                      "Parsing v2 with specialty templates + quality loops",
                      "Integration engineer onboarded M9 → owns eCW write-back + parsing maintenance",
                      "Layer 2 groundwork: data model + ingestion pipeline",
                      "First PE contract signed; second concierge operator active; directory 2,000+",
                      "SOC 2 kickoff; Vanta/Drata deployed",
                    ].map((x) => (
                      <li key={x} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sky-400/80" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Risks */}
            <section className="mt-20 space-y-8 md:mt-28">
              <SectionTitle
                id="risks"
                eyebrow="Part 9"
                title="Risks and open questions"
              />
              <div className="space-y-4">
                {[
                  {
                    t: "Athena Platform Services pricing",
                    w: "Quote may land uneconomic for pre-seed.",
                    m: "$40K envelope; if above, route write-back via Redox (~$25K first connection per April scoping). Either path ships in F&F window.",
                  },
                  {
                    t: "Redox “connection” definition",
                    w: "Per-practice vs per-EHR-type affects Series A economics.",
                    m: "Negotiate in writing now; if unfavorable at scale, evaluate Particle/HG or direct Epic work at Series A planning.",
                  },
                  {
                    t: "PE procurement",
                    w: "Operator-led fast buys assumed; formal procurement extends cycles 6+ months.",
                    m: "Target founder/CMO/COO signers; diagnostic ROI artifact for procurement-heavy orgs.",
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
                ].map((r) => (
                  <div
                    key={r.t}
                    className="rounded-lg border border-zinc-800/90 bg-zinc-900/25 p-4"
                  >
                    <p className="font-mono text-[11px] uppercase tracking-wide text-sky-300/90">
                      {r.t}
                    </p>
                    <p className="mt-2 text-sm text-zinc-500">
                      <span className="text-zinc-400">Risk: </span>
                      {r.w}
                    </p>
                    <p className="mt-2 text-sm text-zinc-400">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600">
                        Mitigation ·{" "}
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
                  hint="Sandbox ~14d; production 4–8w post-sandbox typical."
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
                  Epic onboarding routinely runs 6–12 months — a poor dependency
                  for an 18-month seed plan. Wedge segments cluster on Athena,
                  eCW, and ModMed — not Epic. After wedge proof and graph
                  density, Epic becomes demand-driven (large networks pull us in)
                  with Series A budget for engineering + Redox costs. Tradeoff
                  accepted: hard Epic dependencies wait — velocity in seed window
                  is worth more than speculative Epic revenue. If the market
                  disagrees, Epic moves earlier.
                </p>
              </Prose>
            </section>

            <footer className="mt-24 border-t border-zinc-800/80 pt-10 text-sm text-zinc-600">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-700">
                Tether Health · Confidential
              </p>
              <p className="mt-3">
                Product roadmap &amp; capital plan · April 2026
              </p>
            </footer>
          </article>
        </main>
      </div>
    </div>
  );
}
