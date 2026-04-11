import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';
import { contactInfo } from '../mockData';
import { smoothScrollTo } from '@/lib/scroll';
import { BrandLogo } from './BrandLogo';

export const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      smoothScrollTo(element, { offset: -80 });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="brand-logo-shell brand-logo-shell-dark">
                <BrandLogo className="h-16 w-16 shrink-0" compact />
              </div>
              <div>
                <h3 className="text-xl font-bold leading-tight">Siddhi Green Excellence</h3>
                <p className="text-xs text-emerald-300 uppercase tracking-[0.18em]">Environmental Consultancy</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Leading environmental consultancy providing comprehensive solutions for sustainable development.
            </p>
            <div className="flex space-x-3">
              <a href={contactInfo.social.linkedin} className="w-10 h-10 rounded-full bg-gray-800 hover:bg-emerald-600 flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={contactInfo.social.twitter} className="w-10 h-10 rounded-full bg-gray-800 hover:bg-emerald-600 flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href={contactInfo.social.facebook} className="w-10 h-10 rounded-full bg-gray-800 hover:bg-emerald-600 flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-emerald-400">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'About', 'Projects', 'Team', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-emerald-400">Our Services</h4>
            <ul className="space-y-3">
              <li><button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-emerald-400 transition-colors">Environmental Impact Assessment</button></li>
              <li><button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-emerald-400 transition-colors">Sustainability Consulting</button></li>
              <li><button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-emerald-400 transition-colors">Waste Management</button></li>
              <li><button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-emerald-400 transition-colors">Environmental Auditing</button></li>
              <li><button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-emerald-400 transition-colors">Green Building Certification</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-emerald-400">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">{contactInfo.email}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">{contactInfo.phone}</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">{contactInfo.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Siddhi Green Excellence. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
