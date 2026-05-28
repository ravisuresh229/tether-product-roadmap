import type { ReactNode } from "react";

export function cn(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function PartLabel({ children }: { children: ReactNode }) {
  return (
    <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0D7377]">
      {children}
    </span>
  );
}

export function ProseField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
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

export function ExitCallout({
  children,
  className,
}: {
  children: ReactNode;
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

export function SectionTitle({
  id,
  kicker,
  title,
}: {
  id?: string;
  kicker?: string;
  title: string;
}) {
  return (
    <header id={id} className="mb-8 md:mb-10">
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

export function CalloutPanel({
  children,
  variant = "teal",
  className,
}: {
  children: ReactNode;
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

export function PullQuote({
  children,
  accent = "teal",
  thesisTint = false,
}: {
  children: ReactNode;
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

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[720px] space-y-6 text-base font-sans leading-[1.7] text-memo-text">
      {children}
    </div>
  );
}

export function StatCard({
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

export function Subhead({
  children,
  id,
}: {
  children: ReactNode;
  id?: string;
}) {
  return (
    <h3
      id={id}
      className={cn(
        "mt-12 font-sans text-[20px] font-semibold leading-snug tracking-tight text-memo-text md:text-[22px]",
        id && "scroll-mt-28"
      )}
    >
      {children}
    </h3>
  );
}

export function DataTable({
  headers,
  rows,
  className,
}: {
  headers: string[];
  rows: string[][];
  className?: string;
}) {
  return (
    <div className={cn("-mx-2 overflow-x-auto md:mx-0", className)}>
      <table className="min-w-[640px] w-full border-collapse border border-memo-border text-left text-xs text-memo-text md:text-sm">
        <thead className="bg-memo-bg font-semibold uppercase tracking-[0.05em] text-memo-text-secondary">
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="border border-memo-border px-3 py-2 align-top font-sans tracking-normal normal-case md:px-4"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="align-top">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={cn(
                    "border border-memo-border px-3 py-3 md:px-4",
                    j === 0 && "font-semibold"
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function matrixCellTone(cell: string): string {
  const v = cell.trim();
  if (v === "Yes") return "bg-memo-teal-light text-memo-text";
  if (v === "No") return "bg-memo-warm text-memo-text-secondary";
  if (v === "Partial") return "bg-memo-border-light text-memo-text";
  if (v.startsWith("Partial")) return "bg-memo-border-light text-memo-text";
  if (v === "Attempting") return "bg-memo-bg text-memo-text";
  return "";
}
