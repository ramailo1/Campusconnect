# **App Name**: CampusConnect

## Core Features:

- User Authentication: Secure user registration and login with role-based access control. Implements JWT authentication with httpOnly cookies for enhanced security. Includes password strength meter and optional 2FA for extra protection.
- Admin Delegation: Allows admins to manage users within their assigned scope, controlled by delegated permissions. Admins can only view logs and users under their dashboard.
- User Signup / Registration: Public signup form with email, password, and optional profile picture. Passwords are validated and hashed (`password_hash()`). Supports optional email verification. New users are assigned default roles.
- Multi-language Support: Supports multiple languages through i18n JSON files. Users can switch between English, French, and Arabic (RTL layouts supported). Language auto-detection based on browser locale is included.
- Customizable Dashboard: Modular dashboard where Super Admins can add, remove, and configure modules and categories. Users can optionally drag and drop modules for a personalized layout. Modules are displayed in a responsive grid using TailwindCSS.
- Audit Logging: Maintains detailed logs of user activities for security and compliance, recording actions like logins, data modifications, and permission changes. The system highlights actions with security relevance. Suspicious activity triggers alerts.
- Notification System: Delivers real-time notifications for updates, announcements, and activity. Includes a notification center in the dashboard and optional email alerts.
- Analytics Dashboard: Visual representation of key platform metrics and user engagement. Tracks student progress based on audit logs, module usage, and system activity. Reports are exportable as PDF/CSV.
- Additional Features: Starter templates for Library, Appointments, Courses. Setup wizard for first-time Super Admin configuration. Debug panel accessible via topbar debug icon for error logs. Optional file upload module for assignments/projects.

## Style Guidelines:

- Primary Color: Deep blue (#3A4DB5) for headers, buttons, and main elements — conveys professionalism and trust.
- Background Color: Light gray gradient (#F0F2F5 → #E8EBEF) for a clean, distraction-free workspace.
- Accent Color: Vibrant teal (#00BFA5) for highlights, call-to-action buttons, and interactive elements.
- Body Text & Headings: 'Inter', sans-serif, for modern, readable typography.
- Collapsible Sidebar & Topbar: Streamlined navigation with smooth hover effects and active indicators.
- Icons: Modern, clear icons using FontAwesome and optionally Heroicons for module-specific actions.
- Animations & Transitions: Subtle fade-in for modals, slide-in for sidebar, hover feedback (~200-300ms duration).
- Cards / Modules: White background (#FFFFFF) in light mode; #2C2C3E in dark mode. Grid layout responsive across devices.
- Dark Mode: Optional toggle. Dark background #1E1E2F, card backgrounds #2C2C3E, teal accent preserved.
- Tooltips & Feedback: Hover tooltips for icons/buttons; slight scale or color change on hover for visual feedback.
- Mobile Responsiveness: Sidebar collapses to hamburger menu, cards stack in a single column on smaller screens.