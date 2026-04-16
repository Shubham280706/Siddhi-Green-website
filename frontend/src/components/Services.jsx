import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Recycle, Trash2, ClipboardCheck, Droplets, Building2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { servicesData } from '../mockData';
import { smoothScrollTo } from '@/lib/scroll';
import { Reveal } from './Reveal';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  'leaf': Leaf,
  'recycle': Recycle,
  'trash-2': Trash2,
  'clipboard-check': ClipboardCheck,
  'droplets': Droplets,
  'building-2': Building2
};

export const Services = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray('.service-motion-card');
      const features = gsap.utils.toArray('.service-feature-item');

      gsap.to('.services-spotlight', {
        yPercent: -16,
        xPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.6,
        },
      });

      gsap.fromTo(
        cards,
        {
          autoAlpha: 0,
          y: 54,
          scale: 0.96,
          rotateX: 8,
          rotateY: -10,
          transformOrigin: '50% 100%',
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section.querySelector('.services-grid'),
            start: 'top 82%',
          },
        },
      );

      gsap.fromTo(
        features,
        { autoAlpha: 0, x: -18 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section.querySelector('.services-grid'),
            start: 'top 78%',
          },
        },
      );
    }, section);

    return () => context.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      smoothScrollTo(element, { offset: -80 });
    }
  };

  return (
    <section ref={sectionRef} id="services" className="relative overflow-hidden py-16 md:py-24 bg-white">
      <div className="motion-mesh">
        <div className="motion-grid"></div>
        <div className="services-spotlight section-orb top-10 left-[-8rem] h-72 w-72 bg-emerald-200/40"></div>
        <div className="section-orb section-orb-delay bottom-[-5rem] right-[-3rem] h-80 w-80 bg-purple-200/35"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 px-4 py-1">
            Our Services
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Comprehensive Environmental Solutions
          </h2>
          <p className="text-lg text-gray-600">
            From EIA to sustainability consulting, we offer end-to-end environmental services tailored to your needs
          </p>
        </Reveal>

        {/* Services Grid */}
        <div className="services-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <Reveal
                key={service.id}
                delay={index * 90}
                className="h-full"
              >
                <Card className="service-motion-card tilt-card spotlight-border glass-panel group h-full border-2 border-white/70 bg-white/90 shadow-[0_22px_55px_rgba(16,185,129,0.08)] transition-all duration-300 hover:border-emerald-200 hover:shadow-2xl">
                  <CardHeader>
                    <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 transition-transform duration-300 group-hover:scale-110">
                      <div className="halo-ring"></div>
                      {IconComponent && <IconComponent className="w-8 h-8 text-emerald-600" />}
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-gray-700">Key Features:</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="service-feature-item flex items-start space-x-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="mt-6 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 group/btn p-0"
                      onClick={scrollToContact}
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>

        {/* CTA Section */}
        <Reveal className="mt-16 text-center" delay={180}>
          <div className="project-sheen rounded-3xl bg-gradient-to-r from-emerald-600 to-purple-600 p-6 sm:p-12 shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
              Need Expert Environmental Consultation?
            </h3>
            <p className="text-emerald-50 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
              Our team of certified environmental consultants is ready to help you achieve compliance and sustainability goals
            </p>
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 sm:py-6 rounded-full text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Request a Consultation
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
