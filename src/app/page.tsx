import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import Advisory from "@/components/Advisory";
import Experience from "@/components/Experience";
import AIWorkflow from "@/components/AIWorkflow";
import Expertise from "@/components/Expertise";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Advisory />
      <Experience />
      <AIWorkflow />
      <Expertise />
      <About />
      <Contact />
    </>
  );
}
