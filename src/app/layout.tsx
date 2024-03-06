import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Facilita App",
  description: "Facilita",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="main-flex">
          <header className="mx-auto mt-auto">
            <h1>Facilita</h1>
          </header>
          <main className="mx-auto mb-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
