import React from 'react';
import { Briefcase, Lock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecruiterLogin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 font-sans p-4">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-2xl mb-4 shadow-lg shadow-emerald-500/30">
            <Briefcase className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Recruiter Portal</h1>
          <p className="text-slate-400 mt-2">Hire top talent for your organization.</p>
        </div>
        
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="relative group">
            <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
            <input type="email" placeholder="Work Email" className="w-full pl-12 pr-4 py-3.5 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-emerald-500/50" />
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
            <input type="password" placeholder="Password" className="w-full pl-12 pr-4 py-3.5 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-emerald-500/50" />
          </div>
          <button className="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-bold hover:bg-emerald-700 transition-all">
            Login as Recruiter
          </button>
        </form>
        <p className="mt-8 text-center text-slate-500 text-sm">
          Want to hire? <Link to="/register" className="text-emerald-500 font-bold hover:underline">Request Access</Link>
        </p>
      </div>
    </div>
  );
};

export default RecruiterLogin;