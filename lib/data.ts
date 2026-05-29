export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '#contact' },
]

export const skills = {
  Frontend: ['React.js', 'TypeScript', 'JavaScript ES6+', 'HTML5', 'CSS3', 'REST API Integration', 'Responsive UI'],
  Backend: ['Node.js', 'NestJS', 'Express.js', 'RESTful APIs', 'JWT Auth', 'Microservices'],
  'AI & LLM': ['RAG Systems', 'LLMs', 'Vector Embeddings', 'Semantic Search', 'LangChain', 'Prompt Engineering', 'Python'],
  Database: ['MongoDB', 'SQL', 'ChromaDB', 'Schema Design'],
  'Cloud & DevOps': ['AWS','GCP', 'Docker', 'CI/CD', 'Vercel', 'Render'],
  Tools: ['Git', 'Stripe', 'Razorpay', 'Third-Party APIs'],
}

export const projects = [
  {
    title: 'Treebay Technology',
    description: 'Full stack company website with complete CMS and highly dynamic website with admin panel which hase role based acces and modern and secure authentication system for admin with complete website data is dynamically changeable',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    highlight: false,
    link: 'https://treebaytechnology.com',
    icon: 'logo2.png',
    color: '#f59e0b',
    metrics: 'Bio-Energy',
  },
  {
    title: 'KWATAKI — FinTech Platform',
    description: 'Frontend-integrated backend services for loan management workflows. Real-time transaction handling with multilingual support for a fintech platform.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    highlight: false,
    link: 'https://kwataki.com',
    icon: '💳',
    color: '#f59e0b',
    metrics: 'Multilingual fintech',
  },
  {
    title: 'AI Document Intelligence',
    description: 'Full-stack AI application enabling document-based querying with LLM-powered semantic search. Reduced manual search time by ~60% through intelligent document ingestion and contextual response generation.',
    tags: ['React', 'Node.js', 'LLM', 'RAG', 'ChromaDB', 'LangChain'],
    highlight: true,
    icon: '🤖',
    color: '#6c63ff',
    metrics: '60% faster search',
  },
  {
    title: 'LivoLabs — Healthcare SaaS',
    description: 'Full-stack healthcare platform with React dashboards, scalable backend APIs, subscription workflows, risk evaluation engine, and Stripe billing integration.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
    highlight: false,
    icon: '🏥',
    color: '#00d4aa',
    metrics: 'Production SaaS',
  },
]

export const experience = [
  {
    company: 'Treebay Technology Pvt Ltd',
    role: 'Senior MERN Stack Developer',
    period: 'Apr 2026 – Present',
    duration: '3 months',
    points: [
      'Developed and maintained internal business applications and company website using the MERN stack.',
      'Built a fully dynamic, CRM-integrated website with real-time content management capabilities.',
      'Managed end-to-end DevOps pipelines including CI/CD workflows and deployment automation.',
      'Administered and optimised cloud infrastructure for reliability, scalability, and cost efficiency.',
      'Implemented application and infrastructure security — auth hardening, encryption, and access control.',
      'Led architectural decisions, defined coding standards, and ensured long-term technical coherence.',
      'Mentored junior developers through code reviews, pair programming, and technical guidance.',
      'Collaborated with the SEO team to implement technical SEO improvements and boost organic traffic.'
    ],
  },
  {
    company: 'Fortunesoft IT Innovations Pvt Ltd',
    role: 'MERN Stack & AI Engineer',
    period: 'Sep 2023 – Apr 2026',
    duration: '2.8 years',
    points: [
      'Developing end-to-end MERN stack applications serving production users',
      'Building scalable APIs and integrating frontend applications with backend services',
      'Delivering production-ready features across healthcare and fintech platforms',
      'Implementing AI-enabled product features using LLM and RAG architectures',
      'Collaborating with frontend, DevOps, and product teams for full lifecycle delivery',
    ],
  },
]

export const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Shipped' },
  { value: '3', label: 'Production Platforms' },
  { value: '60%', label: 'Search Time Reduced' },
]
