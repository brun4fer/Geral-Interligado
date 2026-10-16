import { EcosystemMap } from "@/components/ecosystem-map";
import { getEcosystemAreas } from "@/lib/products";

export default function DashboardPage() {
  const areas = getEcosystemAreas();

  return (
    <main className="relative overflow-hidden px-5 pb-16 pt-8 sm:px-8 lg:px-10 lg:pt-10">
      <div className="grid-noise pointer-events-none absolute inset-x-0 top-0 h-[620px] opacity-60" />
      <div className="relative mx-auto max-w-[1500px]">
        <section id="ecosystem" aria-label="All-in-One Football Ecosystem">
          <EcosystemMap areas={areas} />
        </section>

        <footer className="mt-16 flex flex-col justify-between gap-3 border-t border-white/[0.07] py-7 text-xs text-[#617b76] sm:flex-row">
          <span>All-in-One Football Ecosystem</span>
          <span>Os módulos planeados aparecem sem ligação até estarem prontos.</span>
        </footer>
      </div>
    </main>
  );
}
