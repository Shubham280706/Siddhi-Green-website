import React, { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "@/App.css";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Team } from "@/components/Team";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.1,
      lerp: 0.08,
    });

    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const updateScroll = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateScroll);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(updateScroll);
      lenis.off("scroll", ScrollTrigger.update);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Projects />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
