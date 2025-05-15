
export type UserRole = 'Employee' | 'Manager' | 'Admin';

export interface Employee {
  id: string;
  name: string;
  email: string; // Added email
  roleTitle: string;
  role: UserRole;
  department: string;
  joiningDate: string;
  manager?: string;
  avatarUrl: string;
  dataAiHint?: string;
  performanceSummary: string;
  existingSkills: string;
}

export interface Kpi {
  id: string;
  name: string;
  weight: number;
  description: string;
  category: string;
}

export interface DashboardMetrics {
  totalEmployees: number;
  averagePerformanceScore: number;
  trainingsSuggested: number;
  kpisTracked: number;
}

export interface DepartmentPerformance {
  department: string;
  averageScore: number;
  trend: 'up' | 'down' | 'stable';
}

export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Alice Wonderland',
    email: 'alice@example.com',
    roleTitle: 'Software Engineer',
    role: 'Employee',
    department: 'Technology',
    joiningDate: '2022-01-15',
    manager: 'Bob The Builder',
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman portrait',
    performanceSummary: 'Alice consistently delivers high-quality code and is a great team player. Could improve on leading project discussions.',
    existingSkills: 'JavaScript, React, Node.js, Agile Development',
  },
  {
    id: '2',
    name: 'Bob The Builder',
    email: 'bob@example.com',
    roleTitle: 'Engineering Manager',
    role: 'Manager',
    department: 'Technology',
    joiningDate: '2020-05-20',
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'man portrait',
    performanceSummary: 'Bob is an effective manager, good at unblocking his team. Needs to focus more on strategic tech alignment.',
    existingSkills: 'Team Leadership, Project Management, System Architecture, Mentoring',
  },
  {
    id: '3',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    roleTitle: 'UX Designer',
    role: 'Employee',
    department: 'Design',
    joiningDate: '2023-03-01',
    manager: 'Diana Prince',
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'person smiling',
    performanceSummary: 'Charlie has great design instincts but needs to improve on meeting deadlines and incorporating feedback more readily.',
    existingSkills: 'UI Design, UX Research, Figma, Prototyping',
  },
  {
    id: '4',
    name: 'Diana Prince',
    email: 'diana@example.com',
    roleTitle: 'Head of Design',
    role: 'Admin',
    department: 'Design',
    joiningDate: '2019-11-10',
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman professional',
    performanceSummary: 'Diana leads the design team effectively, fostering innovation. Could improve delegation skills.',
    existingSkills: 'Design Leadership, Product Strategy, User-Centered Design, Team Management',
  },
];

export const mockKpis: Kpi[] = [
  { id: 'kpi1', name: 'Code Quality', weight: 25, description: 'Number of bugs, adherence to coding standards.', category: 'Productivity' },
  { id: 'kpi2', name: 'Task Completion Rate', weight: 25, description: 'Percentage of assigned tasks completed on time.', category: 'Productivity' },
  { id: 'kpi3', name: 'Communication Skills', weight: 15, description: 'Clarity and effectiveness in team and client interactions.', category: 'Communication' },
  { id: 'kpi4', name: 'Team Collaboration', weight: 15, description: 'Effectiveness in working with team members.', category: 'Teamwork' },
  { id: 'kpi5', name: 'Proactiveness & Initiative', weight: 10, description: 'Taking initiative and proposing solutions.', category: 'Initiative' },
  { id: 'kpi6', name: 'Skill Development', weight: 10, description: 'Efforts towards learning new skills and technologies.', category: 'Learning' },
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalEmployees: mockEmployees.length,
  averagePerformanceScore: 4.2,
  trainingsSuggested: 12,
  kpisTracked: mockKpis.length,
};

export const mockDepartmentPerformance: DepartmentPerformance[] = [
    { department: 'Technology', averageScore: 4.5, trend: 'up' },
    { department: 'Design', averageScore: 4.1, trend: 'stable' },
    { department: 'Marketing', averageScore: 3.9, trend: 'down' },
    { department: 'Sales', averageScore: 4.3, trend: 'up' },
];

export const samplePerformanceDataForAI = {
  employeeName: mockEmployees[0].name,
  performanceData: mockEmployees[0].performanceSummary,
  existingSkills: mockEmployees[0].existingSkills,
  organizationalNeeds: "Focus on cloud technologies and cross-functional collaboration."
};
