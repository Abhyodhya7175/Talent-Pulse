import React, { useState, useRef, useEffect } from 'react';
import { 
  Layout, Users, PlusCircle, Briefcase, 
  Search, Bell, Filter, MoreVertical, LogOut, 
  CheckCircle, Clock, TrendingUp, Zap, X, Eye, AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/talent-pulse-logo.png';

const RecruiterDashboard = () => {
  const [activeNav] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [candidateSearch, setCandidateSearch] = useState('');
  const notificationRef = useRef(null);

  // Sample notifications data for recruiter
  const notifications = [
    { id: 1, type: 'application', title: 'New Application!', message: 'Abhyodhya Kumar applied for Backend Engineer position', time: '5 min ago', unread: true },
    { id: 2, type: 'job', title: 'Job Post Approved', message: 'Your Senior Developer posting is now live', time: '1 hour ago', unread: true },
    { id: 3, type: 'success', title: 'Interview Scheduled', message: 'Sarah Chen confirmed interview for Data Scientist role', time: '2 hours ago', unread: false },
    { id: 4, type: 'alert', title: 'Post Expiring Soon', message: 'Full Stack Developer posting expires in 3 days', time: '1 day ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'job': return <Briefcase size={16} className="text-indigo-400" />;
      case 'application': return <Eye size={16} className="text-blue-400" />;
      case 'success': return <CheckCircle size={16} className="text-green-400" />;
      case 'alert': return <AlertCircle size={16} className="text-amber-400" />;
      default: return <Bell size={16} className="text-slate-400" />;
    }
  };

  const getStatusStyle = (status) => {
    switch(status.toLowerCase()) {
      case 'interviewing': return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20';
      case 'screening': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'applied': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'shortlisted': return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20';
      case 'hired': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      default: return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
    }
  };

  // Stats for the Recruiter's overview
  const stats = [
    { label: 'Active Jobs', value: '12', icon: Briefcase, color: 'text-indigo-500' },
    { label: 'Total Applicants', value: '840', icon: Users, color: 'text-purple-500' },
    { label: 'AI Shortlisted', value: '124', icon: Zap, color: 'text-amber-500' },
    { label: 'Interviews', value: '28', icon: CheckCircle, color: 'text-green-500' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white font-sans">
      
      {/* --- RECRUITER TOP NAVBAR --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#1e293b] border-b border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-md bg-opacity-80">
        <div className="w-full px-6">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex-shrink-0">
              <img src={logo} alt="Talent Pulse" className="h-16 w-auto object-contain" />
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <span className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-500/20">Recruiter Hub</span>
              <Link to="/recruiter/jobs" className="px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-500/10 hover:shadow-md hover:shadow-indigo-500/10 font-medium transition-all">My Postings</Link>
              <Link to="/recruiter/candidates" className="px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-500/10 hover:shadow-md hover:shadow-indigo-500/10 font-medium transition-all">Talent Pool</Link>
            </div>

            <div className="flex items-center gap-3">
              <button className="hidden sm:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-bold transition-all">
                <PlusCircle size={18} /> Post a Job
              </button>
              
              {/* Notification Bell */}
              <div className="relative" ref={notificationRef}>
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all relative"
                >
                  <Bell size={20} className="text-slate-500" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl shadow-black/20 overflow-hidden z-50">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-white/10">
                      <div className="flex items-center gap-2">
                        <Bell size={18} className="text-indigo-500" />
                        <h3 className="font-bold text-lg">Notifications</h3>
                        {unreadCount > 0 && (
                          <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-500 rounded-full text-xs font-bold">{unreadCount} new</span>
                        )}
                      </div>
                      <button onClick={() => setShowNotifications(false)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-all">
                        <X size={18} className="text-slate-400" />
                      </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className={`px-5 py-4 border-b border-slate-50 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer ${notification.unread ? 'bg-indigo-50/50 dark:bg-indigo-500/5' : ''}`}>
                          <div className="flex gap-3">
                            <div className={`p-2 rounded-xl ${notification.unread ? 'bg-indigo-100 dark:bg-indigo-500/20' : 'bg-slate-100 dark:bg-white/10'}`}>
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <p className={`font-semibold text-sm ${notification.unread ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>{notification.title}</p>
                                {notification.unread && <span className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0 mt-1.5"></span>}
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">{notification.message}</p>
                              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 uppercase tracking-wider">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-5 py-3 bg-slate-50 dark:bg-white/5 border-t border-slate-100 dark:border-white/10">
                      <button className="block w-full text-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-all">View All Notifications</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <Link 
                to="/" 
                className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all font-medium"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 px-6 pb-6 md:px-12 md:pb-12 pt-28">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="mb-10">
            <h1 className="text-3xl font-heading mb-2">Recruiter Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 font-body">Manage your active postings and review AI-shortlisted talent.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-[2rem] flex items-center gap-5 shadow-sm">
                <div className={`p-4 rounded-2xl bg-slate-100 dark:bg-white/5 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-2xl font-black mt-1">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Recent Applicants (Candidate List) */}
            <div className="lg:col-span-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h3 className="text-xl font-heading font-bold">Top Matched Candidates</h3>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-initial">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search candidates..."
                      value={candidateSearch}
                      onChange={(e) => setCandidateSearch(e.target.value)}
                      className="w-full sm:w-48 pl-9 pr-3 py-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    />
                  </div>
                  <button className="text-indigo-500 text-sm font-bold hover:underline whitespace-nowrap">View All</button>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { name: "Abhyodhya Kumar", role: "Backend Engineer", score: 96, status: "Applied", time: "2h ago", skills: ["Python", "FastAPI", "PostgreSQL"], aiInsight: "Top 3% in Python Proficiency" },
                  { name: "Sarah Chen", role: "Data Scientist", score: 92, status: "Screening", time: "5h ago", skills: ["Python", "TensorFlow", "SQL"], aiInsight: "Top 5% in ML/AI Skills" },
                  { name: "Marcus Wright", role: "Full Stack Dev", score: 88, status: "Applied", time: "1d ago", skills: ["React", "Node.js", "MongoDB"], aiInsight: "Strong full-stack experience" }
                ].filter(candidate => 
                  candidate.name.toLowerCase().includes(candidateSearch.toLowerCase()) ||
                  candidate.role.toLowerCase().includes(candidateSearch.toLowerCase()) ||
                  candidate.skills.some(skill => skill.toLowerCase().includes(candidateSearch.toLowerCase()))
                ).map((candidate, i) => (
                  <div key={i} className="p-5 bg-slate-50 dark:bg-white/5 rounded-2xl border border-transparent hover:border-indigo-500/30 transition-all group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center text-indigo-400 font-bold">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm group-hover:text-indigo-500 transition-colors">{candidate.name}</h4>
                          <p className="text-xs text-slate-500">{candidate.role} • {candidate.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end gap-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-black text-indigo-500">{candidate.score}% Match</span>
                          </div>
                          {/* AI Insight Badge */}
                          <div className="px-2.5 py-1 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-md">
                            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">{candidate.aiInsight}</span>
                          </div>
                          <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide rounded-lg border ${getStatusStyle(candidate.status)}`}>
                            {candidate.status}
                          </span>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-white hover:bg-indigo-600 rounded-lg transition-all">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </div>
                    {/* Matched Skills */}
                    <div className="flex items-center gap-2 ml-16">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Matched Skills:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {candidate.skills.map((skill, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-semibold rounded-md">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions / Job Status */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-500/20">
                <h3 className="font-bold font-heading text-xl mb-4">AI Hiring Insight</h3>
                <p className="text-indigo-100 text-sm font-body leading-relaxed mb-6">
                  Based on current market trends, **Backend Engineer** roles with **FastAPI** skills are seeing 40% higher engagement.
                </p>
                <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3 mb-2 text-xs font-heading uppercase">
                    <TrendingUp size={14} /> Trending Skill
                  </div>
                  <p className="text-lg font-black font-heading">PostgreSQL</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default RecruiterDashboard;