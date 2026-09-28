import Link from "next/link";
import { redirect } from "next/navigation";
import { loginAction } from "@/actions/auth";
import { AuthShell } from "@/components/auth-shell";
import { getCurrentUser, registrationEnabled } from "@/lib/auth";
import { safePortalReturnPath } from "@/lib/sso";

export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; next?: string }> }) {
  const { error, next } = await searchParams;
  const returnTo = safePortalReturnPath(next);
  const canRegister = registrationEnabled();
  if (await getCurrentUser()) redirect(returnTo);

  return (
    <AuthShell eyebrow="Acesso privado" title="Bem-vindo de volta" description="Entra na tua central AP para escolher a ferramenta certa para cada análise.">
      {error && (
        <p className="mb-5 rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-100">
          {error === "registration-disabled" ? "A criação pública de contas está desativada. Contacta o administrador." : "Username ou password incorretos."}
        </p>
      )}
      <form action={loginAction} className="space-y-4">
        <input type="hidden" name="next" value={returnTo} />
        <label className="block space-y-2 text-sm text-[#b8cbc7]">
          <span>Username</span>
          <input name="username" autoComplete="username" required autoFocus maxLength={80} className="focus-ring h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-white placeholder:text-[#526d68]" placeholder="O teu username" />
        </label>
        <label className="block space-y-2 text-sm text-[#b8cbc7]">
          <span>Password</span>
          <input name="password" type="password" autoComplete="current-password" required maxLength={256} className="focus-ring h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-white placeholder:text-[#526d68]" placeholder="A tua password" />
        </label>
        <button className="focus-ring h-12 w-full rounded-xl bg-cyan px-5 text-sm font-bold text-[#05201d] transition hover:bg-[#8cebf3]">
          Entrar no portal
        </button>
      </form>
      {canRegister ? <p className="mt-6 text-center text-sm text-[#7f9a95]">
        Ainda não tens conta?{" "}
        <Link href="/register" className="focus-ring rounded text-cyan hover:underline">Criar conta</Link>
      </p> : null}
    </AuthShell>
  );
}
