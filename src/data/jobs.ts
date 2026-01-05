export type JobStatus = 'open' | 'urgent' | 'closing-soon' | 'shortlisting' | 'filled';
export type JobType = 'full-time' | 'part-time' | 'locum' | 'contract' | 'internship';
export type JobCategory = 'healthcare' | 'admin' | 'ngo' | 'internship' | 'locum';

export interface Job {
  id: string;
  title: string;
  facility: string;
  location: string;
  county: string;
  salary?: string;
  salaryRange?: { min: number; max: number };
  jobType: JobType;
  category: JobCategory;
  status: JobStatus;
  datePosted: string;
  closingDate?: string;
  description: string;
  requirements: string[];
  howToApply: string;
  contact: {
    whatsapp?: string;
    email?: string;
    phone?: string;
  };
  views?: number;
}

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Registered Nurse',
    facility: 'Kenyatta National Hospital',
    location: 'Nairobi',
    county: 'Nairobi',
    salary: 'Ksh 85,000 - 120,000',
    salaryRange: { min: 85000, max: 120000 },
    jobType: 'full-time',
    category: 'healthcare',
    status: 'urgent',
    datePosted: '2025-01-03',
    closingDate: '2025-01-15',
    description: 'We are looking for a qualified Registered Nurse to join our dedicated healthcare team. The successful candidate will provide high-quality patient care in our busy medical ward.',
    requirements: [
      'Diploma or Degree in Nursing from a recognized institution',
      'Valid nursing license from the Nursing Council of Kenya',
      'Minimum 2 years experience in a hospital setting',
      'Strong communication and interpersonal skills',
      'Ability to work in shifts including nights and weekends',
    ],
    howToApply: 'Send your CV and cover letter to careers@knh.or.ke with subject "Registered Nurse Application"',
    contact: {
      whatsapp: '+254700123456',
      email: 'careers@knh.or.ke',
    },
    views: 342,
  },
  {
    id: '2',
    title: 'Clinical Officer',
    facility: 'Mombasa County Hospital',
    location: 'Mombasa',
    county: 'Mombasa',
    salary: 'Ksh 70,000 - 95,000',
    salaryRange: { min: 70000, max: 95000 },
    jobType: 'full-time',
    category: 'healthcare',
    status: 'open',
    datePosted: '2025-01-02',
    closingDate: '2025-01-20',
    description: 'Seeking an experienced Clinical Officer to provide outpatient care and support our medical team in delivering excellent healthcare services.',
    requirements: [
      'Diploma in Clinical Medicine from KMTC or equivalent',
      'Valid practicing license',
      'At least 3 years clinical experience',
      'Experience with electronic medical records preferred',
    ],
    howToApply: 'Apply via WhatsApp by sending your CV to the number provided',
    contact: {
      whatsapp: '+254711234567',
      email: 'hr@mombasahospital.co.ke',
    },
    views: 198,
  },
  {
    id: '3',
    title: 'Pharmaceutical Technologist',
    facility: 'Nairobi West Hospital',
    location: 'Nairobi',
    county: 'Nairobi',
    salary: 'Ksh 50,000 - 65,000',
    salaryRange: { min: 50000, max: 65000 },
    jobType: 'full-time',
    category: 'healthcare',
    status: 'open',
    datePosted: '2025-01-04',
    closingDate: '2025-01-25',
    description: 'Join our pharmacy team to dispense medications and provide pharmaceutical care to our patients.',
    requirements: [
      'Diploma in Pharmaceutical Technology',
      'Valid license from Pharmacy and Poisons Board',
      '1-2 years experience in a hospital pharmacy',
      'Knowledge of inventory management systems',
    ],
    howToApply: 'Email your application to recruitment@nairobiwesthospital.co.ke',
    contact: {
      email: 'recruitment@nairobiwesthospital.co.ke',
      phone: '+254720345678',
    },
    views: 156,
  },
  {
    id: '4',
    title: 'Medical Officer - Locum',
    facility: 'Kisumu County Referral Hospital',
    location: 'Kisumu',
    county: 'Kisumu',
    salary: 'Ksh 3,500 per shift',
    jobType: 'locum',
    category: 'locum',
    status: 'urgent',
    datePosted: '2025-01-05',
    description: 'Urgent need for Medical Officers for weekend locum shifts in our emergency department.',
    requirements: [
      'MBChB from a recognized university',
      'Valid KMPDC practicing license',
      'Experience in emergency medicine preferred',
      'Flexibility to work weekend shifts',
    ],
    howToApply: 'WhatsApp your availability and CV immediately',
    contact: {
      whatsapp: '+254733456789',
    },
    views: 287,
  },
  {
    id: '5',
    title: 'Hospital Administrator',
    facility: 'Aga Khan Hospital',
    location: 'Nairobi',
    county: 'Nairobi',
    salary: 'Ksh 150,000 - 200,000',
    salaryRange: { min: 150000, max: 200000 },
    jobType: 'full-time',
    category: 'admin',
    status: 'open',
    datePosted: '2025-01-01',
    closingDate: '2025-01-30',
    description: 'Lead our hospital operations team and ensure smooth day-to-day functioning of all departments.',
    requirements: [
      'Degree in Healthcare Management or Business Administration',
      'MBA or Masters in Health Administration preferred',
      '5+ years experience in hospital administration',
      'Strong leadership and organizational skills',
      'Experience with hospital accreditation processes',
    ],
    howToApply: 'Apply through our careers portal at careers.agakhanhospitals.org',
    contact: {
      email: 'careers@agakhanhospitals.org',
    },
    views: 423,
  },
  {
    id: '6',
    title: 'Community Health Worker',
    facility: 'AMREF Health Africa',
    location: 'Turkana',
    county: 'Turkana',
    salary: 'Ksh 35,000 - 45,000',
    salaryRange: { min: 35000, max: 45000 },
    jobType: 'contract',
    category: 'ngo',
    status: 'open',
    datePosted: '2025-01-03',
    closingDate: '2025-01-18',
    description: 'Support community health initiatives in remote areas of Turkana County. This is a 12-month renewable contract.',
    requirements: [
      'Certificate in Community Health',
      'Fluent in local language (Turkana/Swahili)',
      'Experience working with rural communities',
      'Motorcycle riding skills with valid license',
      'Willingness to travel extensively',
    ],
    howToApply: 'Submit application via AMREF jobs portal',
    contact: {
      email: 'jobs@amref.org',
      whatsapp: '+254722567890',
    },
    views: 89,
  },
  {
    id: '7',
    title: 'Nursing Intern',
    facility: 'Nakuru Level 5 Hospital',
    location: 'Nakuru',
    county: 'Nakuru',
    salary: 'Ksh 15,000 stipend',
    jobType: 'internship',
    category: 'internship',
    status: 'closing-soon',
    datePosted: '2024-12-28',
    closingDate: '2025-01-08',
    description: 'Internship opportunity for recent nursing graduates to gain practical experience under supervision.',
    requirements: [
      'Recent graduate with Diploma/Degree in Nursing',
      'Awaiting or recently received nursing license',
      'Strong eagerness to learn',
      'Good attitude and professionalism',
    ],
    howToApply: 'Deliver physical application to HR office',
    contact: {
      phone: '+254745678901',
    },
    views: 534,
  },
  {
    id: '8',
    title: 'Laboratory Technologist',
    facility: 'Lancet Kenya',
    location: 'Nairobi',
    county: 'Nairobi',
    salary: 'Ksh 55,000 - 75,000',
    salaryRange: { min: 55000, max: 75000 },
    jobType: 'full-time',
    category: 'healthcare',
    status: 'open',
    datePosted: '2025-01-04',
    closingDate: '2025-01-22',
    description: 'Perform diagnostic laboratory tests and ensure quality control in our busy laboratory.',
    requirements: [
      'Diploma/Degree in Medical Laboratory Sciences',
      'KMLTTB registration and valid license',
      '2+ years experience in clinical laboratory',
      'Experience with automated analyzers',
    ],
    howToApply: 'Apply online at lancet.co.ke/careers',
    contact: {
      email: 'hr@lancet.co.ke',
    },
    views: 201,
  },
  {
    id: '9',
    title: 'Physiotherapist',
    facility: 'Karen Hospital',
    location: 'Nairobi',
    county: 'Nairobi',
    salary: 'Negotiable',
    jobType: 'full-time',
    category: 'healthcare',
    status: 'shortlisting',
    datePosted: '2024-12-20',
    closingDate: '2025-01-05',
    description: 'Provide rehabilitation services to patients recovering from surgeries, injuries, and chronic conditions.',
    requirements: [
      'Degree in Physiotherapy',
      'Valid practicing license from KPPTB',
      '3+ years experience preferred',
      'Experience in sports medicine is an advantage',
    ],
    howToApply: 'Email your CV with references',
    contact: {
      email: 'careers@karenhospital.org',
      phone: '+254756789012',
    },
    views: 178,
  },
  {
    id: '10',
    title: 'Radiographer',
    facility: 'Coast General Hospital',
    location: 'Mombasa',
    county: 'Mombasa',
    salary: 'Ksh 60,000 - 80,000',
    salaryRange: { min: 60000, max: 80000 },
    jobType: 'full-time',
    category: 'healthcare',
    status: 'open',
    datePosted: '2025-01-05',
    closingDate: '2025-01-28',
    description: 'Operate imaging equipment and produce quality diagnostic images for patient care.',
    requirements: [
      'Diploma/Degree in Radiography',
      'KRRB registration and valid license',
      'Experience with CT and MRI preferred',
      'Strong attention to detail',
    ],
    howToApply: 'Send application to HR department',
    contact: {
      email: 'hr@coastgeneral.go.ke',
      whatsapp: '+254767890123',
    },
    views: 145,
  },
];

export const categories = [
  { id: 'healthcare', name: 'Healthcare', icon: 'Heart', count: 156 },
  { id: 'admin', name: 'Admin & Office', icon: 'Building', count: 43 },
  { id: 'ngo', name: 'NGO', icon: 'Globe', count: 28 },
  { id: 'internship', name: 'Internship / Entry Level', icon: 'GraduationCap', count: 67 },
  { id: 'locum', name: 'Locum / Contract', icon: 'Clock', count: 34 },
];

export const counties = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Turkana', 'Machakos', 
  'Kiambu', 'Nyeri', 'Meru', 'Kakamega', 'Bungoma', 'Kilifi', 'Garissa', 'Kitui'
];
