import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { getProjects } from "@/lib/github";
import { skillGroups } from "@/lib/data";

export const revalidate = 300;

export default async function Home() {
  const projects = await getProjects();
  const marqueeItems = skillGroups.flatMap((g) => g.items).slice(0, 16);

  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee items={marqueeItems} />
        <About />
        <Skills />
        <Projects projects={projects} />
        <Contact />
      </main>
    </>
  );
}
