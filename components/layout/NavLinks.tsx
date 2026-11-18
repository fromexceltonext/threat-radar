"use client";

import { Suspense } from "react";
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

// Draws the links. With pathname "" nothing is highlighted (used while the URL is not known yet).
const LinksView = ({ pathname }: { pathname: string }) => {
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

// Reads the current URL (only known at request time on dynamic routes like /threats/[cveId])
const ActiveLinks = () => {
  const pathname = usePathname();
  return <LinksView pathname={pathname} />;
};

export const NavLinks = () => {
  return (
    <Suspense fallback={<LinksView pathname="" />}>
      <ActiveLinks />
    </Suspense>
  );
};