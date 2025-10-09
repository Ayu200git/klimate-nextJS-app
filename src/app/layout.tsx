import "./globals.css";
import { FavoritesProvider } from "@/context/favouritesContext";
import Header from "@/components/Header";

export const metadata = {
  title: "Klimate",
  description: "Weather App - Next.js 15 + TypeScript + SSR"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <FavoritesProvider>
          <Header />
          <main className="p-6">{children}</main>
        </FavoritesProvider>
      </body>
    </html>
  );
}



