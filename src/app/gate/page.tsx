type GateSearchParams = { from?: string; error?: string };

export default async function GatePage({
  searchParams,
}: {
  searchParams: Promise<GateSearchParams>;
}) {
  const sp = await searchParams;
  const from = sp.from && sp.from.startsWith("/") && !sp.from.startsWith("//")
    ? sp.from
    : "/";
  const showError = sp.error === "1";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-memo-bg px-5 py-16 font-sans text-memo-text">
      <div className="w-full max-w-sm rounded-lg border border-memo-border bg-memo-warm p-8 shadow-[var(--memo-shadow)]">
        <h1 className="font-sans text-lg font-semibold text-memo-navy">
          Tether roadmap
        </h1>
        <p className="mt-2 text-sm text-memo-text-secondary">
          Enter the password to continue.
        </p>
        {showError ? (
          <p className="mt-3 text-sm text-memo-coral" role="alert">
            Invalid password. Try again.
          </p>
        ) : null}
        <form
          className="mt-6 space-y-4"
          action="/api/auth/roadmap"
          method="post"
        >
          <input type="hidden" name="from" value={from} />
          <label className="block">
            <span className="sr-only">Password</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-memo-border bg-memo-bg px-3 py-2.5 text-sm text-memo-text outline-none focus:border-[#0D7377] focus:ring-2 focus:ring-[#0D7377]/20"
              placeholder="Password"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-lg bg-[#0D7377] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#095456]"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
