# TalentPulse - AI-Powered Career Portal

TalentPulse is a modern, intelligent career platform designed to empower students with AI-driven job recommendations while providing streamlined portals for recruiters and administrators.

## 🚀 Recent Updates

### � Job Postings Management
- **Postings Dashboard**: Dedicated page for recruiters to manage all job listings with stats overview (Total Jobs, Active, Applicants, Views).
- **Search & Filter**: Search jobs by title, department, location, or skills; filter by status (Active, Paused, Draft, Expired).
- **Rich Job Cards**: Each posting displays:
  - Job title with color-coded status badge (Active/Green, Paused/Amber, Draft/Gray, Expired/Red)
  - Department, location, salary range, and employment type
  - Required skills as indigo tags
  - Metrics: Views, Applicants, AI-Shortlisted count
  - Days remaining until expiry indicator
  - Posted and expiration dates
- **Actions Dropdown**: Context menu for each job with View Details, Edit, Duplicate, Pause/Resume, and Delete options.
- **Create Job Modal**: Full-featured form to create new postings with:
  - Job title, department, and location fields
  - Employment type selector (Full-time, Part-time, Contract, Internship)
  - Salary range inputs
  - Required skills (comma-separated)
  - Job description textarea
  - AI-Powered Matching notice
  - Save as Draft or Publish options

### 👔 Recruiter Dashboard
- **Recruiter Hub**: Full-featured dashboard for recruiters to manage job postings and review candidates.
- **AI Shortlisting**: View AI-matched candidates with match scores and application status.
- **Hiring Insights**: Real-time AI-powered insights on trending skills and market engagement.
- **Stats Overview**: Track active jobs, total applicants, AI shortlisted candidates, and scheduled interviews.
- **Talent Pool Access**: Quick navigation to candidate management and job postings.
- **Notification Center**: Bell icon with dropdown showing recruiter-specific notifications (new applications, job approvals, interview schedules, expiring posts) with unread badge count.
- **Styled Logout Button**: Consistent logout icon matching the Student Dashboard design.
- **Interactive Nav Hover Effects**: Nav items (My Postings, Talent Pool) feature subtle indigo glow on hover.
- **Candidate Search**: Inline search bar to filter candidates by name, role, or skills.
- **Matched Skills Display**: Candidate cards now show matched skills (e.g., Python, FastAPI, PostgreSQL) as indigo tags.
- **Color-Coded Status Pills**: Application statuses displayed as scannable color-coded badges:
  - Applied (Amber), Screening (Blue), Interviewing (Green), Shortlisted (Purple), Hired (Emerald), Rejected (Red).
- **AI Insight Badges**: Each candidate card displays a personalized AI insight explaining their match (e.g., "Top 3% in Python Proficiency").

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
- **Profile Management**: Dedicated profile page for students to manage their information and skills.
- **Settings & Notifications**: Full settings page and notifications center for account management.
- **Contextual Action Menus**: Integrated "Three-Dot" (ellipsis) menus within the Sidebar navigation and Job cards to handle secondary actions like profile settings and job saving.
- **Glassmorphism Interface**: Applied a premium dark aesthetic (`#0f172a`) with frosted-glass card layouts and Lucide-React iconography.

### 🎨 Design & UI/UX
- **Role-Based Navigation**: Functional portal switching for Students, Recruiters, and Administrators.
- **Dynamic Action Menus**: Built collapsible and expandable menus using React state to keep the workspace clean and focused.
- **Responsive Elements**: Added search functionality and notification systems with real-time visual indicators.
- **Interactive Hover States**: Cards and badges feature smooth transitions, scale effects, and contextual actions on hover.
- **Dark/Light Mode Support**: Components designed with dark mode compatibility using Tailwind CSS.

### 🛠 Technical Architecture
- **React Router DOM**: Configured comprehensive routing for all portals:
  - `/` - Student Login
  - `/register` - Account Registration
  - `/recruiter/login` - Recruiter Login
  - `/recruiter` - Recruiter Dashboard
  - `/recruiter/dashboard` - Recruiter Dashboard
  - `/recruiter/jobs` - Job Postings Management
  - `/admin/login` - Admin Login
  - `/student/dashboard` - Student Dashboard
  - `/student/recommendations` - AI Recommendations
  - `/student/profile` - Profile Management
  - `/student/settings` - Settings Page
  - `/student/notifications` - Notifications Center
- **State-Driven UI**: Used `useState` to manage menu visibility, hover states, and navigation toggles within the integrated components.
- **Modular Folder Structure**: Organized dashboard-related files within specific subfolders for future scalability.

## 📦 Tech Stack

- **Frontend**: React (v19+)
- **Styling**: Tailwind CSS (v3.4+)
- **Icons**: Lucide-React
- **Navigation**: React Router DOM (v7+)
- **Build Tool**: Create React App
- **Design Pattern**: Glassmorphism

## 📂 Project Structure

```text
src/
├── components/
│   ├── dashboard/
│   │   ├── StudentDashboard.jsx  # Student hub with navigation
│   │   ├── Recommendations.jsx   # AI-matched job discovery view
│   │   ├── Profile.jsx           # Student profile management
│   │   ├── SettingsPage.jsx      # Account settings
│   │   └── NotificationsPage.jsx # Notification center
│   ├── recdashboard/
│   │   ├── RecruiterDashboard.jsx # Recruiter portal with AI insights
│   │   └── Postings.jsx          # Job postings management
│   ├── Login.jsx                 # Multi-role entry point
│   ├── Register.jsx              # Account creation
│   ├── RecruiterLogin.jsx        # Recruiter entry
│   └── AdminLogin.jsx            # System administrator entry
├── assets/                       # Images and static assets
├── App.js                        # Route definitions & Global setup
├── index.css                     # Tailwind directives
└── index.js                      # Root entry point
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 📄 License

This project is private and proprietary.