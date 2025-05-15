
export type UserRole = 'Employee' | 'Manager' | 'Admin';
export type EmployeeType = 'Full-time' | 'Part-time' | 'Intern' | 'Contractor';
export type WorkMode = 'Onsite' | 'Remote' | 'Hybrid';

export interface Employee {
  id: string; // employeeId
  fullName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string; // Store as ISO string e.g., "1990-01-01"
  gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  profileImageUrl: string;
  dataAiHint?: string; // For placeholder images

  // Job & Department Information
  designation: string; // Was roleTitle
  department: string;
  managerId?: string; // Reference to their reporting manager's Employee ID
  joiningDate: string; // Store as ISO string e.g., "2022-01-15"
  employeeType: EmployeeType;
  location: string; // Office location
  workMode: WorkMode;

  // Existing fields
  role: UserRole; // To determine app behavior (Employee, Manager, Admin)
  manager?: string; // Name of the manager (can be derived from managerId if needed for display)
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
    id: 'EMP001',
    fullName: 'Alice Wonderland',
    email: 'alice@example.com',
    phone: '555-0101',
    dateOfBirth: '1992-03-10',
    gender: 'Female',
    profileImageUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman portrait',
    designation: 'Software Engineer',
    department: 'Technology',
    managerId: 'EMP002',
    joiningDate: '2022-01-15',
    employeeType: 'Full-time',
    location: 'New York HQ',
    workMode: 'Hybrid',
    role: 'Employee',
    manager: 'Bob The Builder',
    performanceSummary: 'Alice consistently delivers high-quality code and is a great team player. Could improve on leading project discussions.',
    existingSkills: 'JavaScript, React, Node.js, Agile Development',
  },
  {
    id: 'EMP002',
    fullName: 'Bob The Builder',
    email: 'bob@example.com',
    phone: '555-0102',
    dateOfBirth: '1985-07-22',
    gender: 'Male',
    profileImageUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'man portrait',
    designation: 'Engineering Manager',
    department: 'Technology',
    joiningDate: '2020-05-20',
    employeeType: 'Full-time',
    location: 'New York HQ',
    workMode: 'Onsite',
    role: 'Manager',
    performanceSummary: 'Bob is an effective manager, good at unblocking his team. Needs to focus more on strategic tech alignment.',
    existingSkills: 'Team Leadership, Project Management, System Architecture, Mentoring',
  },
  {
    id: 'EMP003',
    fullName: 'Charlie Brown',
    email: 'charlie@example.com',
    phone: '555-0103',
    profileImageUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'person smiling',
    designation: 'UX Designer',
    department: 'Design',
    managerId: 'EMP004',
    joiningDate: '2023-03-01',
    employeeType: 'Full-time',
    location: 'Remote',
    workMode: 'Remote',
    role: 'Employee',
    manager: 'Diana Prince',
    performanceSummary: 'Charlie has great design instincts but needs to improve on meeting deadlines and incorporating feedback more readily.',
    existingSkills: 'UI Design, UX Research, Figma, Prototyping',
  },
  {
    id: 'EMP004',
    fullName: 'Diana Prince',
    email: 'diana@example.com',
    profileImageUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman professional',
    designation: 'Head of Design',
    department: 'Design',
    joiningDate: '2019-11-10',
    employeeType: 'Full-time',
    location: 'London Office',
    workMode: 'Hybrid',
    role: 'Admin',
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
  employeeName: mockEmployees[0].fullName,
  performanceData: mockEmployees[0].performanceSummary,
  existingSkills: mockEmployees[0].existingSkills,
  organizationalNeeds: "Focus on cloud technologies and cross-functional collaboration."
};
