import type { Metadata, Viewport } from "next";
import { ServiceWorkerRegister } from "@/components/service-worker-register";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "All-in-One Football Ecosystem",
    template: "%s · All-in-One Football Ecosystem"
  },
  description: "A central de acesso ao All-in-One Football Ecosystem.",
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

