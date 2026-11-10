// src/app/page.tsx
import Hero from "@/components/sections/hero";
import { SlideCards } from "@/components/sections/slide-cards";
import Footer from "@/components/layout/footer";

export const metadata = {
  title: "AFIL PM — Full-Stack Web Developer & Motion Graphics Designer",
  description: "Premium portfolio showcasing web development, motion graphics, video editing, and creative design.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <SlideCards />
      </main>
      <Footer />
    </div>
  );
}
