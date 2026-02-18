import React, { useState } from 'react';
import { 
  Layout, Briefcase, User, Settings, LogOut, Search, 
  Bell, Filter, MapPin, Clock, 
  MoreVertical, ExternalLink, Bookmark, Ban, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/talent-pulse-logo.png';

const Recommendations = () => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [activeNav, setActiveNav] = useState('recommendations');

  // Sample data simulating the AI recommendation engine results
  const recommendedJobs = [
    { id: 1, title: "Backend Engineer", company: "Meta", loc: "Remote", type: "Full-time", score: 96, tags: ["Python", "FastAPI", "PostgreSQL"], logo: "https://img.logo.dev/meta.com?token=pk_H1z1R2K2SxuyCCd3izKt5w&size=154&retina=true" },
    { id: 2, title: "Data Scientist", company: "Tesla", loc: "Austin, TX", type: "Full-time", score: 89, tags: ["Python", "PyTorch", "ML"], logo: "https://img.logo.dev/tesla.com?token=pk_H1z1R2K2SxuyCCd3izKt5w&size=194&retina=true" },
    { id: 3, title: "Full Stack Developer", company: "Netflix", loc: "Los Gatos, CA", type: "Contract", score: 92, tags: ["Next.js", "Node.js", "Tailwind"], logo: "https://img.logo.dev/netflix.com?token=pk_H1z1R2K2SxuyCCd3izKt5w&size=194&retina=true" },
    { id: 4, title: "Product Designer", company: "Spotify", loc: "Remote", type: "Full-time", score: 84, tags: ["Figma", "UI/UX", "Research"], logo: "https://img.logo.dev/spotify.com?token=pk_H1z1R2K2SxuyCCd3izKt5w&size=194&retina=true" },
  ];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Layout, path: '/student/dashboard' },
    { id: 'recommendations', label: 'Recommendations', icon: Briefcase, path: '/student/recommendations' },
    { id: 'profile', label: 'My Profile', icon: User, path: '/student/profile' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/student/settings' },
  ];

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

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
      <main className="flex-1 p-6 md:p-8 pt-28 md:pt-28 overflow-y-auto relative">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full filter blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full filter blur-[100px] pointer-events-none"></div>

        {/* --- Page Header with Search --- */}
        <section className="relative z-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={16} className="text-indigo-500" />
                <span className="text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider">AI-Powered</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold mb-1">Recommended Jobs</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm"style={{fontFamily: 'Sora, sans-serif'}}>Opportunities matched to your skills and preferences</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search jobs..." 
                  className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all w-full md:w-64 text-sm placeholder:text-slate-400"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all text-sm font-semibold text-slate-600 dark:text-slate-300">
                <Filter size={16} /> Filters
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {recommendedJobs.map((job) => (
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
                <div className="w-12 h-12 bg-white dark:bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm border border-slate-100 dark:border-white/10 overflow-hidden flex-shrink-0">
                  <img 
                    src={job.logo} 
                    alt={job.company} 
                    className="w-8 h-8 object-contain"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                  />
                  <span className="hidden text-indigo-600 dark:text-indigo-400 font-bold text-lg">{job.company[0]}</span>
                </div>

                {/* Job Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xl mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate pr-8">{job.title}</h4>
                  <p className="text-slate-700 dark:text-slate-200 font-semibold mb-3">{job.company}</p>
                  
                  <div className="flex flex-wrap items-center gap-3 mb-4 text-slate-500 dark:text-slate-400 text-sm">
                    <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-lg">
                      <MapPin size={14} /> {job.loc}
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-lg">
                      <Clock size={14} /> {job.type}
                    </span>
                  </div>

                  {/* Skill Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-lg text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5">
                        {tag}
                      </span>
                    ))}
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

export default Recommendations;