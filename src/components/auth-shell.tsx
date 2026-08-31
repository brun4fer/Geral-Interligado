import { Brand } from "@/components/brand";

export function AuthShell({
  eyebrow,
  title,
  description,
  children
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 sm:px-8">
      <div className="grid-noise pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col">
        <Brand />
        <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1.08fr_.92fr]">
          <section className="hidden max-w-xl lg:block">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-cyan">Um ecossistema. Uma entrada.</p>
            <h2 className="text-5xl font-semibold leading-[1.08] tracking-[-0.045em] text-white">
              Toda a análise de futebol, organizada num só lugar.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#8ba7a2]">
              Acede rapidamente a vídeo, golos, equipa e jogadores sem perder tempo a procurar cada ferramenta.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-3">
              {["Adversário", "Equipa", "Jogadores"].map((label, index) => (
                <div key={label} className="glass rounded-2xl p-4">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#66847f]">0{index + 1}</span>
                  <p className="mt-3 text-sm font-semibold text-white">{label}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="glass mx-auto w-full max-w-md rounded-[1.75rem] p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan">{eyebrow}</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-white">{title}</h1>
            <p className="mt-2 text-sm leading-6 text-[#8ba7a2]">{description}</p>
            <div className="mt-7">{children}</div>
          </section>
        </div>
      </div>
    </main>
  );
}

