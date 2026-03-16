import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Bell,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle,
  ChevronDown,
  Eye,
  Filter,
  LogOut,
  Mail,
  MapPin,
  MessageSquare,
  MoreVertical,
  Phone,
  Search,
  Sparkles,
  Star,
  Users,
  UserRoundCheck,
  X,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/talent-pulse-logo.png';
import { candidateData, notifications, stageOptions } from './candidateData';

const Candidates = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [showStageDropdown, setShowStageDropdown] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(candidateData[0]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const notificationRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowStageDropdown(false);
      }
      if (!event.target.closest('.candidate-dropdown')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((notification) => notification.unread).length;

  const filteredCandidates = useMemo(() => {
    return candidateData.filter((candidate) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        candidate.name.toLowerCase().includes(query) ||
        candidate.role.toLowerCase().includes(query) ||
        candidate.location.toLowerCase().includes(query) ||
        candidate.skills.some((skill) => skill.toLowerCase().includes(query));
      const matchesStage = stageFilter === 'all' || candidate.stage === stageFilter;

      return matchesSearch && matchesStage;
    });
  }, [searchQuery, stageFilter]);

  const stats = {
    total: candidateData.length,
    shortlisted: candidateData.filter((candidate) => candidate.stage === 'Shortlisted').length,
    interviewing: candidateData.filter((candidate) => candidate.stage === 'Interviewing').length,
    avgScore: Math.round(candidateData.reduce((sum, candidate) => sum + candidate.score, 0) / candidateData.length),
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'job':
        return <Briefcase size={16} className="text-indigo-400" />;
      case 'application':
        return <Eye size={16} className="text-blue-400" />;
      case 'success':
        return <CheckCircle size={16} className="text-green-400" />;
      default:
        return <Bell size={16} className="text-slate-400" />;
    }
  };

  const getStageStyle = (stage) => {
    switch (stage) {
      case 'Interviewing':
        return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20';
      case 'Screening':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'Applied':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'Shortlisted':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
      case 'Saved':
        return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
      default:
        return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#1e293b] border-b border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-md bg-opacity-80">
        <div className="w-full px-6">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex-shrink-0">
              <img src={logo} alt="Talent Pulse" className="h-16 w-auto object-contain" />
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link to="/recruiter" className="px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-500/10 hover:shadow-md hover:shadow-indigo-500/10 font-medium transition-all">Dashboard</Link>
              <Link to="/recruiter/jobs" className="px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-500/10 hover:shadow-md hover:shadow-indigo-500/10 font-medium transition-all">My Postings</Link>
              <span className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-500/20">Talent Pool</span>
            </div>

            <div className="flex items-center gap-3">
              <button className="hidden sm:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20">
                <MessageSquare size={18} /> Start Outreach
              </button>

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
                              <p className={`font-semibold text-sm ${notification.unread ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>{notification.title}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{notification.message}</p>
                              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 uppercase tracking-wider">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

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

      <main className="flex-1 px-6 pb-6 md:px-12 md:pb-12 pt-28">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-indigo-500 mb-3">Recruiter Workspace</p>
              <h1 className="text-3xl font-heading font-bold mb-2">Talent Pool</h1>
              <p className="text-slate-500 dark:text-slate-400 font-body max-w-2xl">
                Review AI-ranked candidates, sort your pipeline, and keep the strongest profiles close to live hiring decisions.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full lg:w-auto">
              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 min-w-[140px] shadow-sm">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Candidates</p>
                <p className="text-2xl font-black mt-1">{stats.total}</p>
              </div>
              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 min-w-[140px] shadow-sm">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Shortlisted</p>
                <p className="text-2xl font-black mt-1 text-purple-500">{stats.shortlisted}</p>
              </div>
              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 min-w-[140px] shadow-sm">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Interviewing</p>
                <p className="text-2xl font-black mt-1 text-green-500">{stats.interviewing}</p>
              </div>
              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 min-w-[140px] shadow-sm">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Avg. Match</p>
                <p className="text-2xl font-black mt-1 text-indigo-500">{stats.avgScore}%</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <section className="xl:col-span-2 space-y-5">
              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] p-5 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Search by name, role, location, or skill..."
                      className="w-full pl-11 pr-4 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    />
                  </div>
                  <div className="relative" ref={filterRef}>
                    <button
                      onClick={() => setShowStageDropdown(!showStageDropdown)}
                      className="flex items-center justify-between gap-2 min-w-[180px] px-4 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <Filter size={16} className="text-slate-400" />
                        {stageFilter === 'all' ? 'All stages' : stageFilter}
                      </span>
                      <ChevronDown size={16} className="text-slate-400" />
                    </button>

                    {showStageDropdown && (
                      <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden z-40">
                        {stageOptions.map((stage) => (
                          <button
                            key={stage}
                            onClick={() => {
                              setStageFilter(stage);
                              setShowStageDropdown(false);
                            }}
                            className={`w-full px-4 py-3 text-left text-sm hover:bg-slate-100 dark:hover:bg-white/10 transition-all ${stageFilter === stage ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : ''}`}
                          >
                            {stage === 'all' ? 'All stages' : stage}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {filteredCandidates.map((candidate) => (
                  <article
                    key={candidate.id}
                    className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] p-6 shadow-sm hover:border-indigo-500/30 hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                          {candidate.name.split(' ').map((part) => part[0]).join('')}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{candidate.name}</h3>
                            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide rounded-lg border ${getStageStyle(candidate.stage)}`}>
                              {candidate.stage}
                            </span>
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                              <Sparkles size={12} /> {candidate.score}% match
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                            <span className="flex items-center gap-1.5"><Briefcase size={14} /> {candidate.role}</span>
                            <span className="flex items-center gap-1.5"><MapPin size={14} /> {candidate.location}</span>
                            <span className="flex items-center gap-1.5"><Calendar size={14} /> {candidate.experience}</span>
                            <span className="flex items-center gap-1.5"><UserRoundCheck size={14} /> {candidate.availability}</span>
                          </div>

                          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                            {candidate.insight}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {candidate.skills.map((skill) => (
                              <span key={skill} className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
                                {skill}
                              </span>
                            ))}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {candidate.strengths.map((strength) => (
                              <span key={strength} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-white/10">
                                {strength}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-stretch lg:items-end gap-4 lg:min-w-[210px]">
                        <div className="grid grid-cols-3 gap-3 w-full lg:w-auto text-center">
                          <div className="px-3 py-3 rounded-xl bg-slate-100 dark:bg-white/5">
                            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Active</p>
                            <p className="text-xs font-semibold mt-1">{candidate.lastActive}</p>
                          </div>
                          <div className="px-3 py-3 rounded-xl bg-slate-100 dark:bg-white/5">
                            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Comp</p>
                            <p className="text-xs font-semibold mt-1">{candidate.salary}</p>
                          </div>
                          <div className="px-3 py-3 rounded-xl bg-slate-100 dark:bg-white/5">
                            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Ready</p>
                            <p className="text-xs font-semibold mt-1">{candidate.availability}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2">
                          <button
                            onClick={() => setSelectedCandidate(candidate)}
                            className="px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white/10 border border-slate-900 dark:border-white/10 hover:bg-slate-800 dark:hover:bg-white/15 transition-all text-sm font-semibold"
                          >
                            View Profile
                          </button>
                          <button className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-all text-sm font-semibold shadow-lg shadow-indigo-500/20">
                            Invite
                          </button>
                          <div className="relative candidate-dropdown">
                            <button
                              onClick={() => setActiveDropdown(activeDropdown === candidate.id ? null : candidate.id)}
                              className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                            >
                              <MoreVertical size={18} className="text-slate-500" />
                            </button>

                            {activeDropdown === candidate.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden z-40">
                                <Link
                                  to={`/recruiter/candidates/${candidate.id}`}
                                  onClick={() => setActiveDropdown(null)}
                                  className="block w-full px-4 py-3 text-left text-sm hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
                                >
                                  Open candidate
                                </Link>
                                <Link
                                  to={`/recruiter/candidates/${candidate.id}/interview`}
                                  onClick={() => setActiveDropdown(null)}
                                  className="block w-full px-4 py-3 text-left text-sm hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
                                >
                                  Move to interview
                                </Link>
                                <Link
                                  to={`/recruiter/candidates/favorites/${candidate.id}`}
                                  onClick={() => setActiveDropdown(null)}
                                  className="block w-full px-4 py-3 text-left text-sm hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
                                >
                                  Save to favorites
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <aside className="space-y-6">
              <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-cyan-950 text-white rounded-[2.25rem] p-7 shadow-xl shadow-indigo-500/20">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs font-bold uppercase tracking-widest mb-5">
                  <Zap size={14} /> AI Insight
                </div>
                <h3 className="text-2xl font-heading font-bold mb-3">Best time to reach out is within 4 hours of profile activity.</h3>
                <p className="text-sm text-indigo-100 leading-relaxed mb-6">
                  Candidates with match scores above 90% and activity in the last 24 hours are converting to recruiter replies 2.1x faster.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/10 p-4 border border-white/10">
                    <p className="text-xs uppercase tracking-widest text-indigo-100">High intent</p>
                    <p className="text-2xl font-black mt-1">4</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4 border border-white/10">
                    <p className="text-xs uppercase tracking-widest text-indigo-100">Reply uplift</p>
                    <p className="text-2xl font-black mt-1">2.1x</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-bold">Candidate Focus</h3>
                  <Star size={18} className="text-amber-500" />
                </div>

                <div className="rounded-2xl bg-slate-100 dark:bg-white/5 p-5 border border-slate-200 dark:border-white/10 mb-5">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <p className="text-lg font-bold">{selectedCandidate.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{selectedCandidate.role}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                      {selectedCandidate.score}%
                    </span>
                  </div>

                  <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2"><Mail size={14} className="text-slate-400" /> {selectedCandidate.email}</div>
                    <div className="flex items-center gap-2"><Phone size={14} className="text-slate-400" /> {selectedCandidate.phone}</div>
                    <div className="flex items-center gap-2"><Building2 size={14} className="text-slate-400" /> {selectedCandidate.education}</div>
                    <div className="flex items-center gap-2"><MapPin size={14} className="text-slate-400" /> {selectedCandidate.location}</div>
                  </div>
                </div>

                <div className="mb-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Why this candidate</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{selectedCandidate.insight}</p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Strength signals</p>
                  <div className="space-y-2">
                    {selectedCandidate.strengths.map((strength) => (
                      <div key={strength} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle size={14} className="text-green-500" />
                        {strength}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Users size={18} className="text-indigo-500" />
                  <h3 className="text-lg font-bold">Pipeline Snapshot</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Applied', value: 1, color: 'bg-amber-500' },
                    { label: 'Screening', value: 1, color: 'bg-blue-500' },
                    { label: 'Shortlisted', value: 2, color: 'bg-purple-500' },
                    { label: 'Interviewing', value: 1, color: 'bg-green-500' },
                    { label: 'Saved', value: 1, color: 'bg-slate-500' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                      <div className="flex-1 flex items-center justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-300">{item.label}</span>
                        <span className="font-bold">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Candidates;