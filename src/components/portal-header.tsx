import { LogOut, Settings2 } from "lucide-react";
import Link from "next/link";
import { logoutAction } from "@/actions/auth";
import { Brand } from "@/components/brand";
import type { PortalUser } from "@/lib/auth";

export function PortalHeader({ user }: { user: PortalUser }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#06110f]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[78px] max-w-[1500px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <Brand />
        <div className="flex items-center gap-2">
          <div className="hidden border-r border-white/10 pr-4 text-right sm:block">
            <p className="text-sm font-semibold text-white">{user.workspaceName}</p>
            <p className="text-xs text-[#78938e]">{user.username}</p>
          </div>
          <Link href="/account" aria-label="Definições da conta" className="focus-ring grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.035] text-[#9db5b0] transition hover:border-cyan/30 hover:text-cyan">
            <Settings2 className="size-[18px]" />
          </Link>
          <form action={logoutAction}>
            <button aria-label="Terminar sessão" className="focus-ring grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.035] text-[#9db5b0] transition hover:border-red-300/30 hover:text-red-200">
              <LogOut className="size-[18px]" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

