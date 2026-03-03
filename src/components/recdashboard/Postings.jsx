import React, { useState, useRef, useEffect } from 'react';
import { 
  Briefcase, PlusCircle, Search, Bell, LogOut, X, Eye, 
  Edit3, Trash2, Copy, Pause, Play, Users, Clock, MapPin,
  DollarSign, Calendar, Filter, ChevronDown, Building2,
  TrendingUp, Zap, CheckCircle, AlertCircle, MoreVertical
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/talent-pulse-logo.png';

const Postings = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const notificationRef = useRef(null);
  const filterRef = useRef(null);

  // Sample job postings data
  const [jobPostings] = useState([
    {
      id: 1,
      title: 'Senior Backend Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$150k - $200k',
      status: 'active',
      postedDate: '2026-02-15',
      expiresDate: '2026-03-15',
      views: 1240,
      applicants: 86,
      shortlisted: 12,
      skills: ['Python', 'FastAPI', 'PostgreSQL', 'AWS'],
      description: 'We are looking for an experienced Backend Engineer to join our growing team...'
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '$120k - $160k',
      status: 'active',
      postedDate: '2026-02-20',
      expiresDate: '2026-03-20',
      views: 890,
      applicants: 54,
      shortlisted: 8,
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
      description: 'Join our product team to build innovative solutions...'
    },
    {
      id: 3,
      title: 'Data Scientist',
      department: 'Data & Analytics',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$140k - $180k',
      status: 'paused',
      postedDate: '2026-02-10',
      expiresDate: '2026-03-10',
      views: 560,
      applicants: 32,
      shortlisted: 5,
      skills: ['Python', 'TensorFlow', 'SQL', 'Machine Learning'],
      description: 'Looking for a passionate Data Scientist to drive insights...'
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      department: 'Infrastructure',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$130k - $170k',
      status: 'draft',
      postedDate: null,
      expiresDate: null,
      views: 0,
      applicants: 0,
      shortlisted: 0,
      skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform'],
      description: 'Help us scale our infrastructure and improve CI/CD...'
    },
    {
      id: 5,
      title: 'Product Designer',
      department: 'Design',
      location: 'Los Angeles, CA',
      type: 'Contract',
      salary: '$80/hr - $120/hr',
      status: 'expired',
      postedDate: '2026-01-15',
      expiresDate: '2026-02-15',
      views: 720,
      applicants: 45,
      shortlisted: 7,
      skills: ['Figma', 'UI/UX', 'Prototyping', 'User Research'],
      description: 'Create beautiful and intuitive user experiences...'
    },
    {
      id: 6,
      title: 'Machine Learning Engineer',
      department: 'AI/ML',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$160k - $220k',
      status: 'active',
      postedDate: '2026-02-25',
      expiresDate: '2026-03-25',
      views: 450,
      applicants: 28,
      shortlisted: 4,
      skills: ['Python', 'PyTorch', 'NLP', 'Computer Vision'],
      description: 'Build cutting-edge ML models to power our products...'
    }
  ]);

  // Form state for new job posting
  const [newJob, setNewJob] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    salaryMin: '',
    salaryMax: '',
    skills: '',
    description: ''
  });

  // Notifications data
  const notifications = [
    { id: 1, type: 'application', title: 'New Application!', message: 'Abhyodhya Kumar applied for Backend Engineer', time: '5 min ago', unread: true },
    { id: 2, type: 'job', title: 'Job Post Approved', message: 'Your ML Engineer posting is now live', time: '1 hour ago', unread: true },
    { id: 3, type: 'alert', title: 'Post Expiring Soon', message: 'Full Stack Developer posting expires in 3 days', time: '2 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilterDropdown(false);
      }
      if (!event.target.closest('.job-dropdown')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getStatusStyle = (status) => {
    switch(status) {
      case 'active': return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20';
      case 'paused': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'draft': return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
      case 'expired': return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'active': return <CheckCircle size={12} />;
      case 'paused': return <Pause size={12} />;
      case 'draft': return <Edit3 size={12} />;
      case 'expired': return <AlertCircle size={12} />;
      default: return <Clock size={12} />;
    }
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'job': return <Briefcase size={16} className="text-indigo-400" />;
      case 'application': return <Eye size={16} className="text-blue-400" />;
      case 'success': return <CheckCircle size={16} className="text-green-400" />;
      case 'alert': return <AlertCircle size={16} className="text-amber-400" />;
      default: return <Bell size={16} className="text-slate-400" />;
    }
  };

  // Filter job postings
  const filteredJobs = jobPostings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats calculation
  const stats = {
    total: jobPostings.length,
    active: jobPostings.filter(j => j.status === 'active').length,
    totalApplicants: jobPostings.reduce((sum, j) => sum + j.applicants, 0),
    totalViews: jobPostings.reduce((sum, j) => sum + j.views, 0)
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDaysRemaining = (expiresDate) => {
    if (!expiresDate) return null;
    const today = new Date();
    const expires = new Date(expiresDate);
    const diff = Math.ceil((expires - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const handleCreateJob = (e) => {
    e.preventDefault();
    // Handle job creation logic here
    console.log('Creating job:', newJob);
    setShowCreateModal(false);
    setNewJob({
      title: '',
      department: '',
      location: '',
      type: 'Full-time',
      salaryMin: '',
      salaryMax: '',
      skills: '',
      description: ''
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white font-sans">
      
      {/* --- TOP NAVBAR --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#1e293b] border-b border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-md bg-opacity-80">
        <div className="w-full px-6">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex-shrink-0">
              <img src={logo} alt="Talent Pulse" className="h-16 w-auto object-contain" />
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link to="/recruiter" className="px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-500/10 hover:shadow-md hover:shadow-indigo-500/10 font-medium transition-all">Dashboard</Link>
              <span className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-500/20">My Postings</span>
              <Link to="/recruiter/candidates" className="px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-500/10 hover:shadow-md hover:shadow-indigo-500/10 font-medium transition-all">Talent Pool</Link>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowCreateModal(true)}
                className="hidden sm:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20"
              >
                <PlusCircle size={18} /> Post a Job
              </button>
              
              {/* Notification Bell */}
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

                {/* Notification Dropdown */}
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
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">{notification.message}</p>
                              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 uppercase tracking-wider">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Logout Button */}
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

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 px-6 pb-6 md:px-12 md:pb-12 pt-28">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div>
              <h1 className="text-3xl font-heading font-heading mb-2">Job Postings</h1>
              <p className="text-slate-500 dark:text-slate-400 font-body">Manage and track all your job listings in one place.</p>
            </div>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="sm:hidden flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-all"
            >
              <PlusCircle size={20} /> Create New Posting
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500">
                <Briefcase size={22} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Jobs</p>
                <p className="text-2xl font-black">{stats.total}</p>
              </div>
            </div>
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
              <div className="p-3 rounded-xl bg-green-500/10 text-green-500">
                <CheckCircle size={22} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active</p>
                <p className="text-2xl font-black">{stats.active}</p>
              </div>
            </div>
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
                <Users size={22} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Applicants</p>
                <p className="text-2xl font-black">{stats.totalApplicants}</p>
              </div>
            </div>
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
                <Eye size={22} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Views</p>
                <p className="text-2xl font-black">{stats.totalViews.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 mb-6 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search jobs by title, department, location, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
              </div>
              
              {/* Status Filter */}
              <div className="relative" ref={filterRef}>
                <button 
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="flex items-center gap-2 px-4 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-white/10 transition-all min-w-[160px] justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Filter size={16} className="text-slate-400" />
                    <span className="capitalize">{statusFilter === 'all' ? 'All Status' : statusFilter}</span>
                  </div>
                  <ChevronDown size={16} className="text-slate-400" />
                </button>
                
                {showFilterDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden z-40">
                    {['all', 'active', 'paused', 'draft', 'expired'].map((status) => (
                      <button
                        key={status}
                        onClick={() => { setStatusFilter(status); setShowFilterDropdown(false); }}
                        className={`w-full px-4 py-3 text-left text-sm hover:bg-slate-100 dark:hover:bg-white/10 transition-all capitalize flex items-center gap-2 ${statusFilter === status ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : ''}`}
                      >
                        {status !== 'all' && getStatusIcon(status)}
                        {status === 'all' ? 'All Status' : status}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {filteredJobs.length === 0 ? (
              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-12 text-center">
                <Briefcase size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-600 dark:text-slate-400 mb-2">No job postings found</h3>
                <p className="text-slate-500 dark:text-slate-500 mb-6">Try adjusting your search or filters</p>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-all"
                >
                  <PlusCircle size={18} /> Create New Posting
                </button>
              </div>
            ) : (
              filteredJobs.map((job) => {
                const daysRemaining = getDaysRemaining(job.expiresDate);
                return (
                  <div 
                    key={job.id} 
                    className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-indigo-500/30 transition-all group"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      {/* Job Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-4">
                          <div className="hidden sm:flex w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl items-center justify-center text-white flex-shrink-0">
                            <Briefcase size={24} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                              <h3 className="text-lg font-bold group-hover:text-indigo-500 transition-colors">{job.title}</h3>
                              <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide rounded-lg border ${getStatusStyle(job.status)}`}>
                                {getStatusIcon(job.status)}
                                {job.status}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400 mb-3">
                              <span className="flex items-center gap-1.5">
                                <Building2 size={14} /> {job.department}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <MapPin size={14} /> {job.location}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <DollarSign size={14} /> {job.salary}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Clock size={14} /> {job.type}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {job.skills.map((skill, idx) => (
                                <span key={idx} className="px-2 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold rounded-lg">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stats & Actions */}
                      <div className="flex items-center gap-6 lg:gap-8">
                        {/* Job Stats */}
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
                              <Eye size={14} />
                            </div>
                            <p className="text-lg font-bold">{job.views}</p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Views</p>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
                              <Users size={14} />
                            </div>
                            <p className="text-lg font-bold">{job.applicants}</p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Applied</p>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-indigo-400 mb-1">
                              <Zap size={14} />
                            </div>
                            <p className="text-lg font-bold text-indigo-500">{job.shortlisted}</p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Shortlisted</p>
                          </div>
                        </div>

                        {/* Expiry Info */}
                        {job.status === 'active' && daysRemaining !== null && (
                          <div className={`hidden md:block text-center px-4 py-2 rounded-xl ${daysRemaining <= 7 ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-100 dark:bg-white/5 text-slate-500'}`}>
                            <p className="text-sm font-bold">{daysRemaining}</p>
                            <p className="text-[10px] uppercase tracking-wider">Days Left</p>
                          </div>
                        )}

                        {/* Actions Dropdown */}
                        <div className="relative job-dropdown">
                          <button 
                            onClick={() => setActiveDropdown(activeDropdown === job.id ? null : job.id)}
                            className="p-2.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                          >
                            <MoreVertical size={18} className="text-slate-500" />
                          </button>
                          
                          {activeDropdown === job.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden z-40">
                              <button className="w-full px-4 py-3 text-left text-sm hover:bg-slate-100 dark:hover:bg-white/10 transition-all flex items-center gap-3">
                                <Eye size={16} className="text-slate-400" /> View Details
                              </button>
                              <button className="w-full px-4 py-3 text-left text-sm hover:bg-slate-100 dark:hover:bg-white/10 transition-all flex items-center gap-3">
                                <Edit3 size={16} className="text-slate-400" /> Edit Posting
                              </button>
                              <button className="w-full px-4 py-3 text-left text-sm hover:bg-slate-100 dark:hover:bg-white/10 transition-all flex items-center gap-3">
                                <Copy size={16} className="text-slate-400" /> Duplicate
                              </button>
                              {job.status === 'active' ? (
                                <button className="w-full px-4 py-3 text-left text-sm hover:bg-slate-100 dark:hover:bg-white/10 transition-all flex items-center gap-3 text-amber-500">
                                  <Pause size={16} /> Pause Posting
                                </button>
                              ) : job.status === 'paused' && (
                                <button className="w-full px-4 py-3 text-left text-sm hover:bg-slate-100 dark:hover:bg-white/10 transition-all flex items-center gap-3 text-green-500">
                                  <Play size={16} /> Resume Posting
                                </button>
                              )}
                              <div className="border-t border-slate-100 dark:border-white/10">
                                <button className="w-full px-4 py-3 text-left text-sm hover:bg-red-50 dark:hover:bg-red-500/10 transition-all flex items-center gap-3 text-red-500">
                                  <Trash2 size={16} /> Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Posted/Expires Dates */}
                    {job.postedDate && (
                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} /> Posted: {formatDate(job.postedDate)}
                        </span>
                        {job.expiresDate && (
                          <span className="flex items-center gap-1.5">
                            <Clock size={12} /> Expires: {formatDate(job.expiresDate)}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>

      {/* Create Job Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowCreateModal(false)}
          />
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1e293b] rounded-3xl shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-[#1e293b] px-8 py-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between z-10">
              <div>
                <h2 className="text-2xl font-heading font-bold">Create New Job Posting</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Fill in the details to post a new job</p>
              </div>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-all"
              >
                <X size={24} className="text-slate-400" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleCreateJob} className="p-8 space-y-6">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Job Title *</label>
                <input
                  type="text"
                  required
                  value={newJob.title}
                  onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                  placeholder="e.g. Senior Backend Engineer"
                  className="w-full px-4 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
              </div>

              {/* Department & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Department *</label>
                  <input
                    type="text"
                    required
                    value={newJob.department}
                    onChange={(e) => setNewJob({...newJob, department: e.target.value})}
                    placeholder="e.g. Engineering"
                    className="w-full px-4 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Location *</label>
                  <input
                    type="text"
                    required
                    value={newJob.location}
                    onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                    placeholder="e.g. San Francisco, CA or Remote"
                    className="w-full px-4 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Employment Type */}
              <div>
                <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Employment Type *</label>
                <div className="flex flex-wrap gap-3">
                  {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setNewJob({...newJob, type})}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${newJob.type === type ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-indigo-500/50'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div>
                <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Salary Range</label>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={newJob.salaryMin}
                      onChange={(e) => setNewJob({...newJob, salaryMin: e.target.value})}
                      placeholder="Min (e.g. 120000)"
                      className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    />
                  </div>
                  <span className="text-slate-400">—</span>
                  <div className="relative flex-1">
                    <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={newJob.salaryMax}
                      onChange={(e) => setNewJob({...newJob, salaryMax: e.target.value})}
                      placeholder="Max (e.g. 180000)"
                      className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Required Skills */}
              <div>
                <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Required Skills *</label>
                <input
                  type="text"
                  required
                  value={newJob.skills}
                  onChange={(e) => setNewJob({...newJob, skills: e.target.value})}
                  placeholder="e.g. Python, FastAPI, PostgreSQL, AWS (comma separated)"
                  className="w-full px-4 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
                <p className="text-xs text-slate-400 mt-1.5">Separate skills with commas</p>
              </div>

              {/* Job Description */}
              <div>
                <label className="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Job Description *</label>
                <textarea
                  required
                  rows={5}
                  value={newJob.description}
                  onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                  placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
                  className="w-full px-4 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
                />
              </div>

              {/* AI Enhancement Notice */}
              <div className="p-4 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-2xl">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-xl">
                    <Zap size={18} className="text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-purple-600 dark:text-purple-400">AI-Powered Matching</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Once posted, our AI will automatically match and rank candidates based on their skills and experience.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-slate-800 dark:bg-white/10 border border-slate-700 dark:border-white/10 text-white rounded-xl font-bold hover:bg-slate-700 dark:hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <Edit3 size={18} /> Save as Draft
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
                >
                  <PlusCircle size={18} /> Publish Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Postings;
