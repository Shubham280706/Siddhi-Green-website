import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, MapPin } from 'lucide-react';
import { projectsData } from '../mockData';
import { Reveal } from './Reveal';

gsap.registerPlugin(ScrollTrigger);

export const Projects = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-card-shell');
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
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative overflow-hidden bg-white py-16 md:py-24">
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

        <div className="grid gap-8 md:grid-cols-2">
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
