import React from 'react';
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

export const About = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-emerald-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 px-4 py-1">
            About Us
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Expertise You Can Trust
          </h2>
          <p className="text-lg text-gray-600">
            Certified professionals delivering excellence in environmental consulting for over 15 years
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-white border-2 border-emerald-200 shadow-lg hover:shadow-xl transition-shadow">
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

          <Card className="bg-white border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
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
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {aboutData.stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-gray-100"
            >
              <p className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </p>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutData.values.map((value, index) => {
              const icons = [Award, Shield, TrendingUp, Users];
              const IconComponent = icons[index];
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-emerald-200"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-100 to-purple-100 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h4>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Expertise & Certifications */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Certifications & Expertise
          </h3>
          <Accordion type="single" collapsible className="space-y-4">
            {expertiseData.map((expertise, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-2xl border-2 border-gray-100 px-6 shadow-md hover:shadow-lg transition-shadow"
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
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
