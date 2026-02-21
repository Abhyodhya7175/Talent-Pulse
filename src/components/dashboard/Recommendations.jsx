import React, { useState } from 'react';
import { 
  Layout, Briefcase, User, Settings, LogOut, Search, 
  Bell, Filter, MapPin, Clock, 
  MoreVertical, ExternalLink, Bookmark, Ban, Sparkles,
  Check, X, TrendingUp, Crown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/talent-pulse-logo.png';

const Recommendations = () => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [activeNav, setActiveNav] = useState('recommendations');
  const [hoveredMatchId, setHoveredMatchId] = useState(null);

  // Sample data simulating the AI recommendation engine results
  const recommendedJobs = [
    { 
      id: 1, 
      title: "Backend Engineer", 
      company: "Meta", 
      loc: "Remote", 
      type: "Full-time", 
      score: 96, 
      tags: ["Python", "FastAPI", "PostgreSQL"], 
      logo: "https://img.logo.dev/meta.com?token=pk_H1z1R2K2SxuyCCd3izKt5w&size=154&retina=true",
      matchDetails: { 
        skillsMatched: ["Python", "FastAPI"], 
        skillsMissing: ["PostgreSQL"],
        experienceMatch: true,
        locationMatch: true
      } 
    },
    { 
      id: 2, 
      title: "Data Scientist", 
      company: "Tesla", 
      loc: "Austin, TX", 
      type: "Full-time", 
      score: 89, 
      tags: ["Python", "PyTorch", "ML"], 
      logo: "https://img.logo.dev/tesla.com?token=pk_H1z1R2K2SxuyCCd3izKt5w&size=194&retina=true",
      matchDetails: { 
        skillsMatched: ["Python", "ML"], 
        skillsMissing: ["PyTorch"],
        experienceMatch: true,
        locationMatch: false
      } 
    },
    { 
      id: 3, 
      title: "Full Stack Developer", 
      company: "Netflix", 
      loc: "Los Gatos, CA", 
      type: "Contract", 
      score: 92, 
      tags: ["Next.js", "Node.js", "Tailwind"], 
      logo: "https://img.logo.dev/netflix.com?token=pk_H1z1R2K2SxuyCCd3izKt5w&size=194&retina=true",
      matchDetails: { 
        skillsMatched: ["Next.js", "Node.js", "Tailwind"], 
        skillsMissing: [],
        experienceMatch: true,
        locationMatch: false
      } 
    },
    { 
      id: 4, 
      title: "Product Designer", 
      company: "Spotify", 
      loc: "Remote", 
      type: "Full-time", 
      score: 84, 
      tags: ["Figma", "UI/UX", "Research"], 
      logo: "https://img.logo.dev/spotify.com?token=pk_H1z1R2K2SxuyCCd3izKt5w&size=194&retina=true",
      matchDetails: { 
        skillsMatched: ["Figma", "UI/UX"], 
        skillsMissing: ["Research"],
        experienceMatch: false,
        locationMatch: true
      } 
    },
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
            {recommendedJobs.map((job) => {
              // Determine if this is the top pick (highest score)
              const isTopPick = job.score === Math.max(...recommendedJobs.map(j => j.score));
              
              return (
              <div 
                key={job.id} 
                className={`bg-white dark:bg-white/5 border p-6 rounded-3xl flex gap-5 items-start relative hover:shadow-xl transition-all duration-300 group ${
                  isTopPick 
                    ? 'border-amber-400/50 dark:border-amber-500/30 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 ring-1 ring-amber-400/20' 
                    : 'border-slate-200/80 dark:border-white/10 hover:border-indigo-500/50 hover:shadow-indigo-500/5'
                }`}
              >
                
                {/* Top Pick Ribbon */}
                {isTopPick && (
                  <div className="absolute -top-3 left-6 z-10">
                    <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg shadow-amber-500/30">
                      <Crown size={12} className="fill-white" />
                      <span>Top Pick for You</span>
                    </div>
                  </div>
                )}
                
                {/* Subtle glow effect for top pick */}
                {isTopPick && (
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 pointer-events-none"></div>
                )}
                
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
                    {/* Match Badge with Insight Popover */}
                    <div 
                      className="relative"
                      onMouseEnter={() => setHoveredMatchId(job.id)}
                      onMouseLeave={() => setHoveredMatchId(null)}
                    >
                      <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs px-4 py-2 rounded-full font-bold shadow-sm cursor-help flex items-center gap-1.5 hover:shadow-lg hover:scale-105 transition-all">
                        <TrendingUp size={12} />
                        {job.score}% AI Match
                      </span>
                      
                      {/* Match Insight Popover */}
                      {hoveredMatchId === job.id && job.matchDetails && (
                        <div className="absolute bottom-full left-0 mb-3 w-72 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                          {/* Popover Arrow */}
                          <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white dark:bg-[#1e293b] border-r border-b border-slate-200 dark:border-white/10 transform rotate-45"></div>
                          
                          {/* Header */}
                          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3">
                            <div className="flex items-center gap-2 text-white">
                              <Sparkles size={16} />
                              <span className="font-bold text-sm">Match Insight</span>
                            </div>
                            <p className="text-indigo-100 text-xs mt-1">Why you're a {job.score}% match</p>
                          </div>
                          
                          {/* Content */}
                          <div className="p-4 space-y-4">
                            {/* Skills You Have */}
                            {job.matchDetails.skillsMatched.length > 0 && (
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-5 h-5 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center">
                                    <Check size={12} className="text-green-600 dark:text-green-400" />
                                  </div>
                                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Skills You Have</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5 ml-7">
                                  {job.matchDetails.skillsMatched.map(skill => (
                                    <span key={skill} className="px-2.5 py-1 bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 rounded-lg text-xs font-medium">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Skills to Develop */}
                            {job.matchDetails.skillsMissing.length > 0 && (
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-5 h-5 bg-amber-100 dark:bg-amber-500/20 rounded-full flex items-center justify-center">
                                    <X size={12} className="text-amber-600 dark:text-amber-400" />
                                  </div>
                                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Skills to Develop</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5 ml-7">
                                  {job.matchDetails.skillsMissing.map(skill => (
                                    <span key={skill} className="px-2.5 py-1 bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 rounded-lg text-xs font-medium">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Additional Match Factors */}
                            <div className="pt-3 border-t border-slate-100 dark:border-white/5">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-500 dark:text-slate-400">Experience Level</span>
                                <span className={`font-medium flex items-center gap-1 ${job.matchDetails.experienceMatch ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                                  {job.matchDetails.experienceMatch ? <Check size={12} /> : <X size={12} />}
                                  {job.matchDetails.experienceMatch ? 'Match' : 'Partial'}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-xs mt-2">
                                <span className="text-slate-500 dark:text-slate-400">Location Preference</span>
                                <span className={`font-medium flex items-center gap-1 ${job.matchDetails.locationMatch ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                                  {job.matchDetails.locationMatch ? <Check size={12} /> : <X size={12} />}
                                  {job.matchDetails.locationMatch ? 'Match' : 'Partial'}
                                </span>
                              </div>
                            </div>
                            
                            {/* CTA */}
                            {job.matchDetails.skillsMissing.length > 0 && (
                              <Link 
                                to="/student/profile" 
                                className="block text-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 pt-2"
                              >
                                Update your profile to improve match →
                              </Link>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <button className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                      Quick Apply →
                    </button>
                  </div>
                </div>
              </div>
            );
            })}
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