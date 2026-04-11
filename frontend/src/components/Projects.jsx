import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowRight, ExternalLink, MapPin } from 'lucide-react';
import { projectsData } from '../mockData';
import { Reveal } from './Reveal';

gsap.registerPlugin(ScrollTrigger);

export const Projects = () => {
  const sectionRef = useRef(null);
  const pinnedShellRef = useRef(null);
  const horizontalTrackRef = useRef(null);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pinnedShell = pinnedShellRef.current;
    const horizontalTrack = horizontalTrackRef.current;
    const progress = progressRef.current;
    const mm = gsap.matchMedia();

    if (!section) {
      return undefined;
    }

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-card-shell');

      const animateCards = () => {
        cards.forEach((card, index) => {
          const image = card.querySelector('.project-parallax-image');
          const direction = index % 2 === 0 ? -48 : 48;

          gsap.fromTo(
            card,
            {
              autoAlpha: 0,
              x: direction,
              y: 56,
              rotateZ: index % 2 === 0 ? -1.5 : 1.5,
            },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              rotateZ: 0,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 84%',
              },
            },
          );

          if (image) {
            gsap.fromTo(
              image,
              { yPercent: -10, scale: 1.14 },
              {
                yPercent: 10,
                scale: 1.02,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1.2,
                },
              },
            );
          }
        });
      };

      mm.add('(min-width: 1024px)', () => {
        if (!pinnedShell || !horizontalTrack) {
          return undefined;
        }

        const panels = gsap.utils.toArray('.project-horizontal-panel');

        const setProgress = (value) => {
          if (progress) {
            progress.style.setProperty('--project-progress', `${value}%`);
          }
        };

        gsap.set(horizontalTrack, { x: 0 });

        const scrollAnimation = gsap.to(horizontalTrack, {
          x: () => -(horizontalTrack.scrollWidth - pinnedShell.offsetWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: pinnedShell,
            start: 'top top',
            end: () => `+=${Math.max(horizontalTrack.scrollWidth - pinnedShell.offsetWidth, 0)}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setProgress(self.progress * 100);
            },
          },
        });

        panels.forEach((panel, index) => {
          const image = panel.querySelector('.project-parallax-image');
          const body = panel.querySelector('.project-copy');

          gsap.fromTo(
            panel,
            {
              autoAlpha: 0.35,
              y: 80,
              rotateY: index % 2 === 0 ? 14 : -14,
              scale: 0.9,
            },
            {
              autoAlpha: 1,
              y: 0,
              rotateY: 0,
              scale: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollAnimation,
                start: 'left 78%',
                end: 'right 45%',
                scrub: 0.7,
              },
            },
          );

          if (image) {
            gsap.fromTo(
              image,
              { xPercent: -8, scale: 1.18 },
              {
                xPercent: 8,
                scale: 1.04,
                ease: 'none',
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: scrollAnimation,
                  start: 'left right',
                  end: 'right left',
                  scrub: 1,
                },
              },
            );
          }

          if (body) {
            gsap.fromTo(
              body,
              { autoAlpha: 0, y: 40 },
              {
                autoAlpha: 1,
                y: 0,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: scrollAnimation,
                  start: 'left 68%',
                  end: 'left 38%',
                  scrub: 0.7,
                },
              },
            );
          }
        });

        return () => {
          setProgress(0);
        };
      });

      mm.add('(max-width: 1023px)', () => {
        animateCards();
      });
    }, section);

    return () => {
      mm.revert();
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative overflow-hidden bg-white py-24 lg:py-16">
      <div className="motion-mesh">
        <div className="section-orb left-[-6rem] top-20 h-80 w-80 bg-emerald-200/25"></div>
        <div className="section-orb section-orb-delay bottom-0 right-[-4rem] h-72 w-72 bg-purple-200/30"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 px-4 py-1">
            Our Work
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600">
            Delivering successful environmental solutions across diverse industries
          </p>
        </Reveal>

        <Reveal className="mb-8 hidden lg:flex items-center justify-between gap-8">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
              Pinned Scroll Showcase
            </p>
            <p className="mt-3 text-base text-gray-600">
              Scroll down to move sideways through our case studies. Each panel stays large, cinematic, and pinned while the story unfolds.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
            <span>Scroll to explore</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </Reveal>

        <div
          ref={pinnedShellRef}
          data-projects-anchor="true"
          className="hidden lg:flex min-h-[calc(100vh-5rem)] flex-col justify-center"
        >
          <div className="mb-6 h-1.5 w-full rounded-full bg-gray-200/80">
            <div ref={progressRef} className="project-progress-rail h-full rounded-full"></div>
          </div>

          <div ref={horizontalTrackRef} className="flex items-center gap-8 will-change-transform">
            {projectsData.map((project) => (
              <div
                key={project.id}
                className="project-horizontal-panel flex h-[72vh] min-h-[620px] w-full shrink-0 items-stretch overflow-hidden rounded-[2rem]"
              >
                <Card className="project-card-shell project-sheen flex h-full w-full overflow-hidden border-2 border-white/70 bg-white/92 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
                  <div className="relative w-[48%] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-parallax-image h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/20 via-transparent to-transparent"></div>
                    <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-gray-950/90 via-gray-950/30 to-transparent"></div>
                    <Badge className="absolute left-6 top-6 bg-white/92 text-emerald-700 backdrop-blur-sm">
                      {project.category}
                    </Badge>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-200">
                        Case Study {String(project.id).padStart(2, '0')}
                      </p>
                      <h3 className="mt-3 text-3xl font-bold leading-tight">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <CardContent className="project-copy flex w-[52%] flex-col justify-between p-10 xl:p-12">
                    <div>
                      <div className="mb-5 flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{project.client}</span>
                      </div>

                      <p className="max-w-xl text-lg leading-relaxed text-gray-600">
                        {project.description}
                      </p>
                    </div>

                    <div className="my-10 space-y-3">
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-900">
                        Key Results
                      </p>
                      {project.results.map((result, idx) => (
                        <div key={idx} className="flex items-start space-x-2 rounded-full bg-emerald-50/80 px-4 py-3">
                          <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-600"></div>
                          <span className="text-sm text-gray-600">{result}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="ghost"
                      className="w-fit p-0 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 group/btn"
                    >
                      View Case Study
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:hidden">
          {projectsData.map((project) => (
            <Reveal
              key={project.id}
              delay={(project.id - 1) * 110}
              className="h-full"
            >
              <Card className="project-card-shell project-sheen tilt-card glass-panel group overflow-hidden border-2 border-white/70 bg-white/90 shadow-[0_28px_65px_rgba(15,23,42,0.08)] transition-all duration-500 hover:border-emerald-200 hover:shadow-2xl">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-parallax-image w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"></div>
                  <Badge className="absolute top-4 right-4 bg-white/90 text-emerald-700 backdrop-blur-sm">
                    {project.category}
                  </Badge>
                </div>

                <CardContent className="p-8">
                  <h3 className="mb-2 text-2xl font-bold text-gray-900 transition-colors group-hover:text-emerald-600">
                    {project.title}
                  </h3>

                  <div className="mb-4 flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{project.client}</span>
                  </div>

                  <p className="mb-6 leading-relaxed text-gray-600">
                    {project.description}
                  </p>

                  <div className="mb-6 space-y-3">
                    <p className="text-sm font-semibold text-gray-900">Key Results:</p>
                    {project.results.map((result, idx) => (
                      <div key={idx} className="flex items-start space-x-2 rounded-full bg-emerald-50/80 px-3 py-2">
                        <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-600"></div>
                        <span className="text-sm text-gray-600">{result}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    className="group/btn p-0 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    View Case Study
                    <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </Button>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
