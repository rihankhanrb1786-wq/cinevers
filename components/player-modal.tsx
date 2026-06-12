"use client";

import { useState } from "react";
import { Heart, MessageCircle, Pause, Play, Send } from "lucide-react";
import type { Title } from "@/data/catalog";
import { Modal } from "./modal";

export function PlayerModal({
  title,
  liked,
  onLike,
  onClose,
}: {
  title: Title;
  liked: boolean;
  onLike: () => void;
  onClose: () => void;
}) {
  const [playing, setPlaying] = useState(true);
  const [comments, setComments] = useState(["The cinematography is incredible.", "That final scene stayed with me."]);

  function addComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.namedItem("comment") as HTMLInputElement;
    if (input.value.trim()) setComments((items) => [...items, input.value.trim()]);
    form.reset();
  }

  return (
    <Modal onClose={onClose} label={`Watch ${title.name}`} wide>
      <div
        className="relative aspect-video overflow-hidden bg-black"
        style={{ background: `radial-gradient(circle at 68% 30%, ${title.accent[2]}55, transparent 30%), linear-gradient(140deg, ${title.accent[0]}, ${title.accent[1]})` }}
      >
        <div className="absolute inset-0 grid place-items-center bg-black/10">
          <button onClick={() => setPlaying((value) => !value)} className="grid h-16 w-16 place-items-center rounded-full bg-white text-black shadow-2xl transition hover:scale-105" aria-label={playing ? "Pause" : "Play"}>
            {playing ? <Pause fill="currentColor" /> : <Play className="ml-1" fill="currentColor" />}
          </button>
        </div>
        <div className="absolute inset-x-5 bottom-4">
          <div className="h-1 overflow-hidden rounded bg-white/20">
            <div className="h-full w-[36%] bg-brand" />
          </div>
        </div>
      </div>
      <div className="grid gap-8 p-6 md:grid-cols-[1fr_300px] md:p-8">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-extrabold">{title.name}</h2>
              <p className="mt-2 text-sm text-white/50">{title.year} · {title.rating} · {title.duration}</p>
            </div>
            <button onClick={onLike} className={`grid h-11 w-11 place-items-center rounded-full border transition ${liked ? "border-brand bg-brand text-white" : "border-white/15 text-white/60 hover:text-white"}`} aria-label="Like title">
              <Heart size={19} fill={liked ? "currentColor" : "none"} />
            </button>
          </div>
          <p className="mt-5 max-w-xl leading-7 text-white/65">{title.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {title.genres.map((genre) => <span key={genre} className="rounded-full bg-white/[.06] px-3 py-1 text-xs text-white/65">{genre}</span>)}
          </div>
        </div>
        <div>
          <h3 className="flex items-center gap-2 font-semibold"><MessageCircle size={17} /> Comments</h3>
          <div className="mt-4 max-h-36 space-y-3 overflow-auto">
            {comments.map((comment, index) => (
              <p key={`${comment}-${index}`} className="rounded-lg bg-white/[.04] p-3 text-sm text-white/65">{comment}</p>
            ))}
          </div>
          <form onSubmit={addComment} className="mt-3 flex gap-2">
            <input name="comment" aria-label="Add a comment" placeholder="Join the conversation" className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/[.04] px-3 py-2 text-sm outline-none focus:border-brand" />
            <button className="grid h-10 w-10 place-items-center rounded-lg bg-brand" aria-label="Post comment"><Send size={16} /></button>
          </form>
        </div>
      </div>
    </Modal>
  );
}

