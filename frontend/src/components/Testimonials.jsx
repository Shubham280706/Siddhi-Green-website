import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Star, Quote } from 'lucide-react';
import { testimonialsData } from '../mockData';

export const Testimonials = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 px-4 py-1">
            Testimonials
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600">
            Trusted by leading organizations across industries
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial) => (
            <Card 
              key={testimonial.id}
              className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-emerald-200 bg-white relative overflow-hidden"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-20 h-20 text-emerald-600" />
              </div>

              <CardContent className="p-8 relative">
                {/* Rating */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-4 pt-6 border-t-2 border-gray-100">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-emerald-200"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.position}</p>
                    <p className="text-sm text-emerald-600 font-medium">{testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
