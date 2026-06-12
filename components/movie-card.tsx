"use client";

import { Check, Plus, Play } from "lucide-react";
import type { Title } from "@/data/catalog";

type Props = {
  title: Title;
  inWatchlist: boolean;
  onPlay: (title: Title) => void;
  onToggleWatchlist: (id: string) => void;
};

export function MovieCard({ title, inWatchlist, onPlay, onToggleWatchlist }: Props) {
  return (
    <article className="group w-[68vw] max-w-[270px] shrink-0 snap-start md:w-[230px]">
      <button
        className="poster-art relative block aspect-[2/3] w-full overflow-hidden rounded-xl border border-white/10 bg-panel text-left shadow-lg transition duration-300 hover:-translate-y-1 hover:border-white/25 focus:outline-none focus:ring-2 focus:ring-brand"
        style={{
          "--c1": title.accent[0],
          "--c2": title.accent[1],
          "--glow": title.accent[2],
        } as React.CSSProperties}
        onClick={() => onPlay(title)}
        aria-label={`Play ${title.name}`}
      >
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-4">
          <div className="mb-auto flex justify-between">
            <span className="rounded bg-black/55 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white/80 backdrop-blur">
              {title.category === "Assamese Content" ? "Assamese" : title.category}
            </span>
            <span className="grid h-9 w-9 scale-90 place-items-center rounded-full bg-white text-black opacity-0 shadow-xl transition group-hover:scale-100 group-hover:opacity-100">
              <Play size={15} fill="currentColor" />
            </span>
          </div>
          <p className="font-display text-xl font-extrabold leading-tight">{title.name}</p>
          <p className="mt-1 text-xs text-white/60">{title.genres.join(" • ")}</p>
        </div>
        {title.progress ? (
          <span className="absolute inset-x-3 bottom-1 z-20 h-1 overflow-hidden rounded bg-white/20">
            <span className="block h-full bg-brand" style={{ width: `${title.progress}%` }} />
          </span>
        ) : null}
      </button>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-white">{title.name}</h3>
          <p className="mt-0.5 text-xs text-white/45">
            {title.year} · {title.duration}
          </p>
        </div>
        <button
          onClick={() => onToggleWatchlist(title.id)}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
          aria-label={inWatchlist ? `Remove ${title.name} from watchlist` : `Add ${title.name} to watchlist`}
        >
          {inWatchlist ? <Check size={15} /> : <Plus size={15} />}
        </button>
      </div>
    </article>
  );
}

