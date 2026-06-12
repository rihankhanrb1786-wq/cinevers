export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5" aria-label="CINEVERS">
      <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-lg bg-brand shadow-glow">
        <span className="ml-0.5 h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-white" />
        <span className="absolute inset-y-0 left-1/2 w-px bg-white/20" />
      </span>
      {!compact && (
        <span className="font-display text-xl font-extrabold tracking-[0.18em] text-white">
          CINE<span className="text-brand">VERS</span>
        </span>
      )}
    </div>
  );
}

