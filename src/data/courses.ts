import type { Course } from '@/types';

export const courses: Course[] = [
  {
    id: '1',
    title: 'Weekend Course: Vehicle Systems',
    slug: 'vehicle-systems',
    description: 'Comprehensive training on automotive vehicle systems designed for students aspiring to enter the automotive industry.',
    duration: '4 weekends × 4 hours (Saturday + Sunday)',
    targetAudience: 'Students',
    price: 15000,
    currency: 'INR',
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/7af17404-eb28-4f5e-99fa-cd7cc5d6ef95.jpg',
    topics: [
      'Vehicle layouts/configuration based on engine position',
      'Chassis/Powertrain systems',
      'Braking systems',
      'Steering systems',
      'Engines',
      'Basics of BEV/HEV/PHEV',
      'Braking systems (detailed)'
    ],
    eligibility: [
      'Engineering students (Mechanical, Automotive, Electrical)',
      'Recent graduates seeking automotive industry knowledge',
      'Professionals looking to transition into automotive sector'
    ],
    learningOutcomes: [
      'Understand fundamental vehicle system architectures',
      'Gain knowledge of modern electric and hybrid vehicle technologies',
      'Learn about chassis and powertrain integration',
      'Develop practical understanding of braking and steering systems',
      'Build foundation for automotive engineering career'
    ]
  },
  {
    id: '2',
    title: 'Weekend Course: ISO 26262',
    slug: 'iso-26262',
    description: 'Professional training on ISO 26262 functional safety standards for automotive professionals and corporate teams.',
    duration: 'Multiple sessions (3+ hours each)',
    targetAudience: 'Corporate Professionals',
    price: 25000,
    currency: 'INR',
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/624d6b62-de59-4eff-9148-47bc47f0613c.jpg',
    topics: [
      'FuSa overview/Need for FuSa/Coverage & basics of CS (3+ hours)',
      'Part 2 (4 hours)',
      'Part 3 (4 hours)',
      'Part 4 (4 hours)',
      'Part 5 & 6 (4 hours)',
      'Part 7, 8, 10 & 11 (4 hours)',
      'Part 9 & 12 (4 hours)'
    ],
    benefits: [
      'Comprehensive understanding of ISO 26262 standard',
      'Enhanced product safety and compliance',
      'Reduced development risks and costs',
      'Improved team competency in functional safety',
      'Industry-recognized certification preparation'
    ],
    learningOutcomes: [
      'Master ISO 26262 functional safety lifecycle',
      'Understand ASIL determination and safety requirements',
      'Learn safety analysis methods (FMEA, FTA, FMEDA)',
      'Gain expertise in safety validation and verification',
      'Develop skills for safety case documentation'
    ]
  },
  {
    id: '3',
    title: 'AIAG-VDA FMEA Course',
    slug: 'aiag-vda-fmea-course',
    description: 'In-depth training on AIAG-VDA FMEA Course used in modern vehicles.',
    duration: 'One day course × 6 hours',
    targetAudience: 'Engineering Students & Professionals',
    price: 18000,
    currency: 'INR',
    image: 'https://i.ibb.co/5XFz9Qjn/IMG-20251130-WA0021.jpg', // Replace with your actual image URL
    topics: [
      'History of DFMEA',
      'FMEA as part of other core tools',
      'Various QMS standards',
      'Difference between AIAG and AIAG-VDA FMEA',
      'Use of Action Priority (AP) instead of Risk Prioritization Number (RPN)',
      '7-Step approach',
      'What is System /Design FMEA?',
      'What is PFMEA',
      'What is Supplemental FMEA-Monitoring and System Response (MSR)'
    ],
    eligibility: [
      'Engineering students (Electrical, Electronics, Automotive)',
      'Professionals in automotive electronics or related fields',
      'Anyone interested in learning about the electronics in modern vehicles'
    ],
    learningOutcomes: [
      'Understand the evolution and purpose of FMEA in product and process development.',
      'Apply AIAG–VDA 7-Step FMEA methodology effectively.',
      'Differentiate between AIAG 4th Edition and AIAG–VDA 1st Edition FMEA standards.',
      'Evaluate and prioritize risks using Action Priority (AP).',
      'Develop complete System/Design FMEAs with proper severity, occurrence, and detection assessments.',
      'Create robust Process FMEAs aligned with APQP & PPAP requirements.'
    ]
  },
  {
    id: '4',
    title: 'Cybersecurity in Automotive Systems',
    slug: 'cybersecurity-in-automotive-systems',
    description: 'In-depth training on automotive cybersecurity, addressing various vehicle security issues.',
    duration: 'One day course × 6 hours',
    targetAudience: 'Engineering Students & Professionals',
    price: 18000,
    currency: 'INR',
    image: 'https://i.ibb.co/5XFz9Qjn/IMG-20251130-WA0021.jpg', // Replace with your actual image URL
    topics: [
      'Introduction to Cybersecurity',
      'Introduction to Automotive Cybersecurity',
      'Need for Vehicle Security',
      'Safety vs Cybersecurity',
      'Business Impact',
      'CIA Triad',
      'Real-world cybersecurity failures',
      'Attack vectors & best practices',
      'Backend/server-side risks',
      'Keyless entry attacks',
      'Types of attacks'
    ],
    eligibility: [
      'Engineering students (Electrical, Electronics, Automotive)',
      'Professionals in automotive electronics or related fields',
      'Anyone interested in learning about the electronics in modern vehicles'
    ],
    learningOutcomes: [
      'Understand fundamental concepts of automotive cybersecurity.',
      'Learn ISO/SAE 21434 terminology, structure, and compliance requirements.',
      'Perform Threat Analysis & Risk Assessment (TARA).',
      'Identify attack paths, vulnerabilities, and mitigation techniques.',
      'Learn automotive-specific testing methods (fuzzing, penetration testing, scanning).',
      'Gain expertise in cybersecurity controls and lifecycle management.'
    ]
  }
];

export const getCourseBySlug = (slug: string): Course | undefined => {
  return courses.find(course => course.slug === slug);
};
