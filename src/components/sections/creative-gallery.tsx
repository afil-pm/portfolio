"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, Film, X } from "lucide-react";
import React from "react";

export function CreativeGallery({ works }: { works: any[] }) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<any>(null);

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {works.map((work: any) => (
          <div
            key={work.id}
            className="group cursor-pointer rounded-2xl overflow-hidden border border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-500"
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
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-opacity duration-500 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-black/80 backdrop-blur flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Play className="h-6 w-6" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur px-2.5 py-1 rounded text-[10px] text-white uppercase tracking-wider font-medium">
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
            <div className="p-4">
              <h3 className="font-semibold text-white mb-1">{work.title}</h3>
              <p className="text-xs text-slate-400 uppercase tracking-wider">{work.category}</p>
            </div>
          </div>
        ))}
        {works.length === 0 && (
          <div className="col-span-full rounded-3xl border border-white/10 bg-white/5 py-24 text-center flex flex-col items-center justify-center">
            <Film className="h-12 w-12 text-slate-500 mb-4" />
            <p className="text-slate-400">No creative works yet.</p>
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-slate-900 p-8 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 hover:bg-white/10 transition-colors z-10"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-slate-300" />
        </button>
        <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center mb-6">
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
          <h2 className="text-xl font-bold text-white mb-2">{work.title}</h2>
          <p className="text-slate-400 text-sm">{work.category}</p>
          {work.duration && (
            <p className="text-xs text-slate-500/70 mt-1">Duration: {work.duration}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
