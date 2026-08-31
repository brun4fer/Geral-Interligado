import type { Metadata, Viewport } from "next";
import { ServiceWorkerRegister } from "@/components/service-worker-register";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AP Football Analysis",
    template: "%s · AP Football Analysis"
  },
  description: "A central de acesso ao ecossistema AP Football Analysis.",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg" }
};

export const viewport: Viewport = {
  themeColor: "#06110f",
  colorScheme: "dark"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <body>
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}

