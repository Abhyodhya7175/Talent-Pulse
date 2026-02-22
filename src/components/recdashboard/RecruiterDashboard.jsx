import React, { useState } from 'react';
import { 
  Layout, Users, PlusCircle, Briefcase, 
  Search, Bell, Filter, MoreVertical,Logout, 
  CheckCircle, Clock, TrendingUp, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/talent-pulse-logo.png';

const RecruiterDashboard = () => {
  const [activeNav] = useState('dashboard');

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

            <div className="hidden md:flex items-center space-x-10">
              <span className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-500/20">Recruiter Hub</span>
              <Link to="/recruiter/jobs" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 font-medium transition-all">My Postings</Link>
              <Link to="/recruiter/candidates" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 font-medium transition-all">Talent Pool</Link>
            </div>

            <div className="flex items-center gap-4">
              <button className="hidden sm:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-bold transition-all">
                <PlusCircle size={18} /> Post a Job
              </button>
              <Link to="/recruiter/login" className="text-red-500 font-bold text-sm">Logout</Link>
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
            <p className="text-slate-500 dark:text-slate-400 font-medium">Manage your active postings and review AI-shortlisted talent.</p>
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
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold">Top Matched Candidates</h3>
                <button className="text-indigo-500 text-sm font-bold hover:underline">View All</button>
              </div>

              <div className="space-y-4">
                {[
                  { name: "Abhyodhya Kumar", role: "Backend Engineer", score: 96, status: "Applied", time: "2h ago" },
                  { name: "Sarah Chen", role: "Data Scientist", score: 92, status: "Screening", time: "5h ago" },
                  { name: "Marcus Wright", role: "Full Stack Dev", score: 88, status: "Applied", time: "1d ago" }
                ].map((candidate, i) => (
                  <div key={i} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-white/5 rounded-2xl border border-transparent hover:border-indigo-500/30 transition-all group">
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
                      <div className="text-right">
                        <span className="text-sm font-black text-indigo-500">{candidate.score}% Match</span>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">{candidate.status}</p>
                      </div>
                      <button className="p-2 text-slate-400 hover:text-white hover:bg-indigo-600 rounded-lg transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions / Job Status */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-500/20">
                <h3 className="font-bold text-xl mb-4">AI Hiring Insight</h3>
                <p className="text-indigo-100 text-sm leading-relaxed mb-6">
                  Based on current market trends, **Backend Engineer** roles with **FastAPI** skills are seeing 40% higher engagement.
                </p>
                <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3 mb-2 text-xs font-bold uppercase">
                    <TrendingUp size={14} /> Trending Skill
                  </div>
                  <p className="text-lg font-black">PostgreSQL</p>
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