import React, { useState } from 'react';
import { 
  Layout, Briefcase, User, LogOut, Search, 
  Bell, Settings, MoreVertical, MapPin, 
  Clock, ExternalLink, Bookmark, Ban 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/talent-pulse-logo.png';

const StudentDashboard = () => {
  // State to track which job menu is currently open (collapsed/expanded)
  const [openMenuId, setOpenMenuId] = useState(null);
  // State to track which nav menu is currently open
  const [openNavMenuId, setOpenNavMenuId] = useState(null);

  const toggleNavMenu = (id) => {
    setOpenNavMenuId(openNavMenuId === id ? null : id);
  };

  // Sample data - This will eventually come from your Python/FastAPI ML model
  const jobs = [
    { id: 1, title: "Frontend Developer", company: "Google", location: "Remote", type: "Full-time", score: 98, color: "bg-blue-500/20", iconText: "G" },
    { id: 2, title: "UI/UX Designer", company: "Airbnb", location: "San Francisco", type: "Contract", score: 85, color: "bg-red-500/20", iconText: "A" },
  ];

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="min-h-screen flex transition-colors duration-500 bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white font-sans">
      
      {/* --- SIDEBAR NAVIGATION --- */}
      <aside className="w-64 border-r border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 flex flex-col transition-colors">
        <div className="flex items-center mb-10 px-2">
          <img
          src={logo}
          alt="Talent Pulse"
          className="h-14 w-auto object-contain"
          />
        </div>


        <nav className="flex-1 space-y-2">
          <div className="relative">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-indigo-600 text-white rounded-xl font-semibold transition-all shadow-md">
              <Layout size={20} /> Dashboard
              <span className="ml-auto" onClick={(e) => { e.stopPropagation(); toggleNavMenu('dashboard'); }}>
                <MoreVertical size={18} className="hover:opacity-80" />
              </span>
            </button>
            {openNavMenuId === 'dashboard' && (
              <div className="absolute left-0 mt-2 w-full bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-indigo-600 hover:text-white transition-all text-left">
                  <ExternalLink size={14} /> Open in New Tab
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-indigo-600 hover:text-white transition-all text-left">
                  <Bookmark size={14} /> Pin to Top
                </button>
              </div>
            )}
          </div>
          <div className="relative">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all">
              <Briefcase size={20} /> Recommendations
              <span className="ml-auto" onClick={(e) => { e.stopPropagation(); toggleNavMenu('recommendations'); }}>
                <MoreVertical size={18} className="hover:text-indigo-600" />
              </span>
            </button>
            {openNavMenuId === 'recommendations' && (
              <div className="absolute left-0 mt-2 w-full bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-indigo-600 hover:text-white transition-all text-left">
                  <ExternalLink size={14} /> Open in New Tab
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-indigo-600 hover:text-white transition-all text-left">
                  <Bookmark size={14} /> Pin to Top
                </button>
              </div>
            )}
          </div>
          <div className="relative">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all">
              <User size={20} /> My Profile
              <span className="ml-auto" onClick={(e) => { e.stopPropagation(); toggleNavMenu('profile'); }}>
                <MoreVertical size={18} className="hover:text-indigo-600" />
              </span>
            </button>
            {openNavMenuId === 'profile' && (
              <div className="absolute left-0 mt-2 w-full bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-indigo-600 hover:text-white transition-all text-left">
                  <ExternalLink size={14} /> Open in New Tab
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-indigo-600 hover:text-white transition-all text-left">
                  <Bookmark size={14} /> Pin to Top
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* --- SETTINGS & LOGOUT --- */}
        <div className="pt-6 border-t border-slate-200 dark:border-white/10 space-y-2">
          <button 
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all"
          >
            <Settings size={20} /> Settings
          </button>
          <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all font-medium">
            <LogOut size={20} /> Logout
          </Link>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 p-8 overflow-y-auto relative">
        {/* Subtle Background Glow for Dark Mode */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 rounded-full filter blur-[100px] pointer-events-none"></div>

        {/* Header Section */}
        <header className="flex justify-between items-center mb-10 relative z-10">
          <div>
            <h1 className="text-3xl font-extrabold mb-1">Welcome, Abhyodhya Kumar! </h1>
            <p className="text-slate-500 dark:text-slate-400">Your AI-matched career opportunities are ready.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search jobs..." 
                className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all w-64 dark:text-white"
              />
            </div>
            <button className="p-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-all relative">
              <Bell size={22} className="text-slate-500" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white dark:border-[#0f172a]"></span>
            </button>
          </div>
        </header>

        {/* --- AI INSIGHTS STATS --- */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 relative z-10">
          {[
            { label: 'AI Match Accuracy', value: '92%', detail: 'Based on your skills', color: 'text-indigo-600 dark:text-indigo-400' },
            { label: 'Applications Sent', value: '12', detail: 'Last 30 days', color: 'text-slate-900 dark:text-white' },
            { label: 'Profile Strength', value: '75%', detail: 'Almost there!', color: 'text-emerald-600 dark:text-emerald-400' }
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-3xl shadow-sm backdrop-blur-sm transition-transform hover:scale-[1.02]">
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className={`text-3xl font-black ${stat.color}`}>{stat.value}</h3>
              <p className="text-slate-400 text-[10px] mt-2">{stat.detail}</p>
            </div>
          ))}
        </section>

        {/* --- JOB RECOMMENDATIONS LIST --- */}
        <section className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recommended for You</h2>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-3xl flex gap-6 items-start relative hover:border-indigo-500/50 transition-all group shadow-sm">
                
                {/* --- COLLAPSIBLE THREE-DOT MENU --- */}
                <div className="absolute top-6 right-6">
                  <button 
                    onClick={() => toggleMenu(job.id)}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-all"
                  >
                    <MoreVertical size={20} />
                  </button>

                  {openMenuId === job.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in duration-200">
                      <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-indigo-600 hover:text-white transition-all text-left">
                        <ExternalLink size={14} /> View Details
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-indigo-600 hover:text-white transition-all text-left">
                        <Bookmark size={14} /> Save Job
                      </button>
                      <div className="border-t border-slate-100 dark:border-white/5"></div>
                      <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all text-left">
                        <Ban size={14} /> Not Interested
                      </button>
                    </div>
                  )}
                </div>

                {/* Company Logo */}
                <div className={`w-16 h-16 ${job.color} rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-2xl group-hover:scale-110 transition-transform`}>
                  {job.iconText}
                </div>

                {/* Job Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-xl group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{job.title}</h4>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-4 mb-4">
                    <span className="font-bold text-slate-700 dark:text-slate-200">{job.company}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                  </p>

                  <div className="flex items-center gap-3">
                    <span className="bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 text-[10px] px-3 py-1 rounded-full font-black border border-indigo-600/20 uppercase tracking-widest">
                      {job.score}% AI Match
                    </span>
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