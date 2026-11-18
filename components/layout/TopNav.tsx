import Link from "next/link";
import { Radar } from "lucide-react";
import { NavLinks } from "./NavLinks";
import { LiveBadge } from "./LiveBadge";

export const TopNav = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-8 px-6 md:px-10">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="grid size-8 place-items-center rounded-lg bg-linear-to-br from-blue-500 to-violet-500 shadow-[0_0_20px_rgba(99,102,241,0.45)]">
            <Radar className="size-4 text-white" />
          </span>
          <span className="hidden sm:inline">Threat Radar</span>
        </Link>

        <NavLinks />

        <div className="ml-auto hidden md:block">
          <LiveBadge />
        </div>
      </div>
    </header>
  );
};