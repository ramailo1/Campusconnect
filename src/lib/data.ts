import { FileText, User, Shield, BookOpen, Calendar, GraduationCap } from 'lucide-react';

export const navItems = [
  { href: '/dashboard', icon: GraduationCap, label: 'Dashboard' },
  { href: '/dashboard/courses', icon: BookOpen, label: 'Courses' },
  { href: '/dashboard/appointments', icon: Calendar, label: 'Appointments' },
  { href: '/dashboard/library', icon: FileText, label: 'Library' },
];

export const adminNavItems = [
  { href: '/dashboard/analytics', icon: User, label: 'Analytics' },
  { href: '/dashboard/users', icon: User, label: 'Users' },
  { href: '/dashboard/audit-logs', icon: Shield, label: 'Audit Logs' },
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
