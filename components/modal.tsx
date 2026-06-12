"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export function Modal({
  children,
  onClose,
  label,
  wide = false,
}: {
  children: React.ReactNode;
  onClose: () => void;
  label: string;
  wide?: boolean;
}) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", close);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className={`relative max-h-[92vh] w-full overflow-auto rounded-2xl border border-white/10 bg-[#111] shadow-2xl ${wide ? "max-w-4xl" : "max-w-md"}`}>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-black/65 text-white transition hover:bg-white/15"
          aria-label="Close"
        >
          <X size={19} />
        </button>
        {children}
      </div>
    </div>
  );
}

