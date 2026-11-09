// src/app/(public)/page.tsx
import Hero from "@/components/sections/hero";
import { Navbar } from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata = {
  title: "AFIL PM — Full-Stack Web Developer & Motion Graphics Designer",
  description: "Premium portfolio showcasing web development, motion graphics, video editing, and creative design.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
