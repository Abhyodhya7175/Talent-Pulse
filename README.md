# TalentPulse - AI-Powered Career Portal

TalentPulse is a modern, intelligent career platform designed to empower students with AI-driven job recommendations while providing streamlined portals for recruiters and administrators.

## 🚀 Recent Updates

### 🤖 AI Match Intelligence
- **Match Insight Popover**: Hover over the AI Match badge to see a detailed breakdown of why you matched with a job.
  - Skills You Have: Green-tagged skills from your profile that match the job requirements.
  - Skills to Develop: Amber-tagged skills the job requires but you currently lack.
  - Experience & Location Match indicators with visual checkmarks.
  - Direct link to update profile for improved matching.
- **Top Pick Ribbon**: The job with the highest match score is automatically highlighted with a gold "Top Pick for You" ribbon and subtle amber glow effect to draw immediate attention.

### 🖥️ Student Dashboard & Recommendations
- **Consolidated Layout**: Implemented a comprehensive Student Dashboard that serves as the main hub for job discovery.
- **AI-Matched Recommendations**: Designed a dedicated Recommendations view featuring a grid of high-match job opportunities based on student skill sets.
- **Contextual Action Menus**: Integrated "Three-Dot" (ellipsis) menus within the Sidebar navigation and Job cards to handle secondary actions like profile settings and job saving.
- **Glassmorphism Interface**: Applied a premium dark aesthetic (`#0f172a`) with frosted-glass card layouts and Lucide-React iconography.

### 🎨 Design & UI/UX
- **Role-Based Navigation**: Functional portal switching for Students, Recruiters, and Administrators.
- **Dynamic Action Menus**: Built collapsible and expandable menus using React state to keep the workspace clean and focused.
- **Responsive Elements**: Added search functionality and notification systems with real-time visual indicators.
- **Interactive Hover States**: Cards and badges feature smooth transitions, scale effects, and contextual actions on hover.

### 🛠 Technical Architecture
- **React Router DOM**: Configured routing for the Login entry (`/`), Student Dashboard (`/student/dashboard`), and Recommendations (`/student/recommendations`).
- **State-Driven UI**: Used `useState` to manage menu visibility, hover states, and navigation toggles within the integrated components.
- **Modular Folder Structure**: Organized dashboard-related files within a specific subfolder for future scalability.

## 📦 Tech Stack

- **Frontend**: React (v18+)
- **Styling**: Tailwind CSS
- **Icons**: Lucide-React
- **Navigation**: React Router DOM
- **Design Pattern**: Glassmorphism

## 📂 Project Structure

```text
src/
├── components/
│   ├── dashboard/
│   │   ├── StudentDashboard.jsx  # Integrated hub with navigation
│   │   └── Recommendations.jsx   # AI-matched job discovery view with Match Insights
│   ├── Login.jsx                 # Multi-role entry point
│   ├── Register.jsx              # Account creation
│   ├── RecruiterLogin.jsx        # Recruiter entry
│   └── AdminLogin.jsx            # System administrator entry
├── App.js                        # Route definitions & Global setup
├── index.css                     # Tailwind directives
└── index.js                      # Root entry point