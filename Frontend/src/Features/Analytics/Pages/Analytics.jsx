import React from 'react';
import Sidebar from '../../Chat/Components/Sidebar.jsx';

const Analytics = () => {
  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 bg-white p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto w-full">
            <h1 className="text-3xl font-bold mb-6 text-slate-800">Analytics Dashboard</h1>
            <div className="flex items-center justify-center h-64 bg-slate-50 border border-slate-200 rounded-xl shadow-sm text-slate-400 flex-col gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <p className="text-lg font-medium">Analytics and statistics will appear here</p>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
