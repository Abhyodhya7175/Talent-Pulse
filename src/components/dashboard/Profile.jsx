import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, MapPin, GraduationCap, 
  Briefcase, Plus, X, CheckCircle, Camera, Upload, Sparkles, Settings,
  Layout, Bell, LogOut
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/talent-pulse-logo.png';

const Profile = () => {
  const [activeNav] = useState('profile');
  const [skills, setSkills] = useState(['React', 'Java', 'Python', 'Tailwind CSS', 'Node.js']);
  const [newSkill, setNewSkill] = useState('');
  const [hasResume, setHasResume] = useState(false);
  const [progress, setProgress] = useState(0);

  // Logic to calculate profile completion percentage
  const calculateCompletion = () => {
    let score = 20; // Base score for account setup
    if (skills.length > 0) score += 20;
    if (skills.length > 5) score += 10;
    if (hasResume) score += 40;
    // Add 10% for basic info (Email/Location)
    score += 10; 
    return score;
  };

  // Animate the progress bar on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(calculateCompletion());
    }, 500);
    return () => clearTimeout(timer);
  }, [skills, hasResume]);

  const addSkill = (e) => {
    e.preventDefault();
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleResumeUpload = (e) => {
    if (e.target.files[0]) {
      setHasResume(true);
      // This data will eventually update TalentPulse_SkillMatch_v1.csv
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white font-sans">
      
      {/* --- TOP NAVBAR (Sticky & Glassmorphism) --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#1e293b] border-b border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-md bg-opacity-80">
        <div className="w-full px-6">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
              <img src={logo} alt="Talent Pulse" className="h-16 w-auto object-contain" />
            </Link>

            <div className="hidden md:flex items-center space-x-10">
              <Link to="/student/dashboard" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 font-medium transition-all">
                <Layout size={18} />
                Dashboard
              </Link>
              <Link to="/student/recommendations" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 font-medium transition-all">
                <Briefcase size={18} />
                Recommendations
              </Link>
              <span className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-500/20">
                <User size={18} />
                My Profile
              </span>
              <Link to="/student/settings" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 font-medium transition-all">
                <Settings size={18} />
                Settings
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all relative">
                <Bell size={20} className="text-slate-500" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white dark:border-[#1e293b]"></span>
              </button>
              <Link to="/" className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all font-bold text-sm">
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 px-6 md:px-12 pt-28 md:pt-32 pb-12 relative">
        {/* Decorative Background Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 rounded-full filter blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/5 rounded-full filter blur-[100px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto">
          
          {/* --- PROFILE STRENGTH SECTION (Gamification) --- */}
          <div className="mb-10 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8 rounded-[2rem] backdrop-blur-sm relative overflow-hidden group">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={18} className="text-indigo-500" />
                  <h3 className="font-heading text-xl tracking-tight">Profile Strength</h3>
                </div>
                <p className=" font-body text-slate-500 dark:text-slate-400">
                  {progress < 100 ? "Add a resume to reach 100% and boost AI match accuracy." : "Your profile is fully optimized for AI discovery!"}
                </p>
              </div>
              <div className="text-4xl font-black text-indigo-500 drop-shadow-sm font-heading">{progress}%</div>
            </div>
            
            <div className="w-full h-4 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden border border-slate-200 dark:border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_100%] animate-gradient transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Personal Info Card */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8 rounded-[2rem] text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-20"></div>
                <div className="relative pt-4">
                  <div className="relative inline-block group">
                    <div className="w-32 h-32 bg-indigo-600/20 rounded-full border-4 border-white dark:border-[#0f172a] mx-auto flex items-center justify-center text-4xl font-black text-indigo-400 shadow-xl group-hover:scale-105 transition-transform duration-300">
                      AK
                    </div>
                    <label className="absolute bottom-1 right-1 p-2.5 bg-indigo-600 rounded-xl text-white border-2 border-white dark:border-[#0f172a] hover:bg-indigo-500 cursor-pointer shadow-lg transition-all">
                      <Camera size={16} />
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                  <h2 className="text-2xl font-heading mt-5 tracking-tight">Abhyodhya Kumar</h2>
                  <p className="text-indigo-500 dark:text-indigo-400 font-semibold text-sm uppercase tracking-wider">Computer Science Student</p>
                </div>

                <div className="mt-8 space-y-4 text-left border-t border-slate-100 dark:border-white/5 pt-6">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm font-medium">
                    <div className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg"><Mail size={16} /></div>
                    abhyodhya.k@example.com
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm font-medium">
                    <div className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg"><MapPin size={16} /></div>
                    Bhubaneswar, India
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm font-medium">
                    <div className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg"><GraduationCap size={16} /></div>
                    IIT Bhubaneswar
                  </div>
                </div>
              </div>

              {/* Resume Upload Card */}
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 rounded-[2rem] text-white shadow-2xl shadow-indigo-500/30 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <h3 className="font-bold text-xl mb-3 flex items-center gap-2 relative z-10">
                  <Upload size={22} /> Resume
                </h3>
                <p className="text-indigo-100 text-xs mb-6 leading-relaxed relative z-10 font-medium">
                  {hasResume ? "✓ Resume is active and being scanned by AI." : "Upload your resume to automatically extract skills and update matches."}
                </p>
                <label className="block w-full text-center py-3.5 bg-white text-indigo-700 rounded-2xl font-black text-sm hover:bg-indigo-50 transition-all cursor-pointer shadow-lg relative z-10 active:scale-95">
                  {hasResume ? "Update Resume" : "Upload PDF"}
                  <input type="file" className="hidden" accept=".pdf" onChange={handleResumeUpload} />
                </label>
              </div>
            </div>

            {/* Right Column: Skills & Projects */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8 rounded-[2rem] shadow-sm">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <Briefcase className="text-indigo-500" /> Technical Skills
                </h3>
                
                <form onSubmit={addSkill} className="flex gap-3 mb-8">
                  <input 
                    type="text" 
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill (e.g. AWS, Machine Learning)..."
                    className="flex-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm font-medium"
                  />
                  <button type="submit" className="bg-indigo-600 p-3.5 rounded-2xl text-white hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 active:scale-90">
                    <Plus size={24} />
                  </button>
                </form>

                <div className="flex flex-wrap gap-3">
                  {skills.map(skill => (
                    <span key={skill} className="flex items-center gap-2.5 px-5 py-2.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 rounded-2xl text-sm font-bold group hover:bg-indigo-600 hover:text-white transition-all duration-300">
                      {skill}
                      <X size={16} className="cursor-pointer opacity-40 group-hover:opacity-100 hover:scale-125 transition-all" onClick={() => removeSkill(skill)} />
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8 rounded-[2rem] shadow-sm">
                <h3 className="text-xl font-bold mb-6">Portfolio Projects</h3>
                <div className="space-y-4">
                  <div className="p-6 bg-slate-100 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 hover:border-indigo-500/30 transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg text-indigo-500 flex items-center gap-2">
                        <CheckCircle size={18} /> Talent-Pulse
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-1 bg-indigo-500/10 rounded-md text-indigo-400 uppercase tracking-widest">Active</span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      Advanced career hub featuring an AI-driven matching engine and real-time brand logo integration via Logo.dev API.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;