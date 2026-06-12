"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Info, Menu, Play, Search, UserRound, X } from "lucide-react";
import { catalog, categories, type Category, type Title } from "@/data/catalog";
import { Logo } from "./logo";
import { MovieCard } from "./movie-card";
import { AuthModal } from "./auth-modal";
import { PlayerModal } from "./player-modal";

export function CineversApp() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [authOpen, setAuthOpen] = useState(false);
  const [selected, setSelected] = useState<Title | null>(null);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [likes, setLikes] = useState<string[]>([]);

  useEffect(() => {
    try {
      setWatchlist(JSON.parse(localStorage.getItem("cinevers-watchlist") || "[]"));
      setLikes(JSON.parse(localStorage.getItem("cinevers-likes") || "[]"));
    } catch {}
  }, []);

  function toggleStored(key: string, id: string, values: string[], setter: (values: string[]) => void) {
    const next = values.includes(id) ? values.filter((item) => item !== id) : [...values, id];
    setter(next);
    localStorage.setItem(key, JSON.stringify(next));
  }

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return catalog.filter((title) => {
      const categoryMatch = activeCategory === "All" || title.category === activeCategory;
      const queryMatch = !term || [title.name, title.category, ...title.genres].join(" ").toLowerCase().includes(term);
      return categoryMatch && queryMatch;
    });
  }, [query, activeCategory]);

  const featured = catalog[0];
  const continueWatching = catalog.filter((title) => title.progress);

  function row(title: string, items: Title[]) {
    if (!items.length) return null;
    return (
      <section className="mt-12 md:mt-16">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold md:text-2xl">{title}</h2>
          <span className="text-xs font-semibold uppercase tracking-[.18em] text-white/35">{items.length} titles</span>
        </div>
        <div className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-4 md:gap-5">
          {items.map((item) => (
            <MovieCard key={item.id} title={item} inWatchlist={watchlist.includes(item.id)} onPlay={setSelected} onToggleWatchlist={(id) => toggleStored("cinevers-watchlist", id, watchlist, setWatchlist)} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-ink">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[.06] bg-black/55 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center gap-7 px-4 md:h-[72px] md:px-8">
          <Link href="/" aria-label="CINEVERS home"><Logo /></Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-white/60 lg:flex">
            <button onClick={() => { setActiveCategory("All"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-white">Home</button>
            <button onClick={() => document.getElementById("browse")?.scrollIntoView()} className="hover:text-white">Browse</button>
            <button onClick={() => { setQuery(""); setActiveCategory("All"); document.getElementById("watchlist")?.scrollIntoView(); }} className="hover:text-white">My List</button>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <div className={`flex items-center overflow-hidden rounded-full border transition-all ${searchOpen ? "w-44 border-white/20 bg-black/50 sm:w-64" : "w-10 border-transparent"}`}>
              <button onClick={() => setSearchOpen((value) => !value)} className="grid h-10 w-10 shrink-0 place-items-center text-white/70 hover:text-white" aria-label="Search"><Search size={19} /></button>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Titles, genres..." className="min-w-0 flex-1 bg-transparent pr-4 text-sm outline-none placeholder:text-white/30" />
            </div>
            <Link href="/admin" className="hidden rounded-full px-3 py-2 text-xs font-semibold text-white/50 hover:text-white md:block">Admin</Link>
            <button onClick={() => setAuthOpen(true)} className="hidden rounded-full bg-white px-4 py-2 text-xs font-bold text-black transition hover:bg-white/85 sm:flex sm:items-center sm:gap-2"><UserRound size={14} /> Sign in</button>
            <button onClick={() => setMenuOpen((value) => !value)} className="grid h-10 w-10 place-items-center lg:hidden" aria-label="Menu">{menuOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-white/5 bg-black px-5 py-5 lg:hidden">
            <div className="flex flex-col gap-4 text-sm text-white/70">
              <button className="text-left text-white" onClick={() => setMenuOpen(false)}>Home</button>
              <button className="text-left" onClick={() => { document.getElementById("browse")?.scrollIntoView(); setMenuOpen(false); }}>Browse</button>
              <Link href="/admin">Admin dashboard</Link>
              <button className="rounded-lg bg-brand px-4 py-3 font-bold text-white sm:hidden" onClick={() => { setAuthOpen(true); setMenuOpen(false); }}>Sign in free</button>
            </div>
          </nav>
        )}
      </header>

      <section className="relative min-h-[760px] md:h-[90vh] md:min-h-[700px]">
        <div className="absolute inset-0 bg-cover bg-[65%_center] md:bg-center" style={{ backgroundImage: "url('/images/cinevers-hero.png')" }} />
        <div className="hero-mask absolute inset-0" />
        <div className="relative mx-auto flex h-full max-w-[1500px] items-end px-5 pb-20 pt-32 md:items-center md:px-8 md:pb-16">
          <div className="max-w-2xl">
            <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[.28em] text-white/65">
              <span className="h-px w-9 bg-brand" /> CINEVERS Original
            </p>
            <h1 className="font-display text-5xl font-extrabold leading-[.93] tracking-[-.055em] text-white sm:text-6xl md:text-8xl">
              RED<br/><span className="text-brand">HORIZON</span>
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold text-white/65 md:text-sm">
              <span className="text-emerald-400">97% Match</span><span>2026</span><span className="rounded border border-white/25 px-1.5 py-0.5">U/A 13+</span><span>2h 08m</span>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-6 text-white/65 md:text-base md:leading-7">{featured.description}</p>
            <div className="mt-8 flex gap-3">
              <button onClick={() => setSelected(featured)} className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-bold text-black transition hover:bg-white/85 md:px-7"><Play size={19} fill="currentColor" /> Play now</button>
              <button onClick={() => document.getElementById("browse")?.scrollIntoView()} className="flex items-center gap-2 rounded-lg bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/15"><Info size={19} /> More info</button>
            </div>
            <p className="mt-9 text-[10px] font-semibold uppercase tracking-[.26em] text-white/35">Free to watch · No subscription</p>
          </div>
        </div>
        <button onClick={() => document.getElementById("browse")?.scrollIntoView()} className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-widest text-white/35 md:flex">Explore <ChevronDown size={16} /></button>
      </section>

      <div id="browse" className="relative z-10 mx-auto max-w-[1500px] px-4 pb-20 md:px-8">
        <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-white/[.08] pb-5">
          {(["All", ...categories] as const).map((category) => (
            <button key={category} onClick={() => setActiveCategory(category)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${activeCategory === category ? "bg-brand text-white" : "bg-white/[.05] text-white/55 hover:bg-white/10 hover:text-white"}`}>{category}</button>
          ))}
        </div>

        {query || activeCategory !== "All" ? (
          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold">{query ? `Results for “${query}”` : activeCategory}</h2>
            {filtered.length ? (
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filtered.map((item) => <MovieCard key={item.id} title={item} inWatchlist={watchlist.includes(item.id)} onPlay={setSelected} onToggleWatchlist={(id) => toggleStored("cinevers-watchlist", id, watchlist, setWatchlist)} />)}
              </div>
            ) : <p className="mt-8 text-white/45">No titles found. Try another search.</p>}
          </section>
        ) : (
          <>
            {row("Trending now", catalog.slice(1, 7))}
            {row("Continue watching", continueWatching)}
            {row("Assamese stories", catalog.filter((title) => title.category === "Assamese Content"))}
            {row("Short, sharp & unforgettable", catalog.filter((title) => title.category === "Short Films"))}
            {row("AI cinema", catalog.filter((title) => title.category === "AI Movies"))}
            <div id="watchlist">{watchlist.length ? row("My watchlist", catalog.filter((title) => watchlist.includes(title.id))) : null}</div>
          </>
        )}
      </div>

      <section className="border-y border-white/[.06] bg-white/[.025]">
        <div className="mx-auto flex max-w-[1500px] flex-col items-start justify-between gap-6 px-5 py-12 md:flex-row md:items-center md:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.24em] text-brand">Always free</p>
            <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">Great stories. Zero subscription.</h2>
          </div>
          <button onClick={() => setAuthOpen(true)} className="rounded-lg bg-brand px-6 py-3 font-bold transition hover:bg-red-600">Create your free account</button>
        </div>
      </section>

      <footer className="mx-auto max-w-[1500px] px-5 py-10 md:px-8">
        <div className="flex flex-col justify-between gap-8 border-b border-white/[.06] pb-9 md:flex-row">
          <div><Logo /><p className="mt-3 text-sm text-white/35">Your Universe of Entertainment</p></div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs text-white/40"><a href="#">About</a><a href="#">Help</a><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Content partners</a></div>
        </div>
        <p className="pt-7 text-xs text-white/25">© 2026 CINEVERS. All rights reserved.</p>
      </footer>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
      {selected && <PlayerModal title={selected} liked={likes.includes(selected.id)} onLike={() => toggleStored("cinevers-likes", selected.id, likes, setLikes)} onClose={() => setSelected(null)} />}
    </main>
  );
}

