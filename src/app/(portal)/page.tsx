import { ArrowDown, CheckCircle2, LayoutGrid } from "lucide-react";
import { CloudNote, ProductCard } from "@/components/product-card";
import { requireUser } from "@/lib/auth";
import { productGroups } from "@/lib/products";

export default async function DashboardPage() {
  const user = await requireUser();
  const available = productGroups.flatMap((group) => group.products).filter((product) => product.url).length;

  return (
    <main className="relative overflow-hidden px-5 pb-16 pt-9 sm:px-8 lg:px-10 lg:pt-12">
      <div className="grid-noise pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-60" />
      <div className="relative mx-auto max-w-[1500px]">
        <section className="glass relative overflow-hidden rounded-[1.75rem] px-6 py-8 sm:px-9 sm:py-10 lg:px-12 lg:py-12">
          <div className="absolute -right-20 -top-28 size-80 rounded-full bg-cyan/[0.06] blur-3xl" />
          <div className="relative grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-cyan">
                <LayoutGrid className="size-4" />
                Central de análise
              </div>
              <h1 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
                Escolhe o teu ponto de análise, {user.username}.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#8ba7a2] sm:text-base">
                Todos os softwares AP organizados pelo contexto de trabalho, do adversário aos teus jogadores.
              </p>
            </div>
            <div className="grid min-w-[270px] grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/[0.08] bg-black/10 p-4">
                <p className="text-2xl font-semibold text-white">{available}</p>
                <p className="mt-1 text-xs text-[#78938e]">softwares disponíveis</p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-black/10 p-4">
                <p className="truncate text-sm font-semibold text-white">{user.workspaceName}</p>
                <p className="mt-2 text-xs text-[#78938e]">workspace ativo</p>
              </div>
            </div>
          </div>
          <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-6">
            <CloudNote />
            <a href="#modulos" className="focus-ring inline-flex items-center gap-2 rounded-lg text-xs font-semibold text-[#a9bfbb] hover:text-white">
              Ver módulos <ArrowDown className="size-4" />
            </a>
          </div>
        </section>

        <div id="modulos" className="scroll-mt-28 space-y-12 pt-14">
          {productGroups.map((group) => (
            <section key={group.number} aria-labelledby={`group-${group.number}`}>
              <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div className="flex items-start gap-4">
                  <span className="mt-1 text-xs font-black tracking-[0.2em] text-[#64807a]">{group.number}</span>
                  <div>
                    <h2 id={`group-${group.number}`} className="text-2xl font-semibold tracking-[-0.035em] text-white">{group.title}</h2>
                    <p className="mt-1.5 text-sm text-[#78938e]">{group.description}</p>
                  </div>
                </div>
                {group.products.some((product) => product.url) && (
                  <span className="inline-flex items-center gap-2 text-xs text-emerald-200/75">
                    <CheckCircle2 className="size-4" /> Ferramentas ativas
                  </span>
                )}
              </div>
              <div className={`grid gap-4 ${group.products.length > 1 ? "md:grid-cols-2" : "md:grid-cols-2"}`}>
                {group.products.map((product) => (
                  <ProductCard key={product.label} product={product} accent={group.accent} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-16 flex flex-col justify-between gap-3 border-t border-white/[0.07] py-7 text-xs text-[#617b76] sm:flex-row">
          <span>AP Football Analysis · Central privada</span>
          <span>Cada software mantém os seus dados e aceita a identidade do portal.</span>
        </footer>
      </div>
    </main>
  );
}
