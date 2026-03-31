import React from 'react';
import { ArrowRight, Award, Shield, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { heroData } from '../mockData';

export const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-emerald-200">
              <Award className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-gray-700">ISO 14001:2015 Certified</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-gray-900">Leading the Way in</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-purple-600 bg-clip-text text-transparent">
                  Environmental Excellence
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                {heroData.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={() => scrollToSection('contact')}
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-6 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                {heroData.cta.primary}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                onClick={() => scrollToSection('services')}
                size="lg"
                variant="outline"
                className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-6 rounded-full text-lg transition-all duration-300"
              >
                {heroData.cta.secondary}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8">
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

          {/* Hero Image/Illustration */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
                alt="Environmental Consultancy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-transparent to-transparent"></div>
              
              {/* Floating Cards */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl">
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
