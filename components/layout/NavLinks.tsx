"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/threats", label: "Threats" },
  { href: "/vendors", label: "Vendors" },
  { href: "/news", label: "News" },
] as const;

// "/" only matches itself; the others also match their sub-pages (/threats/CVE-...)
const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

export const NavLinks = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-2 overflow-x-auto">
      {LINKS.map((link) => {
        const active = isActive(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
};