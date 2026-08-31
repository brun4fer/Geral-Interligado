import { ArrowLeft, CheckCircle2, KeyRound } from "lucide-react";
import Link from "next/link";
import { updateCredentialsAction } from "@/actions/auth";
import { requireUser } from "@/lib/auth";

const messages: Record<string, string> = {
  username: "O username deve ter 3 a 40 letras, números ou os caracteres . _ -",
  password: "A nova password deve ter pelo menos 10 caracteres e as duas entradas devem coincidir.",
  current: "A password atual está incorreta.",
  taken: "Este username já está a ser utilizado."
};

export default async function AccountPage({ searchParams }: { searchParams: Promise<{ error?: string; updated?: string }> }) {
  const user = await requireUser();
  const params = await searchParams;

  return (
    <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8 lg:py-14">
      <Link href="/" className="focus-ring inline-flex items-center gap-2 rounded-lg text-sm text-[#91aaa5] hover:text-white">
        <ArrowLeft className="size-4" /> Voltar ao portal
      </Link>
      <div className="mt-7">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl border border-cyan/25 bg-cyan/10 text-cyan"><KeyRound className="size-5" /></span>
          <div>
            <h1 className="text-3xl font-semibold tracking-[-0.035em] text-white">Segurança da conta</h1>
            <p className="mt-1 text-sm text-[#78938e]">Workspace: {user.workspaceName}</p>
          </div>
        </div>

        {params.updated && (
          <p className="mt-7 flex items-center gap-2 rounded-xl border border-emerald-300/20 bg-emerald-300/[0.07] px-4 py-3 text-sm text-emerald-100">
            <CheckCircle2 className="size-4" /> Credenciais atualizadas com sucesso.
          </p>
        )}
        {params.error && (
          <p className="mt-7 rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-100">
            {messages[params.error] ?? "Não foi possível atualizar a conta."}
          </p>
        )}

        <form action={updateCredentialsAction} className="glass mt-7 grid gap-5 rounded-3xl p-6 sm:p-8">
          <label className="block space-y-2 text-sm text-[#b8cbc7]">
            <span>Username</span>
            <input name="username" defaultValue={user.username} required minLength={3} maxLength={40} className="focus-ring h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-white" />
          </label>
          <label className="block space-y-2 text-sm text-[#b8cbc7]">
            <span>Password atual</span>
            <input name="currentPassword" type="password" autoComplete="current-password" required maxLength={256} className="focus-ring h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-white" />
          </label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block space-y-2 text-sm text-[#b8cbc7]">
              <span>Nova password</span>
              <input name="newPassword" type="password" autoComplete="new-password" required minLength={10} maxLength={256} className="focus-ring h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-white" />
            </label>
            <label className="block space-y-2 text-sm text-[#b8cbc7]">
              <span>Confirmar nova password</span>
              <input name="confirmPassword" type="password" autoComplete="new-password" required minLength={10} maxLength={256} className="focus-ring h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-white" />
            </label>
          </div>
          <div className="flex justify-end pt-2">
            <button className="focus-ring h-11 rounded-xl bg-cyan px-6 text-sm font-bold text-[#05201d] transition hover:bg-[#8cebf3]">Guardar alterações</button>
          </div>
        </form>
      </div>
    </main>
  );
}

