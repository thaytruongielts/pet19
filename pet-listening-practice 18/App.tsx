import React, { useState, useCallback, useMemo } from 'react';
import { QUESTIONS } from './constants';
import QuestionItem from './components/QuestionItem';
import SoundCloudPlayer from './components/SoundCloudPlayer';
import StickyFooter from './components/StickyFooter';

const App: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handleInputChange = useCallback((id: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  }, []);

  const handleSubmit = () => {
    const totalQuestions = QUESTIONS.length;
    let correctCount = 0;

    QUESTIONS.forEach((q) => {
      const userAnswer = answers[q.id]?.trim().toLowerCase() || '';
      if (userAnswer === q.answer.toLowerCase()) {
        correctCount++;
      }
    });

    // Score based on scale of 10
    const calculatedScore = (correctCount * 10) / totalQuestions;
    setScore(calculatedScore);
    setIsSubmitted(true);
    
    // Scroll to top to see results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear your answers and start over?")) {
      setAnswers({});
      setIsSubmitted(false);
      setScore(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const filledCount = useMemo(() => {
    return (Object.values(answers) as string[]).filter(val => val.trim() !== '').length;
  }, [answers]);

  return (
    <div className="min-h-screen bg-slate-50 pb-32 font-sans selection:bg-blue-100">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="bg-blue-600 text-white font-bold p-1.5 rounded-md">PET</div>
             <h1 className="text-xl font-bold text-slate-800 hidden sm:block">Listening Practice Part 3</h1>
             <h1 className="text-xl font-bold text-slate-800 sm:hidden">Listening Test</h1>
          </div>
          <div className="text-sm font-medium text-slate-500">
            Fill in the blanks
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
           <h2 className="text-2xl font-bold text-slate-800 mb-2">Instructions</h2>
           <p className="text-slate-600 mb-6">
             Listen to the audio track and fill in the missing words for each sentence. 
             Write <strong>one word</strong> for each gap.
           </p>
           <SoundCloudPlayer />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-1 bg-slate-50 border-b border-slate-200 flex justify-end px-4 py-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Questions 1 - 50</span>
          </div>
          <div className="divide-y divide-slate-100">
            {QUESTIONS.map((q) => (
              <QuestionItem
                key={q.id}
                question={q}
                userAnswer={answers[q.id] || ''}
                isSubmitted={isSubmitted}
                onChange={handleInputChange}
              />
            ))}
          </div>
        </div>
      </main>

      <StickyFooter 
        isSubmitted={isSubmitted}
        score={score}
        filledCount={filledCount}
        totalCount={QUESTIONS.length}
        onSubmit={handleSubmit}
        onReset={handleReset}
      />
    </div>
  );
};

export default App;