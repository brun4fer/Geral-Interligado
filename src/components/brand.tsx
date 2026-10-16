import Link from "next/link";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="focus-ring inline-flex min-w-0 items-center gap-3 rounded-xl">
      <span className="grid size-11 place-items-center rounded-2xl border border-cyan/35 bg-cyan/10 text-sm font-black tracking-tight text-cyan shadow-glow">
        AP
      </span>
      {!compact && (
        <span className="min-w-0">
          <span className="block max-w-32 truncate text-xs font-bold tracking-wide text-white sm:max-w-none sm:text-sm">All-in-One Football Ecosystem</span>
          <span className="hidden text-[11px] text-[#82a19c] sm:block">Football intelligence hub</span>
        </span>
      )}
    </Link>
  );
}

