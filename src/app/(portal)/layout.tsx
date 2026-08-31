import { PortalHeader } from "@/components/portal-header";
import { requireUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  return (
    <div className="min-h-screen">
      <PortalHeader user={user} />
      {children}
    </div>
  );
}

