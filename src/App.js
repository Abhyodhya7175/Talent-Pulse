import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import RecruiterLogin from './components/RecruiterLogin';
import AdminLogin from './components/AdminLogin';
import StudentDashboard from './components/dashboard/StudentDashboard';
import Recommendations from './components/dashboard/Recommendations';
import Profile from './components/dashboard/Profile';
import SettingsPage from './components/dashboard/SettingsPage';
import NotificationsPage from './components/dashboard/NotificationsPage';
import RecruiterDashboard from './components/recdashboard/RecruiterDashboard';
import Postings from './components/recdashboard/Postings';
import Candidates from './components/recdashboard/Candidates';
import CandidateProfilePage from './components/recdashboard/CandidateProfilePage';
import CandidateInterviewPage from './components/recdashboard/CandidateInterviewPage';
import CandidateFavoritesPage from './components/recdashboard/CandidateFavoritesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recruiter/login" element={<RecruiterLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/recommendations" element={<Recommendations />} />
        <Route path="/student/profile" element={<Profile />} />
        <Route path="/student/settings" element={<SettingsPage />} />
        <Route path="/student/notifications" element={<NotificationsPage />} />
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter" element={<RecruiterDashboard />} />
        <Route path="/recruiter/jobs" element={<Postings />} />
        <Route path="/recruiter/candidates" element={<Candidates />} />
        <Route path="/recruiter/candidates/:candidateId" element={<CandidateProfilePage />} />
        <Route path="/recruiter/candidates/:candidateId/interview" element={<CandidateInterviewPage />} />
        <Route path="/recruiter/candidates/favorites/:candidateId" element={<CandidateFavoritesPage />} />
      </Routes>
    </Router>
  );
}

export default App;