import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Award, Shield, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { heroData } from '../mockData';
import { smoothScrollTo } from '@/lib/scroll';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const visualRef = useRef(null);
  const heroImages = [
    {
      src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
      alt: 'Environmental consultancy workspace',
      tag: 'Planning',
      caption: 'Strategy and compliance guidance for ambitious green projects.',
    },
    {
      src: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80',
      alt: 'Sustainable energy landscape',
      tag: 'Execution',
      caption: 'Field-ready sustainability solutions across energy and infrastructure.',
    },
    {
      src: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1200&q=80',
      alt: 'Forest and environmental restoration view',
      tag: 'Restoration',
      caption: 'Long-term environmental stewardship built into every engagement.',
    },
  ];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeHeroImage = heroImages[activeImageIndex];

  useEffect(() => {
    const rotationInterval = window.setInterval(() => {
      setActiveImageIndex((currentIndex) => (currentIndex + 1) % heroImages.length);
    }, 4500);

    return () => window.clearInterval(rotationInterval);
  }, [heroImages.length]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const visual = visualRef.current;

    if (!section || !content || !visual) {
      return undefined;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      timeline
        .fromTo(
          content.querySelectorAll('.hero-copy > *'),
          { autoAlpha: 0, y: 40, filter: 'blur(10px)' },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            stagger: 0.12,
          },
        )
        .fromTo(
          visual,
          { autoAlpha: 0, x: 56, y: 32, rotateY: -8, scale: 0.94 },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotateY: 0,
            scale: 1,
            duration: 1.2,
          },
          0.1,
        );

      gsap.to(content, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      gsap.to(visual, {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.4,
        },
      });

      gsap.to(section.querySelectorAll('.hero-orb'), {
        yPercent: (_, target) => (target.dataset.speed === 'slow' ? -18 : -30),
        xPercent: (_, target) => (target.dataset.speed === 'slow' ? 8 : -10),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.6,
        },
      });
    }, section);

    return () => context.revert();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      smoothScrollTo(element, { offset: -80 });
    }
  };

  return (
    <section ref={sectionRef} id="home" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div data-speed="slow" className="hero-orb absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div data-speed="fast" className="hero-orb absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-8 lg:pb-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div ref={contentRef} className="hero-copy text-center lg:text-left space-y-6 lg:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-emerald-200">
              <Award className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-gray-700">ISO 14001:2015 Certified</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-3 lg:space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-purple-700">
                {heroData.subtitle}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-gray-900">Leading the Way in</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-purple-600 bg-clip-text text-transparent">
                  Environmental Excellence
                </span>
              </h1>
              <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                {heroData.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button
                onClick={() => scrollToSection('contact')}
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-5 sm:py-6 rounded-full text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                {heroData.cta.primary}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => scrollToSection('services')}
                size="lg"
                variant="outline"
                className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-5 sm:py-6 rounded-full text-base sm:text-lg transition-all duration-300"
              >
                {heroData.cta.secondary}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4 sm:gap-8 justify-center lg:justify-start pt-4 sm:pt-8">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                <span className="text-sm text-gray-600 font-medium">NABET Accredited</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-600 font-medium">15+ Years Experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-emerald-600" />
                <span className="text-sm text-gray-600 font-medium">500+ Projects</span>
              </div>
            </div>
          </div>

          {/* Mobile Hero Image — visible on small/medium screens only */}
          <div className="lg:hidden w-full">
            <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={activeHeroImage.src}
                alt={activeHeroImage.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-xl font-bold text-emerald-600">500+</p>
                    <p className="text-xs text-gray-600">Projects</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-purple-600">200+</p>
                    <p className="text-xs text-gray-600">Clients</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-emerald-600">15+</p>
                    <p className="text-xs text-gray-600">Years</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image/Illustration — desktop only */}
          <div className="relative hidden lg:block">
            <div ref={visualRef} className="hero-visual-shell relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              {heroImages.map((image, index) => (
                <img
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  className={`hero-image-panel absolute inset-0 h-full w-full object-cover ${
                    index === activeImageIndex
                      ? 'hero-image-current'
                      : 'hero-image-idle'
                  }`}
                />
              ))}
              <div className="hero-image-tint absolute inset-0"></div>
              <div className="hero-image-sheen absolute inset-y-0 right-0 w-1/2"></div>
              <div className="hero-grid-overlay absolute inset-0"></div>

              <div className="absolute left-8 top-8 max-w-xs rounded-2xl border border-white/30 bg-white/12 p-5 text-white backdrop-blur-md hero-float-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-100">
                  {activeHeroImage.tag}
                </p>
                <p className="mt-3 text-lg font-semibold leading-snug">
                  {activeHeroImage.caption}
                </p>
              </div>

              <div className="absolute top-8 right-8 flex gap-2">
                {heroImages.map((image, index) => (
                  <button
                    key={image.alt}
                    type="button"
                    aria-label={`Show hero image ${index + 1}`}
                    onClick={() => setActiveImageIndex(index)}
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      index === activeImageIndex
                        ? 'hero-indicator-active w-10 bg-white'
                        : 'w-2.5 bg-white/45 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
              
              {/* Floating Cards */}
              <div className="hero-card-float absolute bottom-8 left-8 right-8 bg-white/92 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/70">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-emerald-600">500+</p>
                    <p className="text-sm text-gray-600">Projects Completed</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-purple-600">200+</p>
                    <p className="text-sm text-gray-600">Happy Clients</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-emerald-600">15+</p>
                    <p className="text-sm text-gray-600">Years Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
