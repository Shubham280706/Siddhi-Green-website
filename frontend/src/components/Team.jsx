import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { LinkedinIcon, Mail } from 'lucide-react';
import { teamData } from '../mockData';

export const Team = () => {
  return (
    <section id="team" className="py-24 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 px-4 py-1">
            Our Team
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Meet Our Experts
          </h2>
          <p className="text-lg text-gray-600">
            Experienced professionals committed to environmental excellence
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamData.map((member) => (
            <Card 
              key={member.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-emerald-200 bg-white"
            >
              {/* Member Image */}
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Social Links - appear on hover */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
                    <LinkedinIcon className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-emerald-600 font-semibold mb-3">
                  {member.position}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  {member.qualification}
                </p>
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 text-xs">
                  {member.specialization}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Join Team CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-xl border-2 border-gray-100 max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Join Our Team
            </h3>
            <p className="text-gray-600 text-lg mb-8">
              We're always looking for talented environmental professionals to join our growing team
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-purple-600 hover:from-emerald-700 hover:to-purple-700 text-white px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View Career Opportunities
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
