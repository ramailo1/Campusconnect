# CampusConnect – Modern Integrated Campus Management Solution

CampusConnect is a **scalable, customizable campus management system** designed for universities, colleges, and training institutions. Built with a **modern web stack**, it provides an intuitive platform for students, faculty, and administrators to manage **courses, appointments, library resources, analytics, and more**.  

From navigation to UI text, everything can be **configured through a powerful admin panel**, ensuring that CampusConnect adapts seamlessly to your institution’s needs.  

---

## 📸 Screenshots

![Login Page](https://storage.googleapis.com/aifirebase/images/campus-connect-login.png "Login Page")  
![Dashboard](https://storage.googleapis.com/aifirebase/images/campus-connect-dashboard.png "Dashboard")  
![Dashboard (Dark Mode)](https://storage.googleapis.com/aifirebase/images/campus-connect-dashboard-dark.png "Dashboard (Dark Mode)")  

---

## 🚀 Features

- **Dynamic Dashboard**  
  Configurable overview of key metrics and activity. Super Admins can choose which **modules, cards, and analytics** are displayed.  

- **Role-Based Access Control (RBAC)**  
  Flexible **role and permission system**. Create roles, assign fine-grained permissions, and control access across modules.  

- **Course Management**  
  Faculty can create and manage courses, while students browse the catalog and enroll seamlessly.  

- **Appointment Scheduling**  
  Complete scheduling system with faculty availability management, student booking, and **automatic conflict resolution**.  

- **Digital Library**  
  Browse, borrow, and return books in a fully digital library module.  

- **User Management**  
  Admins can add, edit, and deactivate users directly from the dashboard.  

- **Analytics Dashboard**  
  Visual reports on **user engagement, demographics, and course performance** powered by Recharts.  

- **Full UI Customization**  
  All user-facing text (labels, buttons, page titles) can be updated via the settings panel.  

- **Customizable Navigation**  
  Admins can **add, remove, or rename** navigation items, including visibility toggles for specific roles.  

---

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)  
- **Language**: [TypeScript](https://www.typescriptlang.org/)  
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)  
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)  
- **Charts & Analytics**: [Recharts](https://recharts.org/)  
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore)  

---

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)  
- [npm](https://www.npmjs.com/) or another package manager  
- A [Firebase Project](https://console.firebase.google.com/)  

### Installation
```bash
# Clone the repository
git clone <your-repository-url>
cd <repository-directory>

# Install dependencies
npm install
```

### Environment Setup
1. Create a `.env` file in the project root.  
2. Add your **Firebase config** from the Firebase Console:  
   *Project settings → General → Your apps → Web app → SDK setup and configuration → Config*.  

Update `src/lib/firebase.ts` and `src/lib/seed.ts` with your credentials.  

---

## 🌱 Database Seeding

Populate Firestore with initial sample data (users, courses, books, etc.):  
```bash
npm run seed
```
The script auto-detects existing collections and **skips duplicates**.  

---

## 💻 Running the Development Server

```bash
npm run dev
```
The app runs on `http://localhost:9002` by default.  

### Demo Credentials
- **Email**: `admin@campus.edu`  
- **Password**: `123`  

---

## ⚙️ Configuration

Accessible through `/dashboard/settings` as **Super Admin**.  

- **Navigation** – Add, remove, or edit menu items (labels, icons, paths, visibility).  
- **Roles & Permissions** – Create roles and manage permissions.  
- **UI Customization** – Update text, labels, and page titles to match institutional terminology.  
- **Dashboard Layout** – Configure which cards and analytics are visible to each role.  

---

## 🚀 Deployment

CampusConnect can be deployed on any **Node.js hosting provider**.  

### Recommended Platforms
- [Vercel](https://vercel.com/) – First-class support for Next.js.  
- [Firebase App Hosting](https://firebase.google.com/docs/hosting) – Already pre-configured with `apphosting.yaml`.  
- [Netlify](https://www.netlify.com/) – Excellent support for modern frameworks.  

### Build Process
```bash
# Create production build
npm run build

# Start production server
npm run start
```
Hosting providers typically automate this when connecting to your Git repo.  
