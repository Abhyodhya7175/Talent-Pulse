import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, Settings, User, LayoutDashboard, Lightbulb, LogOut, 
  Briefcase, Eye, CheckCircle, AlertCircle, X, Check, Trash2,
  Clock, Filter, Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/talent-pulse-logo.png';

const NotificationsPage = () => {
  const [activeNav] = useState('notifications');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const notificationRef = useRef(null);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
    { id: 'recommendations', label: 'Recommendations', icon: Lightbulb, path: '/student/recommendations' },
    { id: 'profile', label: 'My Profile', icon: User, path: '/student/profile' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/student/settings' },
  ];

  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      type: 'job', 
      title: 'New Job Match!', 
      message: 'Backend Engineer at Meta matches 96% with your profile. This role requires Python, FastAPI, and PostgreSQL skills.', 
      time: '5 min ago',
      date: 'Today',
      unread: true 
    },
    { 
      id: 2, 
      type: 'application', 
      title: 'Application Viewed', 
      message: 'Tesla viewed your application for Data Scientist position. They spent 3 minutes reviewing your profile.', 
      time: '1 hour ago',
      date: 'Today',
      unread: true 
    },
    { 
      id: 3, 
      type: 'success', 
      title: 'Profile Complete!', 
      message: 'Congratulations! Your profile is now 100% complete. You are now more visible to recruiters.', 
      time: '2 hours ago',
      date: 'Today',
      unread: false 
    },
    { 
      id: 4, 
      type: 'alert', 
      title: 'Reminder', 
      message: 'Complete your skills assessment to improve your job matches by up to 25%.', 
      time: '1 day ago',
      date: 'Yesterday',
      unread: false 
    },
    { 
      id: 5, 
      type: 'job', 
      title: 'New Job Match!', 
      message: 'Full Stack Developer at Netflix matches 92% with your profile. Remote position available.', 
      time: '1 day ago',
      date: 'Yesterday',
      unread: false 
    },
    { 
      id: 6, 
      type: 'application', 
      title: 'Application Shortlisted', 
      message: 'Your application for UI Designer at Spotify has been shortlisted for the next round.', 
      time: '2 days ago',
      date: 'Feb 19, 2026',
      unread: false 
    },
    { 
      id: 7, 
      type: 'success', 
      title: 'Resume Updated', 
      message: 'Your resume has been successfully updated. AI has extracted 12 new skills.', 
      time: '3 days ago',
      date: 'Feb 18, 2026',
      unread: false 
    },
    { 
      id: 8, 
      type: 'alert', 
      title: 'New Feature Available', 
      message: 'AI-powered interview preparation is now available. Practice with our smart assistant.', 
      time: '4 days ago',
      date: 'Feb 17, 2026',
      unread: false 
    },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const filterTabs = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: unreadCount },
    { id: 'job', label: 'Jobs', count: notifications.filter(n => n.type === 'job').length },
    { id: 'application', label: 'Applications', count: notifications.filter(n => n.type === 'application').length },
  ];

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return n.unread;
    return n.type === activeFilter;
  });

  // Group notifications by date
  const groupedNotifications = filteredNotifications.reduce((groups, notification) => {
    const date = notification.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(notification);
    return groups;
  }, {});

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'job': return <Briefcase size={18} className="text-indigo-400" />;
      case 'application': return <Eye size={18} className="text-blue-400" />;
      case 'success': return <CheckCircle size={18} className="text-green-400" />;
      case 'alert': return <AlertCircle size={18} className="text-amber-400" />;
      default: return <Bell size={18} className="text-slate-400" />;
    }
  };

  const getNotificationBg = (type) => {
    switch(type) {
      case 'job': return 'bg-indigo-500/10 border-indigo-500/20';
      case 'application': return 'bg-blue-500/10 border-blue-500/20';
      case 'success': return 'bg-green-500/10 border-green-500/20';
      case 'alert': return 'bg-amber-500/10 border-amber-500/20';
      default: return 'bg-slate-500/10 border-slate-500/20';
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, unread: false } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotificationDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white font-sans">
      
      {/* --- TOP NAVBAR --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#1e293b] border-b border-slate-200 dark:border-white/10 shadow-sm">
        <div className="w-full px-6">
          <div className="flex items-center justify-between h-20">
            
            <div className="flex-shrink-0">
              <img src={logo} alt="Talent Pulse" className="h-16 w-auto object-contain" />
            </div>

            <div className="hidden md:flex items-center space-x-10">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10"
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative" ref={notificationRef}>
                <button 
                  onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
                  className="p-2.5 bg-indigo-600 text-white rounded-xl transition-all relative"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                      {unreadCount}
                    </span>
                  )}
                </button>
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

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 px-6 md:px-12 pt-28 md:pt-32 pb-12 max-w-5xl mx-auto w-full">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <Bell className="text-indigo-500" size={28} />
              Notifications
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Stay updated with your job matches and applications
            </p>
          </div>
          {unreadCount > 0 && (
            <button 
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-all"
            >
              <Check size={18} />
              Mark all as read
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                activeFilter === tab.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10'
              }`}
            >
              {tab.label}
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                activeFilter === tab.id 
                  ? 'bg-white/20 text-white' 
                  : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-6">
          {Object.keys(groupedNotifications).length === 0 ? (
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-12 text-center">
              <Bell size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
              <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-300">No notifications</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1">You're all caught up!</p>
            </div>
          ) : (
            Object.entries(groupedNotifications).map(([date, items]) => (
              <div key={date}>
                <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Clock size={14} />
                  {date}
                </h3>
                <div className="space-y-3">
                  {items.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`bg-white dark:bg-white/5 border rounded-2xl p-5 transition-all hover:shadow-md ${
                        notification.unread 
                          ? 'border-indigo-500/30 bg-indigo-50/50 dark:bg-indigo-500/5' 
                          : 'border-slate-200 dark:border-white/10'
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className={`p-3 rounded-xl border ${getNotificationBg(notification.type)} flex-shrink-0`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className={`font-bold ${notification.unread ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                                  {notification.title}
                                </h4>
                                {notification.unread && (
                                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                )}
                              </div>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                                {notification.message}
                              </p>
                              <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 flex items-center gap-1">
                                <Clock size={12} />
                                {notification.time}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {notification.unread && (
                                <button 
                                  onClick={() => markAsRead(notification.id)}
                                  className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-all text-slate-400 hover:text-indigo-500"
                                  title="Mark as read"
                                >
                                  <Check size={16} />
                                </button>
                              )}
                              <button 
                                onClick={() => deleteNotification(notification.id)}
                                className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all text-slate-400 hover:text-red-500"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;
