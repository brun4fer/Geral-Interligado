import Link from "next/link";
import { redirect } from "next/navigation";
import { registerAction } from "@/actions/auth";
import { AuthShell } from "@/components/auth-shell";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

const messages: Record<string, string> = {
  workspace: "O nome do workspace deve ter entre 2 e 120 caracteres.",
  username: "O username deve ter 3 a 40 letras, números ou os caracteres . _ -",
  password: "A password deve ter pelo menos 10 caracteres e as duas entradas devem coincidir.",
  taken: "Este username já está a ser utilizado."
};

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await getCurrentUser()) redirect("/");
  const { error } = await searchParams;

  return (
    <AuthShell eyebrow="Novo workspace" title="Criar conta" description="Cada conta fica num workspace privado e independente dentro do portal.">
      {error && (
        <p className="mb-5 rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-100">
          {messages[error] ?? "Não foi possível criar a conta."}
        </p>
      )}
      <form action={registerAction} className="space-y-4">
        <label className="block space-y-2 text-sm text-[#b8cbc7]">
          <span>Nome do workspace</span>
          <input name="workspaceName" required minLength={2} maxLength={120} className="focus-ring h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-white placeholder:text-[#526d68]" placeholder="Ex.: CD Feirense" />
        </label>
        <label className="block space-y-2 text-sm text-[#b8cbc7]">
          <span>Username</span>
          <input name="username" autoComplete="username" required minLength={3} maxLength={40} className="focus-ring h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-white placeholder:text-[#526d68]" placeholder="O teu username" />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-2 text-sm text-[#b8cbc7]">
            <span>Password</span>
            <input name="password" type="password" autoComplete="new-password" required minLength={10} maxLength={256} className="focus-ring h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-white" />
          </label>
          <label className="block space-y-2 text-sm text-[#b8cbc7]">
            <span>Confirmar</span>
            <input name="confirmPassword" type="password" autoComplete="new-password" required minLength={10} maxLength={256} className="focus-ring h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-white" />
          </label>
        </div>
        <button className="focus-ring h-12 w-full rounded-xl bg-cyan px-5 text-sm font-bold text-[#05201d] transition hover:bg-[#8cebf3]">
          Criar workspace
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-[#7f9a95]">
        Já tens conta?{" "}
        <Link href="/login" className="focus-ring rounded text-cyan hover:underline">Iniciar sessão</Link>
      </p>
    </AuthShell>
  );
}
