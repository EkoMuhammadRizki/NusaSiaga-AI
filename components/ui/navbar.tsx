"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PilotTriggerButton } from "@/components/landing/pilot/PilotTriggerButton";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#beranda", label: "Beranda" },
  { href: "#tujuan", label: "Tujuan" },
  { href: "#fitur", label: "Fitur" },
  { href: "#cara-kerja", label: "Cara Kerja" },
  { href: "#pengguna", label: "Pengguna" },
  { href: "#dashboard-preview", label: "Dashboard" },
  { href: "#kontak", label: "Kontak" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-[#0B1F3A]/80 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-1">
          <Image src="/NusaSiagaAI.png" alt="NusaSiaga AI Logo" width={64} height={64} className="object-contain -ml-2 -mr-1 mt-1" />
          <span className="font-display font-bold tracking-tight text-white">NusaSiaga AI</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-tight text-slate-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="secondary" asChild>
            <Link href="/login">Masuk Dashboard</Link>
          </Button>
          <PilotTriggerButton>Ajukan Pilot</PilotTriggerButton>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-white lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#0B1F3A]/95 px-4 py-4 lg:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-2 text-sm text-white/70"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 flex flex-col gap-2">
            <Button variant="secondary" asChild>
              <Link href="/login">Masuk Dashboard</Link>
            </Button>
            <PilotTriggerButton className="w-full">Ajukan Pilot</PilotTriggerButton>
          </div>
        </div>
      )}
    </header>
  );
}
