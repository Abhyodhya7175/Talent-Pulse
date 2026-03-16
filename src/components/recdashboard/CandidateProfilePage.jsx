import React from 'react';
import { ArrowLeft, Briefcase, Building2, Calendar, CheckCircle, Mail, MapPin, Phone, Sparkles, UserRoundCheck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { candidateData, getCandidateById } from './candidateData';

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

const CandidateProfilePage = () => {
  const { candidateId } = useParams();
  const candidate = getCandidateById(candidateId) || candidateData[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white px-6 py-8 md:px-12">
      <div className="max-w-6xl mx-auto">
        <Link to="/recruiter/candidates" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-500 hover:text-indigo-400 mb-8">
          <ArrowLeft size={16} /> Back to Talent Pool
        </Link>

        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 rounded-[1.75rem] bg-gradient-to-br from-indigo-500 to-cyan-500 text-white flex items-center justify-center text-2xl font-black">
                {candidate.name.split(' ').map((part) => part[0]).join('')}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h1 className="text-3xl font-heading font-bold">{candidate.name}</h1>
                  <span className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-lg border ${getStageStyle(candidate.stage)}`}>
                    {candidate.stage}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                    <Sparkles size={13} /> {candidate.score}% match
                  </span>
                </div>
                <p className="text-lg text-slate-500 dark:text-slate-400 mb-4">{candidate.role}</p>
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5"><MapPin size={14} /> {candidate.location}</span>
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {candidate.experience}</span>
                  <span className="flex items-center gap-1.5"><UserRoundCheck size={14} /> {candidate.availability}</span>
                  <span className="flex items-center gap-1.5"><Briefcase size={14} /> {candidate.salary}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 min-w-[260px]">
              <div className="rounded-2xl bg-slate-100 dark:bg-white/5 p-4 border border-slate-200 dark:border-white/10">
                <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">Last active</p>
                <p className="text-sm font-semibold mt-2">{candidate.lastActive}</p>
              </div>
              <div className="rounded-2xl bg-slate-100 dark:bg-white/5 p-4 border border-slate-200 dark:border-white/10">
                <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">Education</p>
                <p className="text-sm font-semibold mt-2">{candidate.education}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] p-7 shadow-sm">
              <h2 className="text-xl font-bold mb-4">AI Fit Summary</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{candidate.insight}</p>
            </section>

            <section className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] p-7 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Core Skills</h2>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] p-7 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Strength Signals</h2>
              <div className="space-y-3">
                {candidate.strengths.map((strength) => (
                  <div key={strength} className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                    <CheckCircle size={16} className="text-green-500" />
                    {strength}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] p-7 shadow-sm">
              <h2 className="text-lg font-bold mb-4">Contact</h2>
              <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-3"><Mail size={15} className="text-slate-400" /> {candidate.email}</div>
                <div className="flex items-center gap-3"><Phone size={15} className="text-slate-400" /> {candidate.phone}</div>
                <div className="flex items-center gap-3"><Building2 size={15} className="text-slate-400" /> {candidate.education}</div>
              </div>
            </section>

            <section className="bg-gradient-to-br from-indigo-600 to-cyan-700 rounded-[2rem] p-7 text-white shadow-xl shadow-indigo-500/20">
              <h2 className="text-lg font-bold mb-3">Next recruiter actions</h2>
              <div className="space-y-3 text-sm text-indigo-50">
                <Link to={`/recruiter/candidates/${candidate.id}/interview`} className="block px-4 py-3 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 transition-all">
                  Move candidate to interview
                </Link>
                <Link to={`/recruiter/candidates/favorites/${candidate.id}`} className="block px-4 py-3 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 transition-all">
                  Save candidate to favorites
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfilePage;
