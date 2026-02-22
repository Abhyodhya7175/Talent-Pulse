import React, { useState } from 'react';
import { Mail, Eye, EyeOff, Lock, User, Briefcase, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/student/dashboard');
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden font-sans px-4">
      
      {/* Background Animated Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>

      {/* Main Login Card */}
      <div className="relative z-10 max-w-md w-full bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8 sm:p-10 transition-all hover:border-white/20">
        
        {/* Role Switcher Tabs */}
        <div className="flex bg-slate-900/50 p-1 rounded-2xl mb-8 border border-white/5">
          <Link to="/" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-lg transition-all">
            <User size={14} /> Student
          </Link>
          <Link to="/recruiter/login" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-slate-400 text-xs font-bold hover:text-white transition-all">
            <Briefcase size={14} /> Recruiter
          </Link>
          <Link to="/admin/login" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-slate-400 text-xs font-bold hover:text-white transition-all">
            <ShieldCheck size={14} /> Admin
          </Link>
        </div> 

        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-extrabold text-white tracking-tight mb-2">Talent Pulse</h1>
          <p className="text-slate-400 text-sm font-medium">Empowering your career with AI intelligence.</p>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1.5 ml-1 text-left">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
              <input type="email" required className="w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all outline-none text-white placeholder:text-slate-500" placeholder="name@example.com" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1.5 ml-1 text-left">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
              <input type={showPassword ? "text" : "password"} required className="w-full pl-11 pr-12 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all outline-none text-white placeholder:text-slate-500" placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-indigo-400 transition-colors">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-bold hover:from-indigo-500 hover:to-purple-500 active:scale-[0.98] transition-all shadow-lg shadow-indigo-500/25 border border-white/10">
            Sign In as Student
          </button>
        </form>

        <p className="mt-8 text-center text-slate-400 text-sm">
          New here? <Link to="/register" className="text-indigo-400 font-bold hover:text-indigo-300 hover:underline transition-colors">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;