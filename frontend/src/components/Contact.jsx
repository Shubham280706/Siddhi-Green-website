import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { contactInfo } from '../mockData';
import { useToast } from '../hooks/use-toast';
import { Reveal } from './Reveal';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const { toast } = useToast();
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    console.log('Form submitted:', formData);
    
    toast({
      title: "Thank you for your inquiry!",
      description: "We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: ''
    });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        '.contact-info-card',
        {
          autoAlpha: 0,
          x: 56,
          y: 24,
          rotateX: -10,
        },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section.querySelector('.contact-side-stack'),
            start: 'top 82%',
          },
        },
      );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden py-24 bg-gradient-to-b from-emerald-50 to-white">
      <div className="motion-mesh">
        <div className="motion-grid"></div>
        <div className="section-orb left-[-5rem] top-24 h-80 w-80 bg-emerald-200/30"></div>
        <div className="section-orb section-orb-delay bottom-[-5rem] right-[-4rem] h-80 w-80 bg-purple-200/25"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 px-4 py-1">
            Contact Us
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Let's Start a Conversation
          </h2>
          <p className="text-lg text-gray-600">
            Ready to make your project environmentally sustainable? Get in touch with our experts
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Reveal direction="left">
          <Card className="glass-panel tilt-card shadow-xl border-2 border-gray-100 bg-white/88">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input 
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                      className="border-2 focus:border-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                      className="border-2 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input 
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      required
                      className="border-2 focus:border-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input 
                      id="company"
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={(e) => handleChange('company', e.target.value)}
                      className="border-2 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Service Interested In *</Label>
                  <Select value={formData.service} onValueChange={(value) => handleChange('service', value)} required>
                    <SelectTrigger className="border-2 focus:border-emerald-500">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eia">Environmental Impact Assessment</SelectItem>
                      <SelectItem value="sustainability">Sustainability Consulting</SelectItem>
                      <SelectItem value="waste">Waste Management</SelectItem>
                      <SelectItem value="audit">Environmental Auditing</SelectItem>
                      <SelectItem value="quality">Air & Water Quality Management</SelectItem>
                      <SelectItem value="green">Green Building Certification</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea 
                    id="message"
                    placeholder="Tell us about your project..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    required
                    className="border-2 focus:border-emerald-500 resize-none"
                  />
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  Send Message
                  <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </CardContent>
          </Card>
          </Reveal>

          <div className="contact-side-stack space-y-8">
            <Reveal delay={80} direction="right">
            <Card className="contact-info-card tilt-card glass-panel bg-white/88 shadow-lg border-2 border-gray-100 hover:border-emerald-200 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
                    <p className="text-gray-600">{contactInfo.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            </Reveal>

            <Reveal delay={160} direction="right">
            <Card className="contact-info-card tilt-card glass-panel bg-white/88 shadow-lg border-2 border-gray-100 hover:border-emerald-200 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
                    <p className="text-gray-600">{contactInfo.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            </Reveal>

            <Reveal delay={240} direction="right">
            <Card className="contact-info-card tilt-card glass-panel bg-white/88 shadow-lg border-2 border-gray-100 hover:border-emerald-200 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Visit Us</h3>
                    <p className="text-gray-600">{contactInfo.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            </Reveal>

            <Reveal delay={320} direction="right">
            <Card className="contact-info-card tilt-card glass-panel bg-white/88 shadow-lg border-2 border-gray-100 hover:border-emerald-200 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Business Hours</h3>
                    <p className="text-gray-600">{contactInfo.hours}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            </Reveal>

            <Reveal delay={420} direction="right">
            <div className="contact-info-card project-sheen rounded-2xl overflow-hidden shadow-lg h-64 border-2 border-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&q=80"
                alt="Office Location"
                className="portrait-rise w-full h-full object-cover"
              />
            </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
