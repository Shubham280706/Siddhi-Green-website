import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { smoothScrollTo } from '@/lib/scroll';
import { BrandLogo } from './BrandLogo';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isTopHoverActive, setIsTopHoverActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollY.current;

      setIsScrolled(currentScrollY > 20);

      if (currentScrollY <= 24) {
        setIsHeaderVisible(true);
      } else if (!isMobileMenuOpen && !isTopHoverActive) {
        setIsHeaderVisible(scrollingUp);
      }

      lastScrollY.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen, isTopHoverActive]);

  useEffect(() => {
    if (isMobileMenuOpen || isTopHoverActive) {
      setIsHeaderVisible(true);
    }
  }, [isMobileMenuOpen, isTopHoverActive]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const projectsAnchor =
        sectionId === 'projects' && window.innerWidth >= 1024
          ? element.querySelector('[data-projects-anchor="true"]')
          : null;

      smoothScrollTo(projectsAnchor || element, { offset: -80 });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Team', id: 'team' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <>
      <div
        className="fixed inset-x-0 top-0 z-40 h-6"
        onMouseEnter={() => setIsTopHoverActive(true)}
        onMouseLeave={() => setIsTopHoverActive(false)}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-[calc(100%-0.75rem)]'
        } ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
        onMouseEnter={() => setIsTopHoverActive(true)}
        onMouseLeave={() => setIsTopHoverActive(false)}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              <div className="brand-logo-shell hidden sm:flex">
                <BrandLogo className="h-14 w-14 shrink-0" compact />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">Siddhi Green Excellence</h1>
                <p className="text-xs text-emerald-700 font-medium tracking-[0.18em] uppercase">Environmental Consultancy</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Consultation
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200 text-left px-4 py-2 hover:bg-emerald-50 rounded-lg"
                  >
                    {item.label}
                  </button>
                ))}
                <Button
                  onClick={() => scrollToSection('contact')}
                  className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white mx-4"
                >
                  Get Consultation
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
