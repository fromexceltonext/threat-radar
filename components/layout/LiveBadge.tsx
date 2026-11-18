export const LiveBadge = () => {
   return (
    <span className="inline-flex items-center gap-2 rounded-full border border-green-500/35 bg-green-500/10 px-3 py-1.5 text-sm text-green-300">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-green-500"/>
      </span>
        Live · CISA KEV
    </span>
   )

}