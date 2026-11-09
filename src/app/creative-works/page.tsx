// src/app/creative-works/page.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useFetch } from "@/hooks/use-fetch";
import { Play, Film, X } from "lucide-react";
import React from "react";

export default function CreativeWorksPage() {
  const { data: works, loading, error } = useFetch<any>("/api/creative-works");

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <p className="text-muted">Loading gallery...</p>
      </div>
    );
  }
  if (error || !works) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center text-muted">
        Unable to load gallery.
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div className="text-center mb-12">
        <h2 className="h-section text-3xl md:text-4xl font-bold text-text mb-4">Creative Works</h2>
        <p className="text-muted text-lg">Motion graphics and video editing gallery.</p>
      </div>

      <CreativeGallery works={works} />
    </section>
  );
}

function CreativeGallery({ works }: { works: any[] }) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<any>(null);

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {works.map((work) => (
          <div
            key={work.id}
            className="group cursor-pointer rounded-2xl overflow-hidden border border-border/40 bg-surface/30"
            onClick={() => { setSelected(work); setOpen(true); }}
          >
            {work.type === "video" ? (
              <>
                <video
                  src={work.url}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  muted
                  playsInline
                  preload="none"
                  poster={work.thumbnail || undefined}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-opacity flex items-center justify-center">
                  <Play className="h-6 w-6 text-white drop-shadow" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] text-white uppercase tracking-wider">
                  Video
                </div>
              </>
            ) : (
              <img
                src={work.url}
                alt={work.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            )}
            <div className="p-3">
              <h3 className="font-semibold text-text mb-1">{work.title}</h3>
              <p className="text-xs text-muted">{work.category}</p>
            </div>
          </div>
        ))}
        {works.length === 0 && (
          <div className="col-span-full glass-card py-24 text-center flex flex-col items-center justify-center">
            <Film className="h-12 w-12 text-muted mb-3" />
            <p className="text-muted">No creative works yet.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {open && selected && (
          <MediaModal work={selected} onClose={() => { setOpen(false); setSelected(null); }} />
        )}
      </AnimatePresence>
    </>
  );
}

function MediaModal({ work, onClose }: { work: any; onClose: () => void }) {
  const isVideo = work.type === "video";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto glass rounded-3xl border border-border/60 p-6 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 hover:bg-surface/50 transition-colors z-10"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-text" />
        </button>
        <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center mb-4">
          {isVideo ? (
            <video
              src={work.url}
              className="w-full h-full object-contain"
              controls
              playsInline
              poster={work.thumbnail || undefined}
            />
          ) : (
            <img src={work.url} alt={work.title} className="w-full h-full object-contain" />
          )}
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-text mb-1">{work.title}</h2>
          <p className="text-muted text-sm">{work.category}</p>
          {work.duration && (
            <p className="text-xs text-muted/70 mt-1">Duration: {work.duration}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
