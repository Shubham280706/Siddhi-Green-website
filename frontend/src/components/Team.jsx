import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { LinkedinIcon, Mail } from 'lucide-react';
import { teamData } from '../mockData';
import { Reveal } from './Reveal';

gsap.registerPlugin(ScrollTrigger);

export const Team = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        '.team-card',
        {
          autoAlpha: 0,
          y: 56,
          rotateY: -12,
          scale: 0.94,
        },
        {
          autoAlpha: 1,
          y: 0,
          rotateY: 0,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section.querySelector('.team-grid'),
            start: 'top 82%',
          },
        },
      );

      // Portrait image parallax — image moves slower than its card container
      const teamCards = gsap.utils.toArray('.team-card');
      teamCards.forEach((card) => {
        const img = card.querySelector('.team-portrait-img');
        if (!img) return;
        gsap.fromTo(
          img,
          { yPercent: -8, scale: 1.12 },
          {
            yPercent: 8,
            scale: 1.02,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.3,
            },
          },
        );
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} id="team" className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-white to-purple-50">
      <div className="motion-mesh">
        <div className="motion-grid"></div>
        <div className="section-orb left-[-5rem] bottom-16 h-72 w-72 bg-purple-200/30"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 px-4 py-1">
            Our Founders
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Meet Our Founders
          </h2>
          <p className="text-lg text-gray-600">
            The leadership team guiding Siddhi Green forward
          </p>
        </Reveal>

        {/* Team Grid */}
        <div className="team-grid grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {teamData.map((member) => (
            <Reveal
              key={member.id}
              delay={(member.id - 1) * 90}
            >
              <Card className="team-card tilt-card glass-panel group overflow-hidden border-2 border-white/70 bg-white/90 transition-all duration-300 hover:border-emerald-200 hover:shadow-2xl">
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="team-portrait-img w-full h-full object-cover will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
                      <LinkedinIcon className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
                      <Mail className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-emerald-600 font-semibold mb-3">
                    {member.position}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    {member.qualification}
                  </p>
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 text-xs">
                    {member.specialization}
                  </Badge>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* Join Team CTA */}
        <Reveal className="mt-16 text-center" delay={160}>
          <div className="project-sheen glass-panel max-w-3xl mx-auto rounded-3xl border-2 border-gray-100 bg-white/90 p-6 sm:p-12 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Join Our Team
            </h3>
            <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8">
              We're always looking for talented environmental professionals to join our growing team
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-purple-600 hover:from-emerald-700 hover:to-purple-700 text-white px-8 py-4 sm:py-6 rounded-full text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View Career Opportunities
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
