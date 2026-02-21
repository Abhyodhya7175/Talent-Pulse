import React, { useState, useRef, useEffect } from 'react';
import { 
  Settings, Bell, Lock, Eye, Globe, Shield, 
  User, Palette, Save, ChevronRight, Moon, Sun,
  LayoutDashboard, Lightbulb, LogOut, X, Briefcase, CheckCircle, AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/talent-pulse-logo.png';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [darkMode, setDarkMode] = useState(true);
  const [activeNav] = useState('settings');
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  // Sample notifications data
  const notifications = [
    { 
      id: 1, 
      type: 'job', 
      title: 'New Job Match!', 
      message: 'Backend Engineer at Meta matches 96% with your profile', 
      time: '5 min ago',
      unread: true 
    },
    { 
      id: 2, 
      type: 'application', 
      title: 'Application Viewed', 
      message: 'Tesla viewed your application for Data Scientist', 
      time: '1 hour ago',
      unread: true 
    },
    { 
      id: 3, 
      type: 'success', 
      title: 'Profile Complete!', 
      message: 'Your profile is now 100% complete', 
      time: '2 hours ago',
      unread: false 
    },
    { 
      id: 4, 
      type: 'alert', 
      title: 'Reminder', 
      message: 'Complete your skills assessment to improve matches', 
      time: '1 day ago',
      unread: false 
    },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'job': return <Briefcase size={16} className="text-indigo-400" />;
      case 'application': return <Eye size={16} className="text-blue-400" />;
      case 'success': return <CheckCircle size={16} className="text-green-400" />;
      case 'alert': return <AlertCircle size={16} className="text-amber-400" />;
      default: return <Bell size={16} className="text-slate-400" />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
    { id: 'recommendations', label: 'Recommendations', icon: Lightbulb, path: '/student/recommendations' },
    { id: 'profile', label: 'My Profile', icon: User, path: '/student/profile' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/student/settings' },
  ];

  const settingTabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'account', label: 'Account Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white font-sans">
      
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

            {/* Notifications & Logout - Right */}
            <div className="flex items-center gap-3">
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
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-white/10">
                      <div className="flex items-center gap-2">
                        <Bell size={18} className="text-indigo-500" />
                        <h3 className="font-bold text-lg">Notifications</h3>
                        {unreadCount > 0 && (
                          <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-500 rounded-full text-xs font-bold">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      <button 
                        onClick={() => setShowNotifications(false)}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-all"
                      >
                        <X size={18} className="text-slate-400" />
                      </button>
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id}
                          className={`px-5 py-4 border-b border-slate-50 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer ${
                            notification.unread ? 'bg-indigo-50/50 dark:bg-indigo-500/5' : ''
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className={`p-2 rounded-xl ${notification.unread ? 'bg-indigo-100 dark:bg-indigo-500/20' : 'bg-slate-100 dark:bg-white/10'}`}>
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <p className={`font-semibold text-sm ${notification.unread ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                                  {notification.title}
                                </p>
                                {notification.unread && (
                                  <span className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0 mt-1.5"></span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                                {notification.message}
                              </p>
                              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 uppercase tracking-wider">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="px-5 py-3 bg-slate-50 dark:bg-white/5 border-t border-slate-100 dark:border-white/10">
                      <Link to="/student/notifications" className="block w-full text-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-all">View All Notifications</Link>
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

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 px-6 md:px-12 pt-28 md:pt-32 pb-12 max-w-6xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-8 tracking-tight">System Settings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left: Settings Navigation */}
          <div className="lg:col-span-1 space-y-2">
            {settingTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all font-semibold ${
                    activeTab === tab.id 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                    : 'bg-white dark:bg-white/5 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} />
                    {tab.label}
                  </div>
                  <ChevronRight size={16} className={activeTab === tab.id ? 'opacity-100' : 'opacity-0'} />
                </button>
              );
            })}
          </div>

          {/* Right: Active Tab Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] p-8 shadow-sm">
              
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Globe className="text-indigo-500" size={22} /> Language & Region
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Preferred Language</label>
                      <select className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>English (US)</option>
                        <option>Hindi</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Timezone</label>
                      <select className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>(GMT+05:30) India Standard Time</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'account' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Lock className="text-indigo-500" size={22} /> Password & Security
                  </h2>
                  <div className="space-y-4 max-w-md">
                    <button className="w-full flex items-center justify-between p-4 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-indigo-500 transition-all">
                      <div className="flex items-center gap-3">
                        <Lock size={18} />
                        <span className="font-semibold">Change Password</span>
                      </div>
                      <ChevronRight size={16} />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-indigo-500 transition-all">
                      <div className="flex items-center gap-3">
                        <Shield size={18} />
                        <span className="font-semibold">Two-Factor Authentication</span>
                      </div>
                      <span className="text-xs bg-red-500/10 text-red-500 px-3 py-1 rounded-full font-bold">OFF</span>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Palette className="text-indigo-500" size={22} /> Theme Customization
                  </h2>
                  <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
                    <div className="flex items-center gap-3">
                      {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                      <div>
                        <p className="font-bold">Dark Mode</p>
                        <p className="text-xs text-slate-500">Reduce eye strain for night use</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setDarkMode(!darkMode)}
                      className={`w-12 h-6 rounded-full transition-all relative ${darkMode ? 'bg-indigo-600' : 'bg-slate-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${darkMode ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-12 pt-6 border-t border-slate-100 dark:border-white/5 flex justify-end">
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-2xl font-black shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
                  <Save size={18} /> Save Settings
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default SettingsPage;