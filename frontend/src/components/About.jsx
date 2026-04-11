import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Eye, Award, Users, TrendingUp, Shield } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { aboutData, expertiseData } from '../mockData';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { Reveal } from './Reveal';

gsap.registerPlugin(ScrollTrigger);

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
        '.about-value-card',
        {
          autoAlpha: 0,
          y: 44,
          scale: 0.97,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.95,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section.querySelector('.about-values-grid'),
            start: 'top 84%',
          },
        },
      );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden py-24 bg-gradient-to-b from-white to-emerald-50">
      <div className="motion-mesh">
        <div className="motion-grid"></div>
        <div className="section-orb left-[-4rem] top-32 h-64 w-64 bg-purple-200/30"></div>
        <div className="section-orb section-orb-delay bottom-8 right-[-5rem] h-72 w-72 bg-emerald-200/35"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 px-4 py-1">
            About Us
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Expertise You Can Trust
          </h2>
          <p className="text-lg text-gray-600">
            Certified professionals delivering excellence in environmental consulting for over 15 years
          </p>
        </Reveal>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Reveal>
          <Card className="glass-panel tilt-card bg-white/90 border-2 border-emerald-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Target className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{aboutData.mission}</p>
            </CardContent>
          </Card>
          </Reveal>

          <Reveal delay={120}>
          <Card className="glass-panel tilt-card bg-white/90 border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{aboutData.vision}</p>
            </CardContent>
          </Card>
          </Reveal>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {aboutData.stats.map((stat, index) => (
            <Reveal 
              key={index}
              delay={index * 80}
            >
              <div className="tilt-card glass-panel rounded-2xl border-2 border-gray-100 bg-white/85 p-8 text-center shadow-lg transition-all duration-300 hover:shadow-xl">
                <p
                  className="about-stat-value text-4xl font-bold bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent mb-2"
                  data-value={stat.value}
                >
                  0+
                </p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <Reveal className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</Reveal>
          <div className="about-values-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutData.values.map((value, index) => {
              const icons = [Award, Shield, TrendingUp, Users];
              const IconComponent = icons[index];
              return (
                <Reveal 
                  key={index}
                  delay={index * 90}
                >
                  <div className="about-value-card tilt-card glass-panel rounded-2xl border-2 border-gray-100 bg-white/85 p-6 text-center shadow-md transition-all duration-300 hover:border-emerald-200 hover:shadow-xl">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-100 to-purple-100 flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-7 h-7 text-emerald-600" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h4>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Expertise & Certifications */}
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-3xl font-bold text-center text-gray-900 mb-12">
            Certifications & Expertise
          </Reveal>
          <Accordion type="single" collapsible className="space-y-4">
            {expertiseData.map((expertise, index) => (
              <Reveal
                key={index} 
                delay={index * 100}
              >
                <AccordionItem 
                  value={`item-${index}`}
                  className="glass-panel rounded-2xl border-2 border-gray-100 bg-white/85 px-6 shadow-md transition-shadow hover:shadow-lg"
                >
                  <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-emerald-600">
                    {expertise.category}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-3 pt-2">
                      {expertise.items.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-600 mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600">{item}</span>
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
  );
};
