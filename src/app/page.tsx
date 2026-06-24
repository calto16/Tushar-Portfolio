import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Achievements } from "@/components/sections/achievements";
import { Github } from "@/components/sections/github";
import { Contact } from "@/components/sections/contact";
import { Marquee } from "@/components/ui/marquee";

const MARQUEE_ITEMS = [
  "Distributed Systems",
  "GenAI",
  "Kubernetes",
  "Apache Kafka",
  "Microservices",
  "RAG",
  "AWS",
  "Arch Linux",
  "Brutalism",
  "Sci-Fi",
];

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={MARQUEE_ITEMS} className="recruiter-hide" />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Achievements />
      <Github />
      <Contact />
    </>
  );
}
