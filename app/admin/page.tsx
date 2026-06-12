"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BarChart3, Clapperboard, CloudUpload, Eye, Film, LayoutDashboard, Users } from "lucide-react";
import { Logo } from "@/components/logo";
import { categories } from "@/data/catalog";

export default function AdminPage() {
  const [message, setMessage] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Demo upload saved. Connect Supabase Storage to publish this title.");
  }

  return (
    <main className="min-h-screen bg-[#080808]">
      <header className="border-b border-white/[.07] bg-black">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-4 md:px-8">
          <Logo />
          <Link href="/" className="flex items-center gap-2 text-sm text-white/50 hover:text-white"><ArrowLeft size={16} /> Back to CINEVERS</Link>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1500px] md:grid-cols-[220px_1fr]">
        <aside className="hidden min-h-[calc(100vh-64px)] border-r border-white/[.07] p-5 md:block">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[.22em] text-white/30">Studio</p>
          {[["Overview", LayoutDashboard], ["Content", Film], ["Audience", Users], ["Analytics", BarChart3]].map(([label, Icon], index) => {
            const IconComponent = Icon as typeof Film;
            return <button key={label as string} className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${index === 0 ? "bg-white/[.07] text-white" : "text-white/45 hover:text-white"}`}><IconComponent size={17} />{label as string}</button>;
          })}
        </aside>
        <div className="p-5 md:p-8 lg:p-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[.22em] text-brand">Admin dashboard</p><h1 className="mt-2 font-display text-3xl font-bold">Good afternoon, Studio</h1></div>
            <button onClick={() => document.getElementById("upload")?.scrollIntoView()} className="flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-bold"><CloudUpload size={17} /> Upload video</button>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[["Total views", "1.24M", Eye], ["Published", "128", Clapperboard], ["Members", "48.2K", Users], ["Watch time", "92.4K hrs", BarChart3]].map(([label, value, Icon]) => {
              const IconComponent = Icon as typeof Eye;
              return <div key={label as string} className="rounded-xl border border-white/[.07] bg-white/[.025] p-5"><IconComponent size={18} className="text-brand" /><p className="mt-5 text-sm text-white/40">{label as string}</p><p className="mt-1 font-display text-2xl font-bold">{value as string}</p></div>;
            })}
          </div>
          <section id="upload" className="mt-8 rounded-2xl border border-white/[.08] bg-[#101010] p-5 md:p-7">
            <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-lg bg-brand/15 text-brand"><CloudUpload size={20} /></span><div><h2 className="font-display text-xl font-bold">Publish new title</h2><p className="text-sm text-white/35">Add metadata and upload the master video.</p></div></div>
            <form onSubmit={submit} className="mt-7 grid gap-5 lg:grid-cols-2">
              <label className="block"><span className="mb-2 block text-xs font-semibold text-white/50">Title</span><input required placeholder="Film title" className="w-full rounded-lg border border-white/10 bg-black/35 px-4 py-3 outline-none focus:border-brand" /></label>
              <label className="block"><span className="mb-2 block text-xs font-semibold text-white/50">Category</span><select className="w-full rounded-lg border border-white/10 bg-black/35 px-4 py-3 outline-none focus:border-brand">{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
              <label className="block lg:col-span-2"><span className="mb-2 block text-xs font-semibold text-white/50">Description</span><textarea required rows={4} placeholder="Tell viewers what this title is about..." className="w-full resize-none rounded-lg border border-white/10 bg-black/35 px-4 py-3 outline-none focus:border-brand" /></label>
              <label className="block"><span className="mb-2 block text-xs font-semibold text-white/50">Thumbnail</span><input type="file" accept="image/*" className="w-full rounded-lg border border-dashed border-white/15 bg-black/25 p-4 text-sm text-white/45 file:mr-4 file:rounded file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-white" /></label>
              <label className="block"><span className="mb-2 block text-xs font-semibold text-white/50">Video master</span><input type="file" accept="video/*" className="w-full rounded-lg border border-dashed border-white/15 bg-black/25 p-4 text-sm text-white/45 file:mr-4 file:rounded file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-white" /></label>
              <div className="flex items-center justify-end gap-4 lg:col-span-2"><span className="mr-auto text-sm text-emerald-400">{message}</span><button type="button" className="rounded-lg border border-white/10 px-5 py-2.5 text-sm font-semibold text-white/60">Save draft</button><button className="rounded-lg bg-brand px-5 py-2.5 text-sm font-bold">Publish title</button></div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

