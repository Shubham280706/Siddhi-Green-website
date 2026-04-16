import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Flag, Shield, Award, Star, MapPin,
  Building2, Users, Leaf, TrendingUp, Sparkles,
} from 'lucide-react';
import { Badge } from './ui/badge';
import { timelineData } from '../mockData';
import { Reveal } from './Reveal';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  flag: Flag,
  shield: Shield,
  award: Award,
  star: Star,
  'map-pin': MapPin,
  'building-2': Building2,
  users: Users,
  leaf: Leaf,
  'trending-up': TrendingUp,
  sparkles: Sparkles,
};

/* ─── Sub-components ──────────────────────────────────────────────────────── */

const TLCard = ({ item, Icon, isRight = false }) => {
  const em = item.color === 'emerald';
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border p-5 sm:p-6
        backdrop-blur-sm transition-all duration-300 hover:scale-[1.025]
        bg-white/[0.03]
        ${em
          ? 'border-emerald-500/20 hover:border-emerald-500/40'
          : 'border-purple-500/20 hover:border-purple-500/40'
        }`}
    >
      {/* Large year watermark */}
      <span
        className={`pointer-events-none select-none absolute -top-3 text-[5.5rem] font-black leading-none
          ${isRight ? 'left-3' : 'right-3'}
          ${em ? 'text-emerald-500/[0.07]' : 'text-purple-500/[0.07]'}`}
      >
        {item.year}
      </span>

      {/* Top row: badge + icon */}
      <div className="relative flex items-center justify-between mb-4">
        <span
          className={`inline-block rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase
            ${em ? 'bg-emerald-500/10 text-emerald-400' : 'bg-purple-500/10 text-purple-400'}`}
        >
          {item.category}
        </span>
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl
            ${em ? 'bg-emerald-500/10' : 'bg-purple-500/10'}`}
        >
          {Icon && (
            <Icon className={`h-4 w-4 ${em ? 'text-emerald-400' : 'text-purple-400'}`} />
          )}
        </div>
      </div>

      {/* Year label — mobile only (desktop shows it under the node) */}
      <p className={`md:hidden mb-1 text-xs font-bold ${em ? 'text-emerald-500' : 'text-purple-500'}`}>
        {item.year}
      </p>

      {/* Title */}
      <h3 className="relative text-lg font-bold text-white mb-2 leading-snug group-hover:text-white/90 transition-colors">
        {item.title}
      </h3>

      {/* Description */}
      <p className="relative text-sm leading-relaxed text-white/45 group-hover:text-white/60 transition-colors">
        {item.description}
      </p>
    </div>
  );
};

const TLNode = ({ item, Icon, large = false }) => {
  const em = item.color === 'emerald';
  const size  = large ? 'h-14 w-14' : 'h-12 w-12';
  const iSize = large ? 'h-6 w-6'  : 'h-5 w-5';
  return (
    <div
      className={`tl-node relative flex ${size} shrink-0 items-center justify-center rounded-full border-2 bg-gray-950 z-10
        ${em ? 'tl-node-em' : 'tl-node-pu'}`}
    >
      {Icon && <Icon className={`${iSize} ${em ? 'text-emerald-400' : 'text-purple-400'}`} />}
    </div>
  );
};

/* ─── Main component ──────────────────────────────────────────────────────── */

export const CompanyTimeline = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // Draw the centre line on scroll
      gsap.set('.tl-line-fill', { scaleY: 0, transformOrigin: 'top center' });
      gsap.to('.tl-line-fill', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.tl-track',
          start: 'top 65%',
          end: 'bottom 78%',
          scrub: 1.2,
        },
      });

      // Node entrance — scale + glow pop
      gsap.utils.toArray('.tl-node').forEach((node) => {
        gsap.fromTo(
          node,
          { scale: 0, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.7,
            ease: 'back.out(2.5)',
            scrollTrigger: { trigger: node, start: 'top 84%' },
          },
        );
      });

      // Desktop card entrances — alternate left/right
      mm.add('(min-width: 768px)', () => {
        gsap.utils.toArray('.tl-card-dk').forEach((card, i) => {
          const xFrom = i % 2 === 0 ? -60 : 60;
          gsap.fromTo(
            card,
            { autoAlpha: 0, x: xFrom, y: 18, filter: 'blur(4px)' },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              filter: 'blur(0px)',
              duration: 1.0,
              ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 84%' },
            },
          );
        });
      });

      // Mobile card entrances — slide from right
      mm.add('(max-width: 767px)', () => {
        gsap.utils.toArray('.tl-card-mb').forEach((card) => {
          gsap.fromTo(
            card,
            { autoAlpha: 0, x: 30, y: 10 },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 86%' },
            },
          );
        });
      });
    }, section);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-gray-950 via-[#060e0b] to-gray-950"
    >
      {/* Background decorations */}
      <div className="motion-mesh">
        <div className="motion-grid opacity-20" />
        <div className="section-orb left-[-6rem] top-24 h-96 w-96 bg-emerald-500/10" />
        <div className="section-orb section-orb-delay bottom-[-6rem] right-[-4rem] h-80 w-80 bg-purple-500/10" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="mb-16 md:mb-20 text-center space-y-4">
          <Badge className="border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-emerald-400 hover:bg-emerald-500/10">
            Our Journey
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            25 Years of{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
              Environmental Excellence
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-white/55">
            From a two-person consultancy in Ankleshwar to one of Gujarat's most trusted environmental firms
            — a story written one project at a time.
          </p>
        </Reveal>

        {/* ── Timeline ──────────────────────────────────────────────────────── */}
        <div className="tl-track relative max-w-5xl mx-auto">
          {/* Background track line */}
          <div className="pointer-events-none absolute left-6 top-0 bottom-0 w-px bg-white/5 md:left-1/2 md:-translate-x-1/2" />
          {/* Animated fill line */}
          <div className="tl-line-fill pointer-events-none absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-400 via-teal-300 to-purple-500 md:left-1/2 md:-translate-x-1/2" />

          <div className="flex flex-col">
            {timelineData.map((item, index) => {
              const Icon   = iconMap[item.icon];
              const isEven = index % 2 === 0; // even = card on left (desktop)
              const em     = item.color === 'emerald';

              return (
                <div key={item.id} className="relative py-5 md:py-8">

                  {/* ── MOBILE layout ─────────────────────────────────── */}
                  <div className="md:hidden flex items-start">
                    {/* Node — absolute on the left line */}
                    <div className="absolute left-0 top-6 z-10">
                      <TLNode item={item} Icon={Icon} />
                    </div>
                    {/* Card — offset right of node */}
                    <div className="tl-card-mb ml-16 flex-1 min-w-0">
                      <TLCard item={item} Icon={Icon} />
                    </div>
                  </div>

                  {/* ── DESKTOP layout ────────────────────────────────── */}
                  <div className="hidden md:grid grid-cols-[1fr_5.5rem_1fr] items-start">

                    {/* Left column */}
                    <div className="flex justify-end pr-8">
                      {isEven && (
                        <div className="tl-card-dk w-full max-w-md">
                          <TLCard item={item} Icon={Icon} isRight />
                        </div>
                      )}
                    </div>

                    {/* Centre: node + year */}
                    <div className="flex flex-col items-center gap-2 pt-3">
                      <TLNode item={item} Icon={Icon} large />
                      <span
                        className={`text-[10px] font-bold tracking-[0.22em] uppercase
                          ${em ? 'text-emerald-500' : 'text-purple-500'}`}
                      >
                        {item.year}
                      </span>

                      {/* Connector dot */}
                      <div
                        className={`w-px flex-1 min-h-[2rem]
                          ${em ? 'bg-emerald-500/15' : 'bg-purple-500/15'}`}
                      />
                    </div>

                    {/* Right column */}
                    <div className="flex justify-start pl-8">
                      {!isEven && (
                        <div className="tl-card-dk w-full max-w-md">
                          <TLCard item={item} Icon={Icon} />
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* End cap — "and beyond" */}
          <div className="relative flex flex-col items-center gap-3 pt-2 pb-4 md:ml-[calc(50%-1.375rem)]">
            <div className="tl-node flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/10 bg-gray-900">
              <span className="text-white/30 text-xs font-bold">···</span>
            </div>
            <p className="text-xs text-white/25 tracking-widest uppercase font-medium">The story continues</p>
          </div>
        </div>
      </div>
    </section>
  );
};
