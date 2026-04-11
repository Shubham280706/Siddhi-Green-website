import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Badge } from './ui/badge';
import { scrollChaptersData } from '../mockData';
import { Reveal } from './Reveal';

gsap.registerPlugin(ScrollTrigger);

export const ScrollChapters = () => {
  const sectionRef = useRef(null);
  const visualRef = useRef(null);
  const progressRef = useRef(null);
  const [activeChapter, setActiveChapter] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const visual = visualRef.current;
    const progress = progressRef.current;
    const mm = gsap.matchMedia();

    if (!section || !visual) {
      return undefined;
    }

    const context = gsap.context(() => {
      mm.add('(min-width: 1024px)', () => {
        const panels = gsap.utils.toArray('.chapter-copy-panel');
        const images = gsap.utils.toArray('.chapter-visual-image');

        gsap.set(images, { autoAlpha: 0, scale: 1.1 });
        gsap.set(images[0], { autoAlpha: 1, scale: 1 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${window.innerHeight * (scrollChaptersData.length * 0.95)}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progress) {
                progress.style.setProperty('--project-progress', `${self.progress * 100}%`);
              }
            },
          },
        });

        panels.forEach((panel, index) => {
          const image = images[index];

          timeline.addLabel(`chapter-${index}`);

          timeline.to(
            panel,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.42,
              ease: 'power2.out',
              onStart: () => setActiveChapter(index),
              onReverseComplete: () => setActiveChapter(Math.max(index - 1, 0)),
            },
            index === 0 ? 0 : `chapter-${index}`,
          );

          timeline.to(
            image,
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.42,
              ease: 'power2.out',
            },
            `<`,
          );

          if (index < panels.length - 1) {
            timeline.to(
              panel,
              {
                autoAlpha: 0.18,
                y: -48,
                duration: 0.32,
                ease: 'power2.inOut',
              },
              '+=0.28',
            );

            timeline.to(
              image,
              {
                autoAlpha: 0,
                scale: 1.08,
                duration: 0.32,
                ease: 'power2.inOut',
              },
              '<',
            );
          }
        });

        gsap.to(visual, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
          },
        });

        return () => {
          if (progress) {
            progress.style.setProperty('--project-progress', '0%');
          }
        };
      });

      mm.add('(max-width: 1023px)', () => {
        const mobileCards = gsap.utils.toArray('.chapter-mobile-card');
        gsap.fromTo(
          mobileCards,
          {
            autoAlpha: 0,
            y: 48,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section.querySelector('.chapter-mobile-stack'),
              start: 'top 82%',
            },
          },
        );
        setActiveChapter(0);
        if (progress) {
          progress.style.setProperty('--project-progress', '100%');
        }
        return () => {
          if (progress) {
            progress.style.setProperty('--project-progress', '0%');
          }
        };
      });
    }, section);

    return () => {
      mm.revert();
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#071511] py-10 text-white lg:min-h-screen lg:py-0">
      <div className="motion-mesh">
        <div className="motion-grid opacity-30"></div>
        <div className="section-orb left-[-6rem] top-24 h-80 w-80 bg-emerald-500/20"></div>
        <div className="section-orb section-orb-delay bottom-[-4rem] right-[-4rem] h-80 w-80 bg-purple-500/20"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-16 sm:px-6 lg:flex lg:min-h-screen lg:items-center lg:px-8">
        <div className="hidden gap-12 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <Badge className="border border-white/10 bg-white/10 px-4 py-1 text-emerald-100 hover:bg-white/10">
              Scroll Chapter Sequence
            </Badge>
            <h2 className="mt-6 max-w-xl text-4xl font-bold leading-tight sm:text-5xl">
              A cinematic walkthrough of how a project becomes environmentally ready.
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-white/70">
              Instead of dumping services immediately, this sequence stages the journey: diagnose, translate, and operationalize.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-1.5 w-40 rounded-full bg-white/10">
                <div ref={progressRef} className="project-progress-rail h-full rounded-full"></div>
              </div>
              <span className="text-sm font-medium tracking-[0.24em] text-white/60 uppercase">
                {String(activeChapter + 1).padStart(2, '0')} / {String(scrollChaptersData.length).padStart(2, '0')}
              </span>
            </div>

            <div className="relative mt-10 space-y-5 lg:min-h-[24rem] lg:space-y-0">
              {scrollChaptersData.map((chapter, index) => (
                <article
                  key={chapter.id}
                  className={`chapter-copy-panel rounded-[1.75rem] border p-6 lg:absolute lg:w-[32rem] ${
                    activeChapter === index
                      ? 'border-emerald-300/50 bg-white/12 shadow-[0_20px_60px_rgba(16,185,129,0.12)]'
                      : 'border-white/10 bg-white/[0.06]'
                  }`}
                  style={{ opacity: index === 0 ? 1 : 0.18, transform: 'translateY(0px)' }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-200">
                    {chapter.kicker}
                  </p>
                  <h3 className="mt-4 text-2xl font-bold leading-snug sm:text-3xl">
                    {chapter.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-white/72">
                    {chapter.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {chapter.points.map((point) => (
                      <span
                        key={point}
                        className="rounded-full border border-white/12 bg-white/10 px-4 py-2 text-sm text-white/82"
                      >
                        {point}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div ref={visualRef} className="relative h-[420px] lg:h-[78vh]">
            <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-white/[0.04]"></div>
            <div className="absolute inset-5 rounded-[1.75rem] border border-white/10 bg-black/20"></div>

            {scrollChaptersData.map((chapter, index) => (
              <div
                key={chapter.id}
                className="chapter-visual-image absolute inset-0 overflow-hidden rounded-[2rem]"
                style={{ opacity: index === 0 ? 1 : 0 }}
              >
                <img
                  src={chapter.image}
                  alt={chapter.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04110d] via-[#04110d]/20 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.34em] text-emerald-200">
                    Scroll Narrative
                  </p>
                  <p className="mt-4 max-w-lg text-xl font-semibold leading-snug text-white lg:text-2xl">
                    {chapter.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chapter-mobile-stack space-y-6 lg:hidden">
          <Reveal className="space-y-5">
            <Badge className="border border-white/10 bg-white/10 px-4 py-1 text-emerald-100 hover:bg-white/10">
              Scroll Chapter Sequence
            </Badge>
            <h2 className="max-w-xl text-4xl font-bold leading-tight">
              A cinematic walkthrough of how a project becomes environmentally ready.
            </h2>
            <p className="max-w-2xl text-lg text-white/70">
              Diagnose, translate, and operationalize with the same visual storytelling, without the desktop pinning.
            </p>
          </Reveal>

          {scrollChaptersData.map((chapter) => (
            <article
              key={chapter.id}
              className="chapter-mobile-card overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.06]"
            >
              <div className="relative h-72">
                <img src={chapter.image} alt={chapter.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04110d] via-[#04110d]/15 to-transparent"></div>
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-200">
                  {chapter.kicker}
                </p>
                <h3 className="mt-4 text-2xl font-bold leading-snug">{chapter.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-white/72">{chapter.description}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {chapter.points.map((point) => (
                    <span
                      key={point}
                      className="rounded-full border border-white/12 bg-white/10 px-4 py-2 text-sm text-white/82"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
