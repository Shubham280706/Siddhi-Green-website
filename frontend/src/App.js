import React from "react";
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

function App() {
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
