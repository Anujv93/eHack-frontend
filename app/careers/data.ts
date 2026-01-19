
export interface Job {
    id: string;
    title: string;
    category: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
    description: string;
    postedDate: string;
    salary?: string;
}

export const jobCategories = [
    { id: 'all', name: 'All Roles' },
    { id: 'tech', name: 'Technology & Engineering' },
    { id: 'marketing', name: 'Marketing & Sales' },
    { id: 'education', name: 'Education & Training' },
    { id: 'design', name: 'Design & Creative' },
    { id: 'operations', name: 'Operations & HR' },
];

export const dummyJobs: Job[] = [
    {
        id: '1',
        title: 'Senior Cybersecurity Instructor',
        category: 'education',
        location: 'Bangalore, India (Hybrid)',
        type: 'Full-time',
        description: 'We are looking for an experienced Cybersecurity Instructor to lead our advanced ethical hacking cohorts. You will be responsible for delivering high-quality training and curriculum development.',
        postedDate: '2025-01-15',
        salary: '₹12L - ₹18L PA'
    },
    {
        id: '2',
        title: 'Digital Marketing Manager',
        category: 'marketing',
        location: 'Mumbai, India',
        type: 'Full-time',
        description: 'Join our growth team to drive user acquisition and brand awareness. You will manage paid campaigns, SEO strategy, and social media presence for eHack Academy.',
        postedDate: '2025-01-18',
        salary: '₹8L - ₹12L PA'
    },
    {
        id: '3',
        title: 'Frontend Developer (React/Next.js)',
        category: 'tech',
        location: 'Remote',
        type: 'Contract',
        description: ' seeking a skilled Frontend Developer to build and maintain our web platforms. Experience with Next.js, TypeScript, and modern UI libraries is required.',
        postedDate: '2025-01-10',
        salary: 'Competitive'
    },
    {
        id: '4',
        title: 'Academic Counselor',
        category: 'marketing',
        location: 'Delhi, India',
        type: 'Full-time',
        description: 'Guide prospective students in choosing the right career path in cybersecurity. Strong communication skills and a passion for education are essential.',
        postedDate: '2025-01-12',
        salary: '₹4L - ₹6L PA + Incentives'
    },
    {
        id: '5',
        title: 'UI/UX Designer',
        category: 'design',
        location: 'Bangalore, India',
        type: 'Full-time',
        description: 'Design intuitive and engaging user experiences for our learning management system and improved website interface.',
        postedDate: '2025-01-14',
        salary: '₹6L - ₹10L PA'
    },
    {
        id: '6',
        title: 'Operations Executive',
        category: 'operations',
        location: 'Pune, India',

        description: 'Manage day-to-day coordination of batches, student support, and administrative tasks to ensure smooth academy operations.',
        postedDate: '2025-01-16',
        type: 'Internship',
        salary: 'Stipend ₹15k/month'
    },
    {
        id: '7',
        title: 'Penetration Tester',
        category: 'tech',
        location: 'Bangalore, India',
        type: 'Full-time',
        description: 'Execute VAPT assessments for our corporate clients. Must have CEH/OSCP certification and hands-on experience with security tools.',
        postedDate: '2025-01-19',
        salary: '₹10L - ₹15L PA'
    }
];
