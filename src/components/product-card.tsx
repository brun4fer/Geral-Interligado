import { Activity, ArrowUpRight, ChartNoAxesCombined, Cloud, Goal, Map, Radio, Users, Video } from "lucide-react";
import type { Product, ProductGroup } from "@/lib/products";

const accentStyles: Record<ProductGroup["accent"], { line: string; icon: string; label: string }> = {
  cyan: { line: "bg-[#55ddeb]", icon: "border-[#55ddeb]/25 bg-[#55ddeb]/10 text-[#78e7f1]", label: "text-[#78e7f1]" },
  violet: { line: "bg-[#aa8cff]", icon: "border-[#aa8cff]/25 bg-[#aa8cff]/10 text-[#bda8ff]", label: "text-[#bda8ff]" },
  mint: { line: "bg-[#3ee6a8]", icon: "border-[#3ee6a8]/25 bg-[#3ee6a8]/10 text-[#65edba]", label: "text-[#65edba]" },
  amber: { line: "bg-[#f6b94f]", icon: "border-[#f6b94f]/25 bg-[#f6b94f]/10 text-[#f8c86f]", label: "text-[#f8c86f]" },
  rose: { line: "bg-[#fb7185]", icon: "border-[#fb7185]/25 bg-[#fb7185]/10 text-[#fb91a0]", label: "text-[#fb91a0]" }
};

const icons = {
  video: Video,
  goal: Goal,
  users: Users,
  chart: ChartNoAxesCombined,
  map: Map,
  live: Radio
};

export function ProductCard({ product, accent }: { product: Product; accent: ProductGroup["accent"] }) {
  const Icon = icons[product.icon];
  const styles = accentStyles[accent];
  const available = Boolean(product.url);

  const content = (
    <>
      <span className={`absolute inset-x-0 top-0 h-px opacity-0 transition group-hover:opacity-100 ${styles.line}`} />
      <div className="flex items-start justify-between gap-4">
        <span className={`grid size-11 shrink-0 place-items-center rounded-2xl border ${styles.icon}`}>
          <Icon className="size-5" />
        </span>
        <span className={`rounded-lg border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${available ? "border-emerald-300/15 bg-emerald-300/[0.07] text-emerald-200" : "border-white/10 bg-white/[0.035] text-[#718b86]"}`}>
          {available ? "Disponível" : "Em desenvolvimento"}
        </span>
      </div>
      <div className="mt-7">
        <p className={`text-[10px] font-black tracking-[0.22em] ${styles.label}`}>{product.label}</p>
        <h3 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-white">{product.title}</h3>
        <p className="mt-3 min-h-[48px] text-sm leading-6 text-[#829d98]">{product.description}</p>
      </div>
      <div className="mt-7 flex items-center justify-between border-t border-white/[0.07] pt-5">
        <span className={`text-sm font-semibold ${available ? "text-white" : "text-[#647d78]"}`}>
          {available ? "Abrir software" : "Brevemente"}
        </span>
        {available ? <ArrowUpRight className="size-[18px] text-cyan transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /> : <Activity className="size-[18px] text-[#536c67]" />}
      </div>
    </>
  );

  const className = "group relative block overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0b1b18]/80 p-5 shadow-glow transition duration-200 hover:-translate-y-0.5 hover:border-white/[0.18] hover:bg-[#0e211e] sm:p-6";

  return available ? (
    <a href={product.url} target="_blank" rel="noreferrer" className={`focus-ring ${className}`}>
      {content}
    </a>
  ) : (
    <div className={`${className} cursor-default opacity-80`}>{content}</div>
  );
}

export function CloudNote() {
  return (
    <div className="flex items-center gap-2 text-xs text-[#78938e]">
      <Cloud className="size-4 text-cyan" />
      <span>Os vídeos partilhados continuam protegidos por workspace.</span>
    </div>
  );
}

