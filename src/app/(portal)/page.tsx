import { ArrowDown, Cloud, Network } from "lucide-react";
import { EcosystemMap } from "@/components/ecosystem-map";
import { requireUser } from "@/lib/auth";
import { getEcosystemAreas } from "@/lib/products";

export default async function DashboardPage() {
  const user = await requireUser();
  const areas = getEcosystemAreas();
  const availableUrls = new Set(
    areas.flatMap((area) => area.products).flatMap((product) => product.url ? [product.url] : []),
  );

  return (
    <main className="relative overflow-hidden px-5 pb-16 pt-9 sm:px-8 lg:px-10 lg:pt-12">
      <div className="grid-noise pointer-events-none absolute inset-x-0 top-0 h-[620px] opacity-60" />
      <div className="relative mx-auto max-w-[1500px]">
        <section className="glass relative overflow-hidden rounded-[1.75rem] px-6 py-8 sm:px-9 sm:py-10 lg:px-12 lg:py-12">
          <div className="absolute -right-20 -top-28 size-80 rounded-full bg-cyan/[0.06] blur-3xl" />
          <div className="relative grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-cyan">
                <Network className="size-4" />
                All-in-one football ecosystem
              </div>
              <h1 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
                Todo o futebol num único ponto, {user.username}.
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#8ba7a2] sm:text-base">
                Passa o rato sobre uma área — ou toca no telemóvel — para veres os softwares relacionados.
              </p>
            </div>
            <div className="grid min-w-[285px] grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/[0.08] bg-black/10 p-4">
                <p className="text-2xl font-semibold text-white">{availableUrls.size}</p>
                <p className="mt-1 text-xs text-[#78938e]">softwares ligados</p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-black/10 p-4">
                <p className="truncate text-sm font-semibold text-white">{user.workspaceName}</p>
                <p className="mt-2 text-xs text-[#78938e]">workspace ativo</p>
              </div>
            </div>
          </div>
          <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-6">
            <div className="flex items-center gap-2 text-xs text-[#78938e]">
              <Cloud className="size-4 text-cyan" />
              <span>Identidade e vídeos protegidos por workspace.</span>
            </div>
            <a href="#ecosystem" className="focus-ring inline-flex items-center gap-2 rounded-lg text-xs font-semibold text-[#a9bfbb] hover:text-white">
              Explorar ecossistema <ArrowDown className="size-4" />
            </a>
          </div>
        </section>

        <section id="ecosystem" className="scroll-mt-28 pt-14" aria-labelledby="ecosystem-title">
          <div className="mb-7 max-w-3xl">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan">Mapa de trabalho</p>
            <h2 id="ecosystem-title" className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">Escolhe o tema. O portal mostra as ferramentas.</h2>
          </div>
          <EcosystemMap areas={areas} />
        </section>

        <footer className="mt-16 flex flex-col justify-between gap-3 border-t border-white/[0.07] py-7 text-xs text-[#617b76] sm:flex-row">
          <span>AP Football Analysis · All-in-one football ecosystem</span>
          <span>Os módulos planeados aparecem sem ligação até estarem prontos.</span>
        </footer>
      </div>
    </main>
  );
}
