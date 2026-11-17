import { Radar } from "lucide-react";

export const DashboardHeader = () => {
  return (
    <header className="flex flex-wrap items-end justify-between gap-3">
      <div className="flex items-end gap-4">
        <div className="grid size-12 place-items-center rounded-2xl bg-linear-to-br from-blue-500 to-violet-500 shadow-[0_0_30px_rgba(99,102,241,0.45)]">
            <Radar className="size-6 text-white" />
        </div>
      </div>
      <div>
        <h1 className="bg-linear-to-r from-white via-blue-300 to-violet-300 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
            Threat Radar
        </h1>
        <p className="text-muted-foreground">Known Exploited Vulnerabilities at a Glance</p>
      </div>
      <span className="inline-flex items-center gap-2 rounded-full border border-green-500/35 bg-green-500/10 px-3 py-1.5 text-sm text-green-300 ">
        <span className="relative flex size-2">
           <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-75" />
           <span className="relative inline-flex size-2 rounded-full bg-green-500" />
        </span>
        Live · CISA KEV
      </span>
    </header>
  )
};