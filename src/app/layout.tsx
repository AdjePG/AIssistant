import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import { poppins } from "@/utils/fonts";
import { ToastProvider } from "@/contexts/ToastContext";

export const metadata: Metadata = {
  title: "Welcome - AIssistant",
  description: "Inteligent assistant for your daily tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <Header />
        <ToastProvider>
          <main className="h-full overflow-hidden">
            {children}
          </main>
        </ToastProvider>
      </body>
    </html>
  );
}
