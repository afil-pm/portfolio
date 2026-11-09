// src/app/creative-works/page.tsx

import { db } from "@/lib/db";
import { CreativeGallery } from "@/components/sections/creative-gallery";

const SAMPLE_WORKS = [
  {
    id: "cw-1",
    title: "Brand Identity Animation",
    type: "video",
    category: "Motion Graphics",
    url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    thumbnail: null,
    duration: "0:15",
    order: 1,
    isPublished: true,
  },
  {
    id: "cw-2",
    title: "Promo Video Edit",
    type: "video",
    category: "Video Editing",
    url: "https://images.unsplash.com/photo-1536440136629-8bb9012dca79?w=800&q=80",
    thumbnail: null,
    duration: "0:30",
    order: 2,
    isPublished: true,
  },
  {
    id: "cw-3",
    title: "Logo Reveal",
    type: "video",
    category: "Logo Animation",
    url: "https://images.unsplash.com/photo-1618095253234-2d376e5e8034?w=800&q=80",
    thumbnail: null,
    duration: "0:10",
    order: 3,
    isPublished: true,
  },
];

export default async function CreativeWorksPage() {
  let works;
  try {
    works = await db.creativeWork.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
    });
  } catch {
    works = SAMPLE_WORKS;
  }

  const items = works.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-1.5 text-[11px] font-medium text-blue-400/90 uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
          Creative Gallery
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">
          Motion & Video
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Motion graphics and video editing gallery created with After Effects,
          Premiere Pro, and DaVinci Resolve.
        </p>
      </div>

      <CreativeGallery works={items} />
    </section>
  );
}
