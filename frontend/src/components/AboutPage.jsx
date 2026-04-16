import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Eye, Shield, Target, TrendingUp, Users } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { aboutData, expertiseData } from '../mockData';
import { Reveal } from './Reveal';
import { Clients } from './Clients';
import { Contact } from './Contact';

gsap.registerPlugin(ScrollTrigger);

const valueIcons = [Award, Shield, TrendingUp, Users];

export const AboutPage = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const context = gsap.context(() => {
      const statValues = gsap.utils.toArray('.about-page-stat-value');

      statValues.forEach((valueElement) => {
        const finalValue = valueElement.dataset.value ?? '';
        const numericMatch = finalValue.match(/\d+/);

        if (!numericMatch) {
          return;
        }

        const suffix = finalValue.replace(numericMatch[0], '');
        const counter = { value: 0 };

        ScrollTrigger.create({
          trigger: valueElement,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.to(counter, {
              value: Number(numericMatch[0]),
              duration: 1.6,
              ease: 'power2.out',
              onUpdate: () => {
                valueElement.textContent = `${Math.round(counter.value)}${suffix}`;
              },
            });
          },
        });
      });

      // Stat cards — alternating parallax depths to create a floating shelf effect
      const statCards = gsap.utils.toArray('.about-stat-card');
      const statYAmounts = [-22, -14, -28, -18];
      const statScrubs   = [1.6, 1.0, 1.9, 1.2];
      statCards.forEach((card, i) => {
        gsap.to(card, {
          y: statYAmounts[i % statYAmounts.length],
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: statScrubs[i % statScrubs.length],
          },
        });
      });

      // Values cards — subtle upward float at different rates
      const valueCards = gsap.utils.toArray('.about-value-card');
      valueCards.forEach((card, i) => {
        gsap.to(card, {
          y: i % 2 === 0 ? -16 : -26,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: i % 2 === 0 ? 1.4 : 0.9,
          },
        });
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <main className="pt-20">
      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/30 to-white py-16 md:py-24"
      >
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(148,163,184,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.10) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div className="motion-mesh">
          <div className="section-orb left-[-4rem] top-24 h-72 w-72 bg-emerald-200/25"></div>
          <div className="section-orb section-orb-delay bottom-[-4rem] right-[-4rem] h-72 w-72 bg-purple-200/20"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto mb-16 max-w-4xl text-center">
            <Badge className="bg-purple-100 px-4 py-1 text-purple-700 hover:bg-purple-100">
              About Us
            </Badge>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Expertise You Can Trust
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Certified professionals delivering excellence in environmental consulting for over 15 years
            </p>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <Card className="rounded-[2rem] border-2 border-emerald-200 bg-white/95 shadow-[0_18px_50px_rgba(16,185,129,0.10)]">
                <CardContent className="p-8 sm:p-10">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                      <Target className="h-7 w-7 text-emerald-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
                  </div>
                  <p className="text-lg leading-9 text-slate-600">{aboutData.mission}</p>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={120}>
              <Card className="rounded-[2rem] border-2 border-purple-200 bg-white/95 shadow-[0_18px_50px_rgba(168,85,247,0.10)]">
                <CardContent className="p-8 sm:p-10">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-100">
                      <Eye className="h-7 w-7 text-purple-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Our Vision</h2>
                  </div>
                  <p className="text-lg leading-9 text-slate-600">{aboutData.vision}</p>
                </CardContent>
              </Card>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {aboutData.stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 70}>
                <Card className="about-stat-card rounded-[1.8rem] border border-slate-100 bg-white/95 shadow-[0_14px_40px_rgba(15,23,42,0.08)] will-change-transform">
                  <CardContent className="p-8 text-center">
                    <p
                      className="about-page-stat-value bg-gradient-to-r from-slate-600 to-purple-600 bg-clip-text text-4xl sm:text-5xl font-bold text-transparent"
                      data-value={stat.value}
                    >
                      0+
                    </p>
                    <p className="mt-4 text-xl font-medium text-slate-600">{stat.label}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 md:mt-24">
            <Reveal className="mb-12 text-center">
              <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl">Our Core Values</h2>
            </Reveal>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
              {aboutData.values.map((value, index) => {
                const Icon = valueIcons[index];

                return (
                  <Reveal key={value.title} delay={index * 80}>
                    <Card className="about-value-card rounded-[2rem] border border-slate-100 bg-white/95 shadow-[0_14px_40px_rgba(15,23,42,0.08)] will-change-transform">
                      <CardContent className="flex flex-col items-center justify-center p-6 sm:p-8 text-center py-8 sm:py-10">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-50 to-purple-50">
                          <Icon className="h-10 w-10 text-emerald-600" />
                        </div>
                        <h3 className="mt-8 text-3xl font-bold text-slate-900">{value.title}</h3>
                        <p className="mt-5 text-lg leading-9 text-slate-600">{value.description}</p>
                      </CardContent>
                    </Card>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div className="mt-12 md:mt-24 max-w-5xl mx-auto">
            <Reveal className="mb-12 text-center">
              <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl">
                Certifications & Expertise
              </h2>
            </Reveal>

            <Accordion type="single" collapsible className="space-y-5">
              {expertiseData.map((expertise, index) => (
                <Reveal key={expertise.category} delay={index * 90}>
                  <AccordionItem
                    value={`about-item-${index}`}
                    className="rounded-[1.8rem] border border-slate-100 bg-white/95 px-4 sm:px-8 shadow-[0_14px_40px_rgba(15,23,42,0.08)]"
                  >
                    <AccordionTrigger className="py-6 text-xl font-semibold text-slate-900 hover:no-underline">
                      {expertise.category}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <ul className="space-y-3">
                        {expertise.items.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-base leading-7 text-slate-600">
                            <span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Reveal>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <Clients />
      <Contact />
    </main>
  );
};
