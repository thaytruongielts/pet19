import React from 'react';

interface StickyFooterProps {
  isSubmitted: boolean;
  score: number | null;
  filledCount: number;
  totalCount: number;
  onSubmit: () => void;
  onReset: () => void;
}

const StickyFooter: React.FC<StickyFooterProps> = ({
  isSubmitted,
  score,
  filledCount,
  totalCount,
  onSubmit,
  onReset,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] py-4 px-6 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex flex-col">
          {isSubmitted ? (
            <div>
              <span className="text-sm text-slate-500 font-medium uppercase tracking-wide">Final Score</span>
              <div className="text-3xl font-black text-slate-900 leading-none">
                {score?.toFixed(1)} <span className="text-lg text-slate-400 font-normal">/ 10</span>
              </div>
            </div>
          ) : (
            <div>
              <span className="text-sm text-slate-500 font-medium">Progress</span>
              <div className="text-xl font-bold text-slate-800">
                {filledCount} <span className="text-slate-400 font-normal">/ {totalCount} answered</span>
              </div>
            </div>
          )}
        </div>

        <div>
          {isSubmitted ? (
            <button
              onClick={onReset}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition active:scale-95 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              Try Again
            </button>
          ) : (
            <button
              onClick={onSubmit}
              disabled={filledCount === 0}
              className={`
                font-bold py-3 px-8 rounded-full shadow-lg transform transition flex items-center gap-2
                ${filledCount > 0 
                  ? 'bg-blue-600 hover:bg-blue-500 text-white active:scale-95' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
              `}
            >
              <span>Submit Answers</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StickyFooter;