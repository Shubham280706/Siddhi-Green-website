import React from 'react';
import { Hero } from './Hero';
import { Services } from './Services';
import { About } from './About';
import { Projects } from './Projects';
import { Team } from './Team';
import { CompanyTimeline } from './CompanyTimeline';
import { Testimonials } from './Testimonials';
import { Contact } from './Contact';

export const HomePage = () => {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <Projects />
      <Team />
      <CompanyTimeline />
      <Testimonials />
      <Contact />
    </main>
  );
};
