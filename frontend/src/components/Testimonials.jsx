import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowRight, Quote, Star } from 'lucide-react';
import { testimonialsData } from '../mockData';
import { Reveal } from './Reveal';

gsap.registerPlugin(ScrollTrigger);

export const Testimonials = () => {
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
      gsap.to('.testimonial-orb', {
        yPercent: -18,
        xPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      mm.add('(min-width: 1024px)', () => {
        if (!pinnedShell || !horizontalTrack) {
          return undefined;
        }

        const panels = gsap.utils.toArray('.testimonial-rail-panel');

        const setProgress = (value) => {
          if (progress) {
            progress.style.setProperty('--project-progress', `${value}%`);
          }
        };

        const scrollAnimation = gsap.to(horizontalTrack, {
          x: () => -(horizontalTrack.scrollWidth - pinnedShell.offsetWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: pinnedShell,
            start: 'top top',
            end: () => `+=${Math.max(horizontalTrack.scrollWidth - pinnedShell.offsetWidth, 0)}`,
            pin: true,
            scrub: 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setProgress(self.progress * 100),
          },
        });

        panels.forEach((panel, index) => {
          gsap.fromTo(
            panel,
            {
              autoAlpha: index === 0 ? 1 : 0.28,
              scale: index === 0 ? 1 : 0.82,
              rotateY: index % 2 === 0 ? 12 : -12,
              y: 20,
            },
            {
              autoAlpha: 1,
              scale: 1,
              rotateY: 0,
              y: 0,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollAnimation,
                start: 'left 72%',
                end: 'center center',
                scrub: 0.55,
              },
            },
          );

          gsap.to(panel.querySelector('.testimonial-quote-shell'), {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollAnimation,
              start: 'left right',
              end: 'right left',
              scrub: 1,
            },
          });

          gsap.fromTo(
            panel.querySelector('.testimonial-copy'),
            {
              autoAlpha: 0,
              y: 34,
            },
            {
              autoAlpha: 1,
              y: 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollAnimation,
                start: 'left 64%',
                end: 'left 40%',
                scrub: 0.6,
              },
            },
          );
        });

        return () => setProgress(0);
      });

      mm.add('(max-width: 1023px)', () => {
        gsap.fromTo(
          '.testimonial-card',
          {
            autoAlpha: 0,
            y: 70,
            rotateZ: -2,
            scale: 0.92,
          },
          {
            autoAlpha: 1,
            y: 0,
            rotateZ: 0,
            scale: 1,
            duration: 1.05,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section.querySelector('.testimonials-grid'),
              start: 'top 82%',
            },
          },
        );
      });
    }, section);

    return () => {
      mm.revert();
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 bg-white">
      <div className="motion-mesh">
        <div className="testimonial-orb section-orb left-[-7rem] top-24 h-80 w-80 bg-emerald-200/30"></div>
        <div className="section-orb section-orb-delay bottom-[-4rem] right-[-4rem] h-72 w-72 bg-purple-200/30"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 px-4 py-1">
            Testimonials
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600">
            Trusted by leading organizations across industries
          </p>
        </Reveal>

        <Reveal className="mb-8 hidden items-center justify-between gap-8 lg:flex">
          <p className="max-w-xl text-base text-gray-600">
            A horizontal rail lets each client story take over the viewport before handing off to the next one.
          </p>
          <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
            <span>Scroll to shift panels</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </Reveal>

        <div ref={pinnedShellRef} className="hidden lg:block">
          <div className="mb-6 h-1.5 w-full rounded-full bg-gray-200/80">
            <div ref={progressRef} className="project-progress-rail h-full rounded-full"></div>
          </div>
          <div ref={horizontalTrackRef} className="flex gap-8 will-change-transform">
            {testimonialsData.map((testimonial) => (
              <div
                key={testimonial.id}
                className="testimonial-rail-panel flex h-[70vh] min-h-[560px] w-[82vw] max-w-[1120px] shrink-0 items-stretch"
              >
                <Card className="testimonial-card glass-panel group relative flex h-full w-full overflow-hidden rounded-[2rem] border-2 border-white/70 bg-white/92 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
                  <div className="testimonial-quote-shell relative flex w-[42%] items-end overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-purple-600 p-8 text-white">
                    <div className="absolute right-6 top-6 opacity-20">
                      <Quote className="h-24 w-24" />
                    </div>
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="portrait-rise absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-luminosity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"></div>
                    <div className="relative z-10">
                      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-100">
                        Client Perspective
                      </p>
                      <div className="mt-5 flex space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-300 text-yellow-300" />
                        ))}
                      </div>
                      <p className="mt-8 max-w-sm text-3xl font-semibold leading-tight">
                        “{testimonial.content}”
                      </p>
                    </div>
                  </div>

                  <CardContent className="testimonial-copy flex w-[58%] flex-col justify-between p-10 xl:p-12">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
                        Testimonial {String(testimonial.id).padStart(2, '0')}
                      </p>
                      <h3 className="mt-4 text-3xl font-bold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="mt-2 text-lg font-medium text-emerald-700">
                        {testimonial.position}
                      </p>
                      <p className="mt-1 text-sm uppercase tracking-[0.26em] text-gray-500">
                        {testimonial.company}
                      </p>
                    </div>

                    <div className="my-10 rounded-[1.5rem] border border-emerald-100 bg-emerald-50/70 p-6">
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-900">
                        Why It Matters
                      </p>
                      <p className="mt-4 text-lg leading-relaxed text-gray-600">
                        Each engagement is designed to shorten approval cycles, reduce risk exposure, and create sustainability systems that still hold up once the paperwork ends.
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                      <span className="text-sm text-gray-500">Trusted delivery across infrastructure, manufacturing, and energy.</span>
                      <Quote className="h-8 w-8 text-emerald-500/60" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="testimonials-grid grid gap-8 md:grid-cols-3 lg:hidden">
          {testimonialsData.map((testimonial) => (
            <Reveal
              key={testimonial.id}
              delay={(testimonial.id - 1) * 100}
            >
              <Card className="testimonial-card tilt-card glass-panel group relative overflow-hidden border-2 border-white/70 bg-white/90 transition-all duration-300 hover:border-emerald-200 hover:shadow-2xl">
                <div className="quote-float absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-20 h-20 text-emerald-600" />
                </div>

                <CardContent className="p-8 relative">
                  <div className="flex space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-6 italic">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center space-x-4 pt-6 border-t-2 border-gray-100">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="portrait-rise w-14 h-14 rounded-full object-cover border-2 border-emerald-200"
                    />
                    <div>
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.position}</p>
                      <p className="text-sm text-emerald-600 font-medium">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
