import React from 'react';
import { ArrowLeft, Calendar, CheckCircle, Clock3, Mail, MapPin, Phone, Video } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { candidateData, getCandidateById } from './candidateData';

const CandidateInterviewPage = () => {
  const { candidateId } = useParams();
  const candidate = getCandidateById(candidateId) || candidateData[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white px-6 py-8 md:px-12">
      <div className="max-w-5xl mx-auto">
        <Link to="/recruiter/candidates" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-500 hover:text-indigo-400 mb-8">
          <ArrowLeft size={16} /> Back to Talent Pool
        </Link>

        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 shadow-sm mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-indigo-500 mb-3">Interview Handoff</p>
          <h1 className="text-3xl font-heading font-bold mb-2">Move {candidate.name} to interview</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
            This page can act as the next workflow step for scheduling, panel assignment, and candidate communication.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] p-7 shadow-sm">
            <h2 className="text-xl font-bold mb-5">Suggested interview plan</h2>
            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <Calendar size={18} className="text-indigo-500 mt-0.5" />
                <div>
                  <p className="font-semibold">Round 1: Technical screen</p>
                  <p>Suggested slot: Thursday, 11:00 AM with backend + hiring manager panel.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <Video size={18} className="text-indigo-500 mt-0.5" />
                <div>
                  <p className="font-semibold">Meeting mode</p>
                  <p>Remote video interview recommended based on current location and availability.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <Clock3 size={18} className="text-indigo-500 mt-0.5" />
                <div>
                  <p className="font-semibold">Expected response window</p>
                  <p>Candidate activity suggests best response probability within the next 24 hours.</p>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] p-7 shadow-sm">
              <h2 className="text-lg font-bold mb-4">Candidate snapshot</h2>
              <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <div className="font-semibold text-base text-slate-900 dark:text-white">{candidate.name}</div>
                <div>{candidate.role}</div>
                <div className="flex items-center gap-2"><MapPin size={14} className="text-slate-400" /> {candidate.location}</div>
                <div className="flex items-center gap-2"><Mail size={14} className="text-slate-400" /> {candidate.email}</div>
                <div className="flex items-center gap-2"><Phone size={14} className="text-slate-400" /> {candidate.phone}</div>
              </div>
            </section>

            <section className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-[2rem] p-7 text-white shadow-xl shadow-emerald-500/20">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle size={18} />
                <h2 className="text-lg font-bold">Interview stage ready</h2>
              </div>
              <p className="text-sm text-emerald-50 leading-relaxed mb-4">
                Candidate details, availability, and outreach info are ready for the recruiter workflow.
              </p>
              <Link to={`/recruiter/candidates/${candidate.id}`} className="inline-flex items-center justify-center w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 transition-all text-sm font-semibold">
                Open full candidate profile
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CandidateInterviewPage;
