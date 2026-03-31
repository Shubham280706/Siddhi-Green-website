# Siddhi Green Environmental Consultancy - Product Requirements Document

## Project Overview
Premium website for Siddhi Green Environmental Consultancy focusing on showcasing expertise in Environmental Impact Assessment (EIA) and other environmental services.

## Original Problem Statement
Build a comprehensive environmental consultancy website with:
- All sections (Hero, Services, About, Projects, Team, Testimonials, Contact)
- Focus on EIA services
- Showcase expertise and certifications
- Premium elegant design with green, white, and purple tint theme
- Analytics integration

## User Personas
1. **Corporate Decision Makers**: Looking for certified environmental consultancy for compliance
2. **Project Managers**: Seeking EIA services for infrastructure/industrial projects
3. **Sustainability Officers**: Interested in sustainability consulting and green certifications
4. **Government Officials**: Requiring environmental clearance support

## Core Requirements (Static)
- Single-page application with smooth scroll navigation
- Premium design with green (#10b981), white, and purple (#9333ea) color scheme
- All service sections with detailed information
- Contact form for inquiries
- Responsive design for all devices
- Professional imagery and icons (Lucide React, no emoji icons)
- Modern UI with Shadcn components

## Implementation History

### Phase 1: Frontend with Mock Data (Completed - March 31, 2026)
**Components Created:**
- Header with smooth scroll navigation
- Hero section with gradient text and trust indicators
- Services section (6 services: EIA, Sustainability, Waste Management, Auditing, Air & Water Quality, Green Building)
- About section (Mission, Vision, Values, Stats, Certifications accordion)
- Projects section (4 featured case studies)
- Team section (4 team members)
- Testimonials section (3 client testimonials)
- Contact section (form with select dropdown)
- Footer with company info and links

**Technical Stack:**
- React 19 with functional components
- Shadcn UI components
- Tailwind CSS with custom theme colors
- Lucide React icons
- Inter font family
- Mock data in separate file (`/app/frontend/src/mockData.js`)

**Features Implemented:**
- Smooth scroll navigation
- Hover animations and transitions
- Glass-morphism effects
- Gradient accents
- Toast notifications for form submission
- Mobile responsive design
- Professional typography and spacing

## Prioritized Backlog

### P0 Features (Critical)
- [ ] Backend API development
  - Contact form submission endpoint
  - Service inquiry tracking
  - Email notifications for new inquiries
- [ ] Database schema and models
  - Contact inquiries
  - Service requests
  - Projects/case studies management
  - Team member management
- [ ] Analytics integration
  - Google Analytics or similar
  - Visitor tracking
  - Form submission tracking

### P1 Features (High Priority)
- [ ] Content Management System (CMS)
  - Admin panel for updating projects
  - Team member management
  - Testimonials management
- [ ] Advanced Contact Form
  - File upload for project documents
  - Service-specific forms
  - Email notifications to admin
- [ ] SEO Optimization
  - Meta tags
  - Structured data
  - Sitemap generation

### P2 Features (Nice to Have)
- [ ] Blog section for environmental insights
- [ ] Newsletter subscription
- [ ] Live chat support
- [ ] Downloadable resources (whitepapers, case studies)
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Client portal for project tracking

## Next Tasks
1. Build backend API endpoints for contact form and data management
2. Integrate MongoDB for data persistence
3. Connect frontend forms to backend APIs
4. Implement analytics tracking
5. Add email notification service for inquiries

## API Contracts (To Be Implemented)

### POST /api/contact
**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "company": "string",
  "service": "string",
  "message": "string"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Inquiry submitted successfully",
  "inquiryId": "string"
}
```

### GET /api/services
**Response:** Array of service objects with details

### GET /api/projects
**Response:** Array of project/case study objects

### GET /api/team
**Response:** Array of team member objects

### GET /api/testimonials
**Response:** Array of testimonial objects

## Mock Data Location
All mock data is currently in `/app/frontend/src/mockData.js` and includes:
- heroData
- servicesData
- aboutData
- expertiseData
- projectsData
- teamData
- testimonialsData
- contactInfo

## Notes
- Contact form currently uses mock submission (console.log + toast notification)
- All navigation and interactive elements work with mock data
- Images are from Unsplash for demonstration
- No backend integration yet - pure frontend implementation
