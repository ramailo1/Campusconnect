# CampusConnect - A Modern, Integrated Campus Management Solution

This project is a comprehensive, customizable campus management system built with a modern web stack. It provides a suite of tools for students, faculty, and administrators to manage courses, appointments, library resources, and more. The entire application, from navigation to UI text, can be configured through a powerful admin settings panel.

## Screenshots

![Login Page](https://storage.googleapis.com/aifirebase/images/campus-connect-login.png "Login Page")
![Dashboard](https://storage.googleapis.com/aifirebase/images/campus-connect-dashboard.png "Dashboard")
![Dashboard (Dark Mode)](https://storage.googleapis.com/aifirebase/images/campus-connect-dashboard-dark.png "Dashboard (Dark Mode)")

## Features

- **Dynamic Dashboard**: A customizable dashboard that provides an at-a-glance overview of key metrics and recent activity. Admins can configure which modules and analytics are displayed.
- **Role-Based Access Control (RBAC)**: A flexible role and permission system. Admins can create roles and assign specific permissions, controlling access to different features.
- **Course Management**: Faculty can create and manage courses, while students can browse the course catalog and enroll.
- **Appointment Scheduling**: A complete scheduling system where faculty can set their availability, and students can book appointments. The system automatically handles scheduling conflicts.
- **Digital Library**: A digital library where users can browse, borrow, and return books.
- **User Management**: Admins can add, edit, and remove users from the system.
- **Analytics Dashboard**: A dedicated page with charts and stats on platform usage, user demographics, and course enrollment.
- **Full UI Customization**: Admins can change nearly all user-facing text, including form labels, button text, and page titles, directly from the settings panel.
- **Customizable Navigation**: The main and admin navigation menus can be fully customized, allowing admins to add, remove, rename, and hide menu items.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/)

## Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or a compatible package manager

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project by copying the example format. This file is used for sensitive information like database connection strings and API keys.

    ```
    # .env

    # Database connection URL (e.g., PostgreSQL)
    # Replace with your actual database connection string
    DATABASE_URL="postgresql://user:password@host:port/database"

    # Other API keys
    # SERVICE_API_KEY=your_api_key_here
    ```

### Running the Development Server

To start the application in development mode, run:

```bash
npm run dev
```

This will start the Next.js development server, typically on `http://localhost:9002`.

### Demo Credentials

To log in and explore the application, you can use the default Super Admin account:

- **Email**: `admin@campus.edu`
- **Password**: `123`

## Configuration

The application is designed to be highly configurable through the admin dashboard.

- **Access Settings**: Log in as a user with the "Super Admin" role and navigate to `/dashboard/settings`.
- **Navigation**: Add, remove, or edit main and admin menu items. You can change labels, paths, icons, and visibility.
- **Roles & Permissions**: Create custom roles and assign fine-grained permissions to control what different types of users can see and do.
- **UI Customization**: Change the text for various UI elements, including forms and page titles, to match your institution's terminology.
- **Dashboard Layout**: Select which metrics and content cards appear on the main dashboard to tailor it to your needs.

## Deployment

This Next.js application can be deployed to any hosting provider that supports Node.js.

### Recommended Providers

- **[Vercel](https://vercel.com/)**: The creators of Next.js, Vercel provides a seamless deployment experience with first-class support for Next.js features.
- **[Firebase App Hosting](https://firebase.google.com/docs/hosting)**: A secure, fast, and easy way to deploy web apps. The `apphosting.yaml` file in this project is already configured for App Hosting.
- **[Netlify](https://www.netlify.com/)**: Another excellent platform with great support for modern web frameworks.

### General Build Process

To create a production-ready build of the application, run the following command:

```bash
npm run build
```

This will generate an optimized version of your application in the `.next` directory. You can then start the production server with:

```bash
npm run start
```

Most modern hosting providers will automate this process when you connect your Git repository.
