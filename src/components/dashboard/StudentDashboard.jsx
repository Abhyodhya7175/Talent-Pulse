import React from 'react';
import { Layout, Briefcase, User, Settings, LogOut, Search, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex font-sans">
      
      {/* --- Sidebar Navigation --- */}
      <aside className="w-64 bg-white/5 border-r border-white/10 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold italic text-xl">T</div>
          <span className="text-xl font-bold tracking-tight">Talent Pulse</span>
        </div>

        <nav className="flex-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-indigo-600 rounded-xl font-semibold transition-all">
            <Layout size={20} /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-xl transition-all">
            <Briefcase size={20} /> Recommended Jobs
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-xl transition-all">
            <User size={20} /> My Profile
          </button>
        </nav>

        <div className="pt-6 border-t border-white/10 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-all">
            <Settings size={20} /> Settings
          </button>
          <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 transition-all">
            <LogOut size={20} /> Logout
          </Link>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* Header Bar */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-1">Welcome back, Student! </h1>

          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Search jobs..." 
                className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 outline-none focus:border-indigo-500 transition-all w-64"
              />
            </div>
            <button className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:border-indigo-500/50 transition-all">
            <p className="text-slate-400 text-sm mb-1">Applied Jobs</p>
            <h3 className="text-3xl font-bold">12</h3>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:border-purple-500/50 transition-all">
            <p className="text-slate-400 text-sm mb-1">AI Match Score</p>
            <h3 className="text-3xl font-bold text-indigo-400">92%</h3>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:border-emerald-500/50 transition-all">
            <p className="text-slate-400 text-sm mb-1">Interviews Scheduled</p>
            <h3 className="text-3xl font-bold text-emerald-400">3</h3>
          </div>
        </section>

        {/* Recommendations Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Intelligent Job Recommendations</h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Placeholder for JobCard components */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex gap-5 items-start">
              <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 font-bold text-xl">G</div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-lg">Frontend Developer</h4>
                  <span className="bg-indigo-600/20 text-indigo-400 text-xs px-3 py-1 rounded-full font-bold">98% Match</span>
                </div>
                <p className="text-slate-400 text-sm mb-4">Google • Mountain View, CA (Remote)</p>
                <div className="flex gap-2">
                  <span className="bg-white/5 px-3 py-1 rounded-lg text-xs text-slate-300">React</span>
                  <span className="bg-white/5 px-3 py-1 rounded-lg text-xs text-slate-300">Tailwind</span>
                  <span className="bg-white/5 px-3 py-1 rounded-lg text-xs text-slate-300">TypeScript</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;