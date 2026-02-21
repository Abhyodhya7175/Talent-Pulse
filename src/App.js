import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import RecruiterLogin from './components/RecruiterLogin';
import AdminLogin from './components/AdminLogin';
import StudentDashboard from './components/dashboard/StudentDashboard';
import Recommendations from './components/dashboard/Recommendations';
import Profile from './components/dashboard/Profile';

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
      </Routes>
    </Router>
  );
}

export default App;