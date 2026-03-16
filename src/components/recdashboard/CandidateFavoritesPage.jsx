import React from 'react';
import { ArrowLeft, Heart, Mail, MapPin, Sparkles, Star } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { candidateData, getCandidateById } from './candidateData';

const CandidateFavoritesPage = () => {
  const { candidateId } = useParams();
  const featuredCandidate = getCandidateById(candidateId) || candidateData[0];
  const favoriteCandidates = candidateData.filter((candidate) => candidate.stage === 'Saved' || candidate.id === featuredCandidate.id);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white px-6 py-8 md:px-12">
      <div className="max-w-6xl mx-auto">
        <Link to="/recruiter/candidates" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-500 hover:text-indigo-400 mb-8">
          <ArrowLeft size={16} /> Back to Talent Pool
        </Link>

        <div className="bg-gradient-to-br from-rose-600 to-orange-500 rounded-[2.5rem] p-8 text-white shadow-xl shadow-rose-500/20 mb-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-rose-100 mb-3">Favorites Board</p>
              <h1 className="text-3xl font-heading font-bold mb-2">{featuredCandidate.name} saved to favorites</h1>
              <p className="text-sm text-rose-50 max-w-2xl">
                Use this page as the recruiter shortlist board for priority candidates you want to revisit quickly.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-sm font-semibold">
              <Heart size={16} /> Priority pipeline
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favoriteCandidates.map((candidate) => (
            <article key={candidate.id} className={`rounded-[2rem] p-6 shadow-sm border ${candidate.id === featuredCandidate.id ? 'bg-white dark:bg-white/10 border-rose-300 dark:border-rose-500/30' : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10'}`}>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xl font-bold">{candidate.name}</h2>
                    {candidate.id === featuredCandidate.id && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-500/10 text-rose-500 text-xs font-bold">
                        <Star size={12} /> New save
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{candidate.role}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                  <Sparkles size={12} /> {candidate.score}%
                </span>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{candidate.insight}</p>

              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300 mb-5">
                <div className="flex items-center gap-2"><MapPin size={14} className="text-slate-400" /> {candidate.location}</div>
                <div className="flex items-center gap-2"><Mail size={14} className="text-slate-400" /> {candidate.email}</div>
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                {candidate.skills.map((skill) => (
                  <span key={skill} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-white/10">
                    {skill}
                  </span>
                ))}
              </div>

              <Link to={`/recruiter/candidates/${candidate.id}`} className="inline-flex items-center justify-center w-full px-4 py-3 rounded-xl bg-slate-900 text-white dark:bg-white/10 border border-slate-900 dark:border-white/10 hover:bg-slate-800 dark:hover:bg-white/15 transition-all text-sm font-semibold">
                Open candidate profile
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidateFavoritesPage;
