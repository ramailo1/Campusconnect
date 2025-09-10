
import { FileText, User, Shield, BookOpen, Calendar, GraduationCap, Settings, Home, LineChart, Users as UsersIcon, Component } from 'lucide-react';

export const iconMap: Record<string, React.ElementType> = {
    Home,
    BookOpen,
    Calendar,
    FileText,
    LineChart,
    Users: UsersIcon,
    Shield,
    Settings,
    User,
    GraduationCap,
    Component
}

export type NavItem = {
    href: string;
    icon: React.ElementType;
    label: string;
    description?: string; // Optional description for dashboard cards
    image?: string; // Optional image for dashboard cards
    imageHint?: string; // Optional image hint for dashboard cards
    hidden?: boolean;
}

export const navItems: NavItem[] = [
  { 
    href: '/dashboard', 
    icon: Home, 
    label: 'Dashboard',
    description: 'Overview of all your activities and modules.',
    image: "https://picsum.photos/seed/course4/600/400",
    imageHint: "university campus",
    hidden: false
  },
  { 
    href: '/dashboard/courses', 
    icon: BookOpen, 
    label: 'Courses',
    description: 'Access your enrolled courses, materials, and grades.',
    image: "https://picsum.photos/seed/course1/600/400",
    imageHint: "abstract geometry",
    hidden: false
  },
  { 
    href: '/dashboard/appointments', 
    icon: Calendar, 
    label: 'Appointments',
    description: 'Schedule and manage appointments with advisors and faculty.',
    image: "https://picsum.photos/seed/course2/600/400",
    imageHint: "modern library",
    hidden: false
  },
  { 
    href: '/dashboard/library', 
    icon: FileText, 
    label: 'Library',
    description: 'Search the digital library, reserve books, and access journals.',
    image: "https://picsum.photos/seed/course3/600/400",
    imageHint: "students collaborating",
    hidden: false
  },
];

export const adminNavItems: NavItem[] = [
  { href: '/dashboard/analytics', icon: LineChart, label: 'Analytics', hidden: false },
  { href: '/dashboard/users', icon: UsersIcon, label: 'Users', hidden: false },
  { href: '/dashboard/audit-logs', icon: Shield, label: 'Audit Logs', hidden: false },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings', hidden: false },
]

export const notifications = [
  {
    title: "New course material uploaded",
    description: "Introduction to Quantum Computing - Week 3 slides are now available.",
  },
  {
    title: "Appointment Confirmed",
    description: "Your meeting with Prof. Ada Lovelace is confirmed for tomorrow at 10:00 AM.",
  },
  {
    title: "Security Alert",
    description: "A new device has signed into your account. If this wasn't you, please secure your account.",
  },
];

export type AuditLog = {
  id: string;
  user: string;
  avatar: string;
  action: string;
  details: string;
  level: 'info' | 'warning' | 'critical';
  timestamp: string;
};

export const auditLogs: AuditLog[] = [
  {
    id: 'log-001',
    user: 'admin@campus.edu',
    avatar: '/avatars/01.png',
    action: 'User Login',
    details: 'Successful login from IP 192.168.1.1',
    level: 'info',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'log-002',
    user: 'emily.davis@campus.edu',
    avatar: '/avatars/02.png',
    action: 'Permission Change',
    details: 'Granted "Editor" role to user john.doe@campus.edu',
    level: 'warning',
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
  {
    id: 'log-003',
    user: 'john.doe@campus.edu',
    avatar: '/avatars/03.png',
    action: 'Course Update',
    details: 'Modified content in "Advanced Algorithms"',
    level: 'info',
    timestamp: new Date(Date.now() - 3 * 3600000).toISOString(),
  },
  {
    id: 'log-004',
    user: 'system',
    avatar: '',
    action: 'Failed Login Attempt',
    details: 'Multiple failed login attempts for user admin@campus.edu from IP 203.0.113.5',
    level: 'critical',
    timestamp: new Date(Date.now() - 4 * 3600000).toISOString(),
  },
  {
    id: 'log-005',
    user: 'sara.wilson@campus.edu',
    avatar: '/avatars/04.png',
    action: 'File Upload',
    details: 'Uploaded "thesis_final_draft.pdf" to project "Capstone Project"',
    level: 'info',
    timestamp: new Date(Date.now() - 5 * 3600000).toISOString(),
  },
   {
    id: 'log-006',
    user: 'admin@campus.edu',
    avatar: '/avatars/01.png',
    action: 'User Deletion',
    details: 'Deleted user temp.user@campus.edu',
    level: 'warning',
    timestamp: new Date(Date.now() - 6 * 3600000).toISOString(),
  },
  {
    id: 'log-007',
    user: 'michael.brown@campus.edu',
    avatar: '/avatars/05.png',
    action: 'API Key Generated',
    details: 'A new API key was generated for external service integration',
    level: 'critical',
    timestamp: new Date(Date.now() - 7 * 3600000).toISOString(),
  },
];

export type User = {
  id: string
  name: string
  email: string
  role: 'student' | 'faculty' | 'admin'
}

export const users: User[] = [
    { id: 'user-1', name: 'Super Admin', email: 'admin@campus.edu', role: 'admin' },
    { id: 'user-2', name: 'Professor Jones', email: 'prof.jones@campus.edu', role: 'faculty' },
    { id: 'user-3', name: 'Dr. Smith', email: 'dr.smith@campus.edu', role: 'faculty' },
    { id: 'user-4', name: 'John Doe', email: 'john.doe@campus.edu', role: 'student' },
    { id: 'user-5', name: 'Jane Smith', email: 'jane.smith@campus.edu', role: 'student' },
]

// This is a mock of the currently logged-in user.
// In a real app, this would come from an auth context.
export const currentUser: User = users[0] // Super Admin

export type Course = {
    name: string;
    code: string;
    description: string;
    instructor: string;
    enrolledStudents: string[];
}

export const courses: Course[] = [
    { name: "Introduction to AI", code: "CS461", description: "An intro to AI.", instructor: "Dr. Smith", enrolledStudents: [] },
    { name: "Advanced Algorithms", code: "CS501", description: "Deep dive into algorithms.", instructor: "Professor Jones", enrolledStudents: ['user-4'] },
    { name: "Web Development", code: "CS330", description: "Building for the web.", instructor: "Professor Jones", enrolledStudents: [] },
]

export type Appointment = {
    id: string
    studentId: string
    advisorId: string
    date: string
    status: 'Confirmed' | 'Pending' | 'Canceled'
    notes: string
}

export const appointments: Appointment[] = [
    { id: 'appt-1', studentId: 'user-4', advisorId: 'user-2', date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(), status: 'Confirmed', notes: 'Discussing fall semester' },
    { id: 'appt-2', studentId: 'user-5', advisorId: 'user-3', date: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(), status: 'Confirmed', notes: 'Thesis check-in' },
]

export type AvailabilitySlot = {
    id: string;
    advisorId: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:mm
}

export const availabilitySlots: AvailabilitySlot[] = [
    { id: 'avail-1', advisorId: 'user-2', date: '2024-07-28', time: '10:00' },
    { id: 'avail-2', advisorId: 'user-2', date: '2024-07-28', time: '11:00' },
    { id: 'avail-3', advisorId: 'user-2', date: '2024-07-29', time: '14:00' },
    { id: 'avail-4', advisorId: 'user-3', date: '2024-07-30', time: '09:00' },
]

export type Book = {
    id: string;
    title: string;
    author: string;
    coverImage: string;
    borrowedBy: string | null;
}

export const libraryBooks: Book[] = [
  { id: 'book-1', title: "The Digital Fortress", author: "Dan Brown", coverImage: "https://picsum.photos/seed/book1/400/600", borrowedBy: null },
  { id: 'book-2', title: "Structure and Interpretation of Computer Programs", author: "Harold Abelson", coverImage: "https://picsum.photos/seed/book2/400/600", borrowedBy: 'user-4' },
  { id: 'book-3', title: "The Pragmatic Programmer", author: "Andrew Hunt", coverImage: "https://picsum.photos/seed/book3/400/600", borrowedBy: null },
  { id: 'book-4', title: "Clean Code: A Handbook of Agile Software Craftsmanship", author: "Robert C. Martin", coverImage: "https://picsum.photos/seed/book4/400/600", borrowedBy: null },
  { id: 'book-5', title: "Design Patterns: Elements of Reusable Object-Oriented Software", author: "Erich Gamma", coverImage: "https://picsum.photos/seed/book5/400/600", borrowedBy: 'user-5' },
  { id: 'book-6', title: "The Lord of the Rings", author: "J.R.R. Tolkien", coverImage: "https://picsum.photos/seed/book6/400/600", borrowedBy: null },
  { id: 'book-7', title: "Dune", author: "Frank Herbert", coverImage: "https://picsum.photos/seed/book7/400/600", borrowedBy: null },
  { id: 'book-8', title: "Foundation", author: "Isaac Asimov", coverImage: "https://picsum.photos/seed/book8/400/600", borrowedBy: null },
]
