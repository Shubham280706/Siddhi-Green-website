import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Badge } from './ui/badge';
import { clientsData } from '../mockData';
import { Reveal } from './Reveal';

gsap.registerPlugin(ScrollTrigger);

export const Clients = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        '.client-card',
        {
          autoAlpha: 0,
          y: 36,
          scale: 0.96,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section.querySelector('.clients-grid'),
            start: 'top 84%',
          },
        },
      );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} id="clients" className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-white py-24">
      <div className="motion-mesh">
        <div className="section-orb left-[-4rem] top-24 h-64 w-64 bg-sky-200/25"></div>
        <div className="section-orb section-orb-delay bottom-[-4rem] right-[-4rem] h-72 w-72 bg-emerald-200/25"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto mb-14 max-w-5xl text-center">
          <Badge className="bg-slate-100 px-4 py-1 text-slate-700 hover:bg-slate-100">
            Our Clients
          </Badge>
          <h2 className="mt-4 text-4xl font-bold text-slate-900 sm:text-5xl">
            Trusted by 300+ happy clients across Gujarat
          </h2>
          <p className="mx-auto mt-5 max-w-4xl text-lg leading-8 text-slate-600">
            We are proud to support businesses with environmental compliance, sustainability planning, and practical consulting that helps them move forward with confidence.
          </p>
        </Reveal>

        <div className="mx-auto mb-10 max-w-6xl overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 p-3 shadow-[0_24px_70px_rgba(15,23,42,0.10)]">
          <img
            src="/clients-showcase-reference.png"
            alt="Client showcase reference"
            className="h-full w-full rounded-[1.5rem] object-cover"
          />
        </div>

        <div className="clients-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {clientsData.map((client, index) => (
            <Reveal key={client} delay={index * 35}>
              <div className="client-card flex min-h-[126px] items-center justify-center rounded-[1.6rem] border border-slate-100 bg-white/95 p-6 text-center shadow-[0_16px_40px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(15,23,42,0.11)]">
                <p className="text-lg font-semibold leading-7 text-slate-700">{client}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
