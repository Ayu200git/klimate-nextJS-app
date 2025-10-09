"use client";
import DarkToggle from "./DarkToggle";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 border-b dark:border-slate-700">
      <h1 className="text-2xl font-bold">Klimate</h1>
      <DarkToggle />
    </header>
  );
}

