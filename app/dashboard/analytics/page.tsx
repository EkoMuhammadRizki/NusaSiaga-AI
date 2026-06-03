"use client";

import { AnalyticsCards } from "@/components/dashboard/AnalyticsCards";
import { RainfallChart } from "@/components/charts/RainfallChart";
import { RegionComparisonChart } from "@/components/charts/RegionComparisonChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { regions } from "@/lib/data/regions";
import { Brain, TrendingUp, CloudRain } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-3xl font-bold tracking-tight text-white">Analytics & Forecasting</h1>
        <p className="mt-1 text-sm text-slate-400">
          Analisis komprehensif metrik kebencanaan, intensitas hujan nasional, dan pemetaan risiko spasial.
        </p>
      </div>

      <AnalyticsCards />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Charts */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-lg font-bold text-white">Curah Hujan Nasional (24j)</CardTitle>
                <p className="text-xs text-slate-400">Metrik intensitas hujan dalam satuan milimeter (mm)</p>
              </div>
              <CloudRain className="h-5 w-5 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="h-[260px] w-full mt-2">
                <RainfallChart height={260} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-lg font-bold text-white">Perbandingan Indeks Risiko Regional</CardTitle>
                <p className="text-xs text-slate-400">Distribusi risiko banjir dan tanah longsor di kota-kota pantauan utama</p>
              </div>
              <TrendingUp className="h-5 w-5 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="h-[280px] w-full mt-2">
                <RegionComparisonChart />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insight & Table Column */}
        <div className="space-y-6">
          <Card className="border-emerald-500/20 bg-emerald-950/20 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-400">
                  <Brain className="h-5 w-5" />
                </div>
                <CardTitle className="text-md font-bold text-white">AI Disaster Intelligence Insights</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <p>
                Berdasarkan kombinasi data **Satelit Himawari-9** dan stasiun **radar cuaca BMKG**, wilayah **DKI Jakarta** berada pada fase kritis dengan indeks risiko banjir **87%**. Curah hujan lokal diperkirakan bertahan di atas **100mm/hari** selama 6 jam ke depan.
              </p>
              <p>
                Wilayah **Bandung** (Jawa Barat) menunjukkan anomali risiko tanah longsor yang cukup tinggi (**78%**) akibat kemiringan lereng di area utara kota yang jenuh air dari curah hujan orografis konstan.
              </p>
              <div className="border-t border-white/10 pt-3">
                <span className="font-semibold text-emerald-400">Rekomendasi Utama:</span>
                <ul className="list-disc list-inside mt-1.5 space-y-1 text-slate-400">
                  <li>Aktifkan evakuasi preventif di RW rawan DKI Jakarta.</li>
                  <li>Pantau instrumen sensor tanah longsor Cimenyan secara ketat.</li>
                  <li>Siagakan pompa polder pesisir Semarang Utara.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-bold text-white">Matriks Risiko Wilayah</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto font-sans">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400">
                      <th className="px-4 py-2 font-medium">Wilayah</th>
                      <th className="px-4 py-2 font-medium">Risiko</th>
                      <th className="px-4 py-2 font-medium text-right">Curah Hujan</th>
                      <th className="px-4 py-2 font-medium text-right">Muka Air</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regions.map((r) => (
                      <tr key={r.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3 font-semibold text-white">{r.name}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              r.riskLevel === "kritis"
                                ? "bg-red-500/15 text-red-400 font-sans"
                                : r.riskLevel === "tinggi"
                                ? "bg-orange-500/15 text-orange-400 font-sans"
                                : "bg-yellow-500/15 text-yellow-400 font-sans"
                            }`}
                          >
                            {r.riskLevel}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-slate-300 font-mono">{r.rainfall} mm</td>
                        <td className="px-4 py-3 text-right text-slate-300 font-mono">{r.waterLevel} m</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
