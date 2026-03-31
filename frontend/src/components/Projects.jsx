import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, MapPin, Calendar } from 'lucide-react';
import { projectsData } from '../mockData';

export const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 px-4 py-1">
            Our Work
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600">
            Delivering successful environmental solutions across diverse industries
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <Card 
              key={project.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 hover:border-emerald-200"
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"></div>
                <Badge className="absolute top-4 right-4 bg-white/90 text-emerald-700 backdrop-blur-sm">
                  {project.category}
                </Badge>
              </div>

              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {project.title}
                </h3>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{project.client}</span>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Results */}
                <div className="space-y-3 mb-6">
                  <p className="text-sm font-semibold text-gray-900">Key Results:</p>
                  {project.results.map((result, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-600">{result}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant="ghost" 
                  className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 group/btn p-0"
                >
                  View Case Study
                  <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
