"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatTimestamp } from "@/lib/utils";
import { setMockSession } from "@/lib/auth-mock";

const DisasterDigitalTwinMap = dynamic(
  () => import("@/components/maps/DisasterDigitalTwinMap").then((mod) => mod.DisasterDigitalTwinMap),
  { ssr: false, loading: () => <div className="h-[400px] w-full rounded-2xl border border-slate-800 bg-slate-900/50 animate-pulse" /> }
);

const roles = ["BNPB", "BPBD", "Pemerintah Daerah", "Analis", "Petugas Lapangan"];

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("Analis");
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    setTimestamp(formatTimestamp());
    const interval = setInterval(() => setTimestamp(formatTimestamp()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMockSession(role);
    router.push("/dashboard");
  };

  return (
    <div className="geo-grid flex min-h-screen">
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <div className="absolute inset-0 contour-bg" />
        <div className="relative flex h-full flex-col justify-between p-10">
          <Link href="/" className="flex items-center gap-1">
            <Image src="/NusaSiagaAI.png" alt="NusaSiaga AI Logo" width={64} height={64} className="object-contain -ml-2 -mr-1 mt-1" />
            <span className="font-display text-xl font-bold tracking-tight text-white">NusaSiaga AI</span>
          </Link>
          <div>
            <h2 className="text-display text-3xl font-extrabold tracking-tighter text-white">Climate Monitoring Indonesia</h2>
            <p className="mt-3 text-lg font-medium text-slate-400">Pusat komando kebencanaan nasional</p>
            <div className="mt-10 max-h-[500px] max-w-full overflow-hidden shadow-2xl">
              <DisasterDigitalTwinMap className="h-[450px]" />
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium tracking-tight text-slate-500">
            <span className="live-dot h-2 w-2 rounded-full bg-emerald-500" />
            SISTEM OPERASIONAL ·{" "}
            <span suppressHydrationWarning className="font-mono">{timestamp || "LIVE"}</span>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="border-white/15">
            <CardHeader>
              <CardTitle>Masuk Dashboard</CardTitle>
              <p className="text-sm text-white/50">Prototype — tidak perlu kredensial nyata</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@bpbd.go.id"
                    className="mt-1"
                    defaultValue="demo@nusasiaga.ai"
                    autoComplete="off"
                    data-lpignore="true"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="mt-1"
                    defaultValue="demo1234"
                    autoComplete="new-password"
                    data-lpignore="true"
                  />
                </div>
                <div>
                  <Label>Peran</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Masuk Dashboard
                </Button>
              </form>
              <p className="mt-4 text-center text-xs text-white/40">
                <Link href="/" className="hover:text-emerald-300">
                  ← Kembali ke Beranda
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
