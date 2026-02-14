# TalentPulse - AI-Powered Career Portal

TalentPulse is a modern, intelligent career platform designed to empower students with AI-driven job recommendations while providing streamlined portals for recruiters and administrators.

## 🚀 Recent Updates

### 🖥️ Student Dashboard
- **Modular Organization**: Created a dedicated `dashboard` folder within components for better scalability.
- **AI Insights Bar**: Implemented a dashboard header showing "Match Accuracy," "Jobs Applied," and "Profile Strength" with dynamic progress bars.
- **Glassmorphism Interface**: Continued the premium dark theme (`#0f172a`) into the student workspace with frosted-glass card layouts.
- **Theme Toggle**: Integrated a Dark/Bright mode switcher directly into the sidebar to enhance user comfort.

### 🎨 Design & UI/UX
- **Role-Based Navigation**: Seamless switching between Student, Recruiter, and Admin portals.
- **Lucide Icon Integration**: Used high-quality vector icons for navigation, search, and action menus (three-dots).
- **Responsive Sidebar**: A fixed navigation bar with active state highlighting and logout functionality.

### 🛠 Technical Architecture
- **React Router DOM**: Managed navigation between the Login page (`/`) and the Student Dashboard (`/student/dashboard`).
- **State Management**: Shared `darkMode` state across the application using React Hooks (`useState`, `useEffect`).

## 📦 Tech Stack

- **Frontend**: React (v18+)
- **Styling**: Tailwind CSS
- **Icons**: Lucide-React
- **Navigation**: React Router DOM
- **Design Pattern**: Glassmorphism & Responsive Layout

## 📂 Updated Project Structure

```text
src/
├── components/
│   ├── dashboard/
│   │   └── StudentDashboard.jsx # NEW: Central hub for students
│   ├── Login.jsx                # Multi-role entry point
│   ├── Register.jsx             # Account creation
│   ├── RecruiterLogin.jsx       # Recruiter entry
│   └── AdminLogin.jsx           # System administrator entry
├── App.js                       # Route definitions & Theme control
├── index.css                    # Tailwind directives & Global styles
└── index.js                     # Root entry point
