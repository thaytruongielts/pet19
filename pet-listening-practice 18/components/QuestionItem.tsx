import React from 'react';
import { Question } from '../types';

interface QuestionItemProps {
  question: Question;
  userAnswer: string;
  isSubmitted: boolean;
  onChange: (id: number, value: string) => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  userAnswer,
  isSubmitted,
  onChange,
}) => {
  const isCorrect = isSubmitted
    ? userAnswer.trim().toLowerCase() === question.answer.toLowerCase()
    : undefined;

  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 py-3 border-b border-slate-200 last:border-0 hover:bg-slate-50 transition-colors px-4 rounded-lg">
      <span className="text-slate-400 font-mono text-sm w-8 shrink-0 select-none pt-1">
        ({question.id})
      </span>
      <div className="flex-grow text-lg leading-relaxed text-slate-800 flex flex-wrap items-baseline gap-2">
        <span>{question.prefix}</span>
        
        <div className="relative inline-block min-w-[140px]">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => onChange(question.id, e.target.value)}
            disabled={isSubmitted}
            spellCheck={false}
            autoComplete="off"
            className={`
              w-full border-b-2 px-1 py-0.5 outline-none transition-all font-medium text-center
              ${!isSubmitted 
                ? 'border-slate-300 focus:border-blue-600 focus:bg-blue-50/30' 
                : isCorrect
                  ? 'border-green-500 bg-green-50 text-green-800'
                  : 'border-red-500 bg-red-50 text-red-800'
              }
            `}
            aria-label={`Answer for question ${question.id}`}
          />
          {isSubmitted && (
            <div className="absolute -right-6 top-1/2 -translate-y-1/2">
               {isCorrect ? (
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-600">
                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                 </svg>
               ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-red-600">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
               )}
            </div>
          )}
        </div>

        <span>{question.suffix}</span>
      </div>
      
      {isSubmitted && !isCorrect && (
        <div className="sm:ml-auto text-xs font-bold text-red-600 uppercase tracking-wider flex items-center shrink-0">
          Incorrect
        </div>
      )}
       {isSubmitted && isCorrect && (
        <div className="sm:ml-auto text-xs font-bold text-green-600 uppercase tracking-wider flex items-center shrink-0">
          Correct
        </div>
      )}
    </div>
  );
};

export default QuestionItem;