import React, { useState } from 'react';
import { 
  Layout, Briefcase, User, LogOut, Search, 
  Bell, Settings, MoreVertical, MapPin, 
  Clock, ExternalLink, Bookmark, Ban,
  TrendingUp, Send, Award, ChevronRight, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/talent-pulse-logo.png';

const StudentDashboard = () => {
  // State to track which job menu is currently open (collapsed/expanded)
  const [openMenuId, setOpenMenuId] = useState(null);
  // State to track active nav item
  const [activeNav, setActiveNav] = useState('dashboard');

  // Sample data - This will eventually come from your Python/FastAPI ML model
  const jobs = [
    { id: 1, title: "Frontend Developer", company: "Google", location: "Remote", type: "Full-time", score: 98, color: "bg-blue-500/20", iconText: "G" },
    { id: 2, title: "UI/UX Designer", company: "Airbnb", location: "San Francisco", type: "Contract", score: 85, color: "bg-red-500/20", iconText: "A" },
  ];

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Layout, path: '/student/dashboard' },
    { id: 'recommendations', label: 'Recommendations', icon: Briefcase, path: '/student/recommendations' },
    { id: 'profile', label: 'My Profile', icon: User, path: '/student/profile' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/student/settings' },
  ];

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white font-sans">
      
      {/* --- TOP NAVBAR --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#1e293b] border-b border-slate-200 dark:border-white/10 shadow-sm">
        <div className="w-full px-6">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo - Big and Visible - Leftmost Corner */}
            <div className="flex-shrink-0">
              <img
                src={logo}
                alt="Talent Pulse"
                className="h-16 w-auto object-contain"
              />
            </div>

            {/* Navigation Links - Center */}
            <div className="hidden md:flex items-center space-x-10">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                      activeNav === item.id
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Logout Button - Right */}
            <div className="flex items-center gap-3">
              <button className="p-2.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all relative">
                <Bell size={20} className="text-slate-500" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white dark:border-[#1e293b]"></span>
              </button>
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

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-slate-200 dark:border-white/10 px-4 py-2 flex items-center justify-around overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                  activeNav === item.id
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 p-6 md:p-8 pt-32 md:pt-28 overflow-y-auto relative">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full filter blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full filter blur-[100px] pointer-events-none"></div>

        {/* Welcome Banner */}
        <header className="relative mb-10 z-10">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-indigo-500/20 overflow-hidden relative">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4"></div>
            <div className="absolute bottom-0 left-1/2 w-32 h-32 bg-white/5 rounded-full translate-y-1/2"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={20} className="text-yellow-300" />
                  <span className="text-indigo-200 text-sm font-medium">AI-Powered Matching</span>
                </div>
                <h1 className="text-3xl md:text-4xl text-white-500 font-playwrite font-extrabold tracking-tighter mb-2">Welcome back, Abhyodhya!</h1>
                <p className="text-indigo-100 text-lg">Your personalized career opportunities await.</p>
              </div>
              
              <div className="relative">
                <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search jobs, companies..." 
                  className="bg-white/95 backdrop-blur-sm border-0 rounded-2xl pl-12 pr-6 py-3.5 outline-none focus:ring-4 focus:ring-white/30 transition-all w-full md:w-80 text-slate-800 placeholder:text-slate-400 shadow-lg"
                />
              </div>
            </div>
          </div>
        </header>

        {/* --- AI INSIGHTS STATS --- */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 relative z-10">
          {[
            { 
              label: 'AI Match Accuracy', 
              value: '92%', 
              detail: 'Based on your skills & preferences', 
              icon: TrendingUp,
              color: 'text-indigo-600 dark:text-indigo-400',
              bgColor: 'bg-indigo-500/10',
              iconBg: 'bg-indigo-500/20'
            },
            { 
              label: 'Applications Sent', 
              value: '12', 
              detail: 'Last 30 days', 
              icon: Send,
              color: 'text-emerald-600 dark:text-emerald-400',
              bgColor: 'bg-emerald-500/10',
              iconBg: 'bg-emerald-500/20'
            },
            { 
              label: 'Profile Strength', 
              value: '75%', 
              detail: 'Complete your profile to improve', 
              icon: Award,
              color: 'text-amber-600 dark:text-amber-400',
              bgColor: 'bg-amber-500/10',
              iconBg: 'bg-amber-500/20'
            }
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 p-6 rounded-3xl shadow-sm hover:shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-indigo-500/30 group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${stat.iconBg}`}>
                    <Icon size={24} className={stat.color} />
                  </div>
                  <ChevronRight size={20} className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className={`text-4xl font-black ${stat.color} mb-1`}>{stat.value}</h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm font-semibold mb-1">{stat.label}</p>
                <p className="text-slate-400 dark:text-slate-500 text-xs">{stat.detail}</p>
              </div>
            );
          })}
        </section>

        {/* --- JOB RECOMMENDATIONS LIST --- */}
        <section className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-heading font-boldmb-1">Recommended for You</h2>
              <p className="text-slate-500 font-body dark:text-slate-400 text-sm">Jobs matching your profile and preferences</p>
            </div>
            <button className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:underline flex items-center gap-1">
              View All <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 p-6 rounded-3xl flex gap-5 items-start relative hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group">
                
                {/* --- COLLAPSIBLE THREE-DOT MENU --- */}
                <div className="absolute top-5 right-5">
                  <button 
                    onClick={() => toggleMenu(job.id)}
                    className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-all"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {openMenuId === job.id && (
                    <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in duration-200 p-1">
                      <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-600 dark:text-slate-300 hover:bg-indigo-600 hover:text-white rounded-xl transition-all text-left">
                        <ExternalLink size={16} /> View Details
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-600 dark:text-slate-300 hover:bg-indigo-600 hover:text-white rounded-xl transition-all text-left">
                        <Bookmark size={16} /> Save Job
                      </button>
                      <div className="border-t border-slate-100 dark:border-white/5 my-1"></div>
                      <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all text-left">
                        <Ban size={16} /> Not Interested
                      </button>
                    </div>
                  )}
                </div>

                {/* Company Logo */}
                <div className={`w-16 h-16 ${job.color} rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-2xl group-hover:scale-110 transition-transform shadow-sm`}>
                  {job.iconText}
                </div>

                {/* Job Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xl mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate pr-8">{job.title}</h4>
                  <p className="text-slate-700 dark:text-slate-200 font-semibold mb-3">{job.company}</p>
                  
                  <div className="flex flex-wrap items-center gap-3 mb-4 text-slate-500 dark:text-slate-400 text-sm">
                    <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-lg">
                      <MapPin size={14} /> {job.location}
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-lg">
                      <Clock size={14} /> {job.type}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs px-4 py-2 rounded-full font-bold shadow-sm">
                      {job.score}% AI Match
                    </span>
                    <button className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                      Quick Apply →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Close menu when clicking backdrop */}
      {openMenuId !== null && (
        <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)} />
      )}
    </div>
  );
};

export default StudentDashboard;