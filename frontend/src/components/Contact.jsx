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
import { Building2, ExternalLink, Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { contactInfo } from '../mockData';
import { useToast } from '../hooks/use-toast';
import { Reveal } from './Reveal';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const { toast } = useToast();
  const sectionRef = useRef(null);
  const [activeOfficeId, setActiveOfficeId] = useState(contactInfo.offices[0]?.id ?? 'ankleshwar');
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

  const activeOffice =
    contactInfo.offices.find((office) => office.id === activeOfficeId) ?? contactInfo.offices[0];

  const activeOfficeMapUrl = `https://www.google.com/maps?q=${encodeURIComponent(activeOffice.mapQuery)}&z=14&output=embed`;

  const getGoogleMapsLink = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

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

      gsap.fromTo(
        '.office-card',
        {
          autoAlpha: 0,
          y: 36,
          scale: 0.97,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section.querySelector('.offices-grid'),
            start: 'top 84%',
          },
        },
      );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-emerald-50 to-white">
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

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          <Reveal direction="left">
          <Card className="glass-panel tilt-card shadow-xl border-2 border-gray-100 bg-white/88">
            <CardContent className="p-4 sm:p-8">
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

        <div className="mx-auto mt-20 max-w-6xl">
          <Reveal className="mb-10 text-center space-y-4">
            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 px-4 py-1">
              Our Offices
            </Badge>
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Explore Siddhi Green locations on a real Google Map
            </h3>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              Switch between our office locations to view each branch directly on Google Maps.
            </p>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="offices-grid space-y-5">
              {contactInfo.offices.map((office) => {
                const isActive = office.id === activeOfficeId;

                return (
                  <Card
                    key={office.id}
                    className={`office-card overflow-hidden border-2 bg-white/90 shadow-lg transition-all duration-300 ${
                      isActive
                        ? 'border-emerald-300 shadow-2xl'
                        : 'border-gray-100 hover:border-emerald-200'
                    }`}
                  >
                    <CardContent className="p-0">
                      <button
                        type="button"
                        onClick={() => setActiveOfficeId(office.id)}
                        className="w-full p-6 text-left"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-full ${isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                              <Building2 className="h-6 w-6" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
                                {office.city}
                              </p>
                              <h4 className="mt-2 text-xl font-bold text-gray-900">
                                {office.title}
                              </h4>
                              <p className="mt-3 text-sm leading-6 text-gray-600">
                                {office.address}
                              </p>
                            </div>
                          </div>
                          <span className={`mt-1 h-3 w-3 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                        </div>
                      </button>

                      <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
                        <p className="text-sm text-gray-500">
                          Click card to focus this office
                        </p>
                        <a
                          href={getGoogleMapsLink(office.mapQuery)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-800"
                        >
                          Open in Google Maps
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Reveal delay={120} direction="right">
              <Card className="overflow-hidden border-2 border-gray-100 bg-white/92 shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-purple-700">
                        Live Map View
                      </p>
                      <h4 className="mt-2 text-2xl font-bold text-gray-900">
                        {activeOffice.title}
                      </h4>
                    </div>
                    <a
                      href={getGoogleMapsLink(activeOffice.mapQuery)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
                    >
                      Directions
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="relative h-[240px] sm:h-[420px] w-full bg-gray-100">
                    <iframe
                      title={`${activeOffice.title} Google Map`}
                      src={activeOfficeMapUrl}
                      className="h-full w-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
