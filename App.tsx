import React, { useState } from 'react';
import { User, BookOpen, Award, CheckCircle2, ChevronRight, BarChart3 } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  score: number;
  status: 'Exceeding' | 'Meeting' | 'Approaching' | 'Below';
}

interface Learner {
  id: string;
  name: string;
  grade: string;
  subjects: Subject[];
}

const MOCK_DATA: Learner[] = [
  {
    id: '1',
    name: 'Jabari Kamau',
    grade: 'Grade 3 - West',
    subjects: [
      { id: 's1', name: 'Literacy Activities', score: 85, status: 'Exceeding' },
      { id: 's2', name: 'Mathematical Activities', score: 72, status: 'Meeting' },
      { id: 's3', name: 'Environmental Activities', score: 45, status: 'Approaching' },
      { id: 's4', name: 'CRE/IRE Activities', score: 92, status: 'Exceeding' },
    ]
  }
];

export default function App() {
  const [activeLearner] = useState<Learner>(MOCK_DATA[0]);

  const getStatusColor = (status: string) => {
    if (status === 'Exceeding') return 'text-green-600 bg-green-50';
    if (status === 'Meeting') return 'text-blue-600 bg-blue-50';
    if (status === 'Approaching') return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      {/* Header */}
      <header className="bg-indigo-700 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold tracking-tight">CBC Tracker 2025</h1>
          <div className="bg-indigo-500 p-2 rounded-full"><User size={20} /></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-700">
            <Award size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{activeLearner.name}</h2>
            <p className="opacity-80">{activeLearner.grade}</p>
          </div>
        </div>
      </header>

      {/* Stats Quick View */}
      <div className="grid grid-cols-2 gap-4 p-6 -mt-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="text-indigo-600 mb-1"><BarChart3 size={20} /></div>
          <div className="text-2xl font-bold">78%</div>
          <div className="text-xs text-slate-500 uppercase font-semibold">Avg. Progress</div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="text-emerald-500 mb-1"><CheckCircle2 size={20} /></div>
          <div className="text-2xl font-bold">12/15</div>
          <div className="text-xs text-slate-500 uppercase font-semibold">Strands Met</div>
        </div>
      </div>

      {/* Subjects List */}
      <main className="px-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <BookOpen size={18} className="text-indigo-600" /> Subject Performance
        </h3>
        
        <div className="space-y-4">
          {activeLearner.subjects.map((subject) => (
            <div key={subject.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-slate-800">{subject.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium mt-1 inline-block ${getStatusColor(subject.status)}`}>
                    {subject.status} Expectation
                  </span>
                </div>
                <ChevronRight size={18} className="text-slate-300" />
              </div>
              
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${subject.score}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-slate-500 font-medium">
                <span>Level achieved</span>
                <span>{subject.score}%</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 flex justify-around items-center">
        <div className="text-indigo-600 flex flex-col items-center"><BarChart3 size={24} /><span className="text-[10px] mt-1 font-bold">Dashboard</span></div>
        <div className="text-slate-400 flex flex-col items-center"><BookOpen size={24} /><span className="text-[10px] mt-1 font-bold">Lessons</span></div>
        <div className="text-slate-400 flex flex-col items-center"><Award size={24} /><span className="text-[10px] mt-1 font-bold">Reports</span></div>
      </nav>
    </div>
  );
}