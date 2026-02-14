import React from 'react';
import { ShieldAlert, Lock, User } from 'lucide-react';

const AdminLogin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] font-sans p-4">
      <div className="max-w-md w-full bg-zinc-900 rounded-2xl p-10 border border-red-900/50 shadow-2xl shadow-red-900/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-4">
            <ShieldAlert className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-white uppercase tracking-widest">System Admin</h1>
          <p className="text-zinc-500 mt-2 text-xs">Authorized Personnel Only</p>
        </div>
        
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Admin ID" className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white outline-none focus:border-red-600 transition-colors" />
          <input type="password" placeholder="Security Key" className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white outline-none focus:border-red-600 transition-colors" />
          <button className="w-full bg-red-600 text-white py-3 rounded-lg font-black hover:bg-red-700 transition-colors shadow-lg shadow-red-900/40">
            Access Terminal
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;