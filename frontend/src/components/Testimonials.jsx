import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Quote, Star } from 'lucide-react';
import { testimonialsData } from '../mockData';
import { Reveal } from './Reveal';

gsap.registerPlugin(ScrollTrigger);

export const Testimonials = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

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
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-16 md:py-24 bg-white">
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

        <div className="testimonials-grid grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
