import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "@/App.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomePage } from "@/components/HomePage";
import { AboutPage } from "@/components/AboutPage";
import { Toaster } from "@/components/ui/sonner";
import { smoothScrollTo } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const location = useLocation();

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

  useEffect(() => {
    const hash = location.hash?.replace("#", "");

    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        requestAnimationFrame(() => {
          smoothScrollTo(element, { offset: -80 });
        });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
