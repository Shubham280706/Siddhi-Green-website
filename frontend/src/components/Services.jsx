import React from 'react';
import { Leaf, Recycle, Trash2, ClipboardCheck, Droplets, Building2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { servicesData } from '../mockData';

const iconMap = {
  'leaf': Leaf,
  'recycle': Recycle,
  'trash-2': Trash2,
  'clipboard-check': ClipboardCheck,
  'droplets': Droplets,
  'building-2': Building2
};

export const Services = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 px-4 py-1">
            Our Services
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Comprehensive Environmental Solutions
          </h2>
          <p className="text-lg text-gray-600">
            From EIA to sustainability consulting, we offer end-to-end environmental services tailored to your needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <Card 
                key={service.id}
                className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-emerald-200 hover:-translate-y-2 bg-white"
              >
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
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
                        <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
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
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-600 to-purple-600 rounded-3xl p-12 shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              Need Expert Environmental Consultation?
            </h3>
            <p className="text-emerald-50 text-lg mb-8 max-w-2xl mx-auto">
              Our team of certified environmental consultants is ready to help you achieve compliance and sustainability goals
            </p>
            <Button 
              size="lg"
              onClick={scrollToContact}
              className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-6 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Request a Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
