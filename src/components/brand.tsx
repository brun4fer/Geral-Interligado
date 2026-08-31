import Link from "next/link";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="focus-ring inline-flex items-center gap-3 rounded-xl">
      <span className="grid size-11 place-items-center rounded-2xl border border-cyan/35 bg-cyan/10 text-sm font-black tracking-tight text-cyan shadow-glow">
        AP
      </span>
      {!compact && (
        <span>
          <span className="block text-sm font-bold tracking-wide text-white">AP Football Analysis</span>
          <span className="block text-[11px] text-[#82a19c]">Analysis intelligence hub</span>
        </span>
      )}
    </Link>
  );
}

