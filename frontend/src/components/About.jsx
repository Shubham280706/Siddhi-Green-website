import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Building2, Leaf, ShieldCheck, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { aboutData, expertiseData } from '../mockData';
import { Reveal } from './Reveal';

gsap.registerPlugin(ScrollTrigger);

const featureIcons = [Building2, ShieldCheck, Leaf];

export const About = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const context = gsap.context(() => {
      const statValues = gsap.utils.toArray('.about-stat-value');

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
          start: 'top 86%',
          once: true,
          onEnter: () => {
            gsap.to(counter, {
              value: Number(numericMatch[0]),
              duration: 1.8,
              ease: 'power2.out',
              onUpdate: () => {
                valueElement.textContent = `${Math.round(counter.value)}${suffix}`;
              },
            });
          },
        });
      });

      gsap.fromTo(
        '.about-story-card',
        {
          autoAlpha: 0,
          y: 48,
          scale: 0.97,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section.querySelector('.about-story-grid'),
            start: 'top 84%',
          },
        },
      );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50/40 to-white py-24">
      <div className="motion-mesh">
        <div className="section-orb left-[-5rem] top-20 h-72 w-72 bg-orange-200/30"></div>
        <div className="section-orb section-orb-delay bottom-[-3rem] right-[-3rem] h-80 w-80 bg-emerald-200/25"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="space-y-8">
            <div className="space-y-5">
              <Badge className="bg-orange-100 px-4 py-1 text-orange-700 hover:bg-orange-100">
                About Us
              </Badge>
              <h2 className="max-w-3xl text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                Built on trust, compliance, and sustainable progress.
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                {aboutData.story}
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">
              <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
                <Sparkles className="h-4 w-4" />
                {aboutData.tagline}
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {aboutData.highlights.map((highlight, index) => {
                  const Icon = featureIcons[index];

                  return (
                    <div key={highlight} className="about-story-card rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-orange-50/60 p-5 shadow-sm">
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="text-sm leading-6 text-gray-700">{highlight}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {aboutData.stats.map((stat, index) => (
                <Reveal key={stat.label} delay={index * 80}>
                  <div className="rounded-2xl border border-orange-100 bg-white/90 p-5 text-center shadow-sm">
                    <p
                      className="about-stat-value bg-gradient-to-r from-orange-600 to-emerald-600 bg-clip-text text-3xl font-bold text-transparent"
                      data-value={stat.value}
                    >
                      0+
                    </p>
                    <p className="mt-2 text-sm font-medium text-gray-600">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={220}>
              <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-700">
                      Certifications
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">
                      Recognized expertise and accredited capability
                    </h3>
                  </div>
                  <Badge className="hidden bg-emerald-100 px-4 py-1 text-emerald-700 hover:bg-emerald-100 sm:inline-flex">
                    Compliance Ready
                  </Badge>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {expertiseData[0].items.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-orange-100 bg-gradient-to-br from-white to-orange-50/60 px-4 py-4 text-sm font-medium text-gray-700 shadow-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative">
              <div className="absolute -left-6 -top-6 hidden rounded-2xl border border-white/70 bg-white/90 px-5 py-4 shadow-xl lg:block">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
                  Siddhi Green Excellence
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Ankleshwar pride with a practical environmental vision.
                </p>
              </div>

              <div className="overflow-hidden rounded-[2rem] border-4 border-white/80 bg-white p-3 shadow-[0_30px_80px_rgba(15,23,42,0.16)]">
                <img
                  src="/about-clock-tower.jpg"
                  alt="Siddhi Green Excellence building with the vertical sun clock facade"
                  className="h-full w-full rounded-[1.4rem] object-cover"
                />
              </div>

              <Card className="absolute -bottom-8 right-4 w-[18rem] border-0 bg-gray-950 text-white shadow-2xl sm:right-8">
                <CardContent className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
                    Our Presence
                  </p>
                  <p className="mt-3 text-2xl font-bold">Ankleshwar, Gujarat</p>
                  <p className="mt-3 text-sm leading-6 text-gray-300">
                    A locally rooted team supporting clients with environmental insight, strategic clarity, and dependable execution.
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-emerald-300">
                    Growing with industry
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </Reveal>
        </div>

        <div className="about-story-grid mt-24 grid gap-8 lg:grid-cols-3">
          <Reveal>
            <Card className="about-story-card h-full rounded-[2rem] border border-orange-100 bg-gradient-to-br from-orange-50 to-white shadow-sm">
              <CardContent className="p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-700">Mission</p>
                <p className="mt-4 text-lg leading-8 text-gray-700">{aboutData.mission}</p>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={100}>
            <Card className="about-story-card h-full rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-white to-emerald-50 shadow-sm">
              <CardContent className="p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Vision</p>
                <p className="mt-4 text-lg leading-8 text-gray-700">{aboutData.vision}</p>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={180}>
            <Card className="about-story-card h-full rounded-[2rem] border border-gray-100 bg-gray-950 text-white shadow-sm">
              <CardContent className="p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">Why Teams Choose Us</p>
                <ul className="mt-5 space-y-4">
                  {aboutData.values.map((value) => (
                    <li key={value.title} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                      <p className="font-semibold">{value.title}</p>
                      <p className="mt-1 text-sm leading-6 text-gray-300">{value.description}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
