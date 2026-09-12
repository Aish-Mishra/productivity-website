import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { StudyTimer } from './components/StudyTimer';
import { TaskChecklist } from './components/TaskChecklist';
import { ProductivityTips } from './components/ProductivityTips';
import { Footer } from './components/Footer';
import { MOTIVATIONAL_QUOTES } from './data/quotes';

export default function App() {
  const [quoteIndex, setQuoteIndex] = useState<number>(0);
  const [completedSessions, setCompletedSessions] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('student_completed_sessions');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const studySectionRef = useRef<HTMLDivElement>(null);

  const handleNextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
  };

  const handleStartStudying = () => {
    if (studySectionRef.current) {
      studySectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSessionComplete = () => {
    setCompletedSessions((prev) => {
      const updated = prev + 1;
      try {
        localStorage.setItem('student_completed_sessions', updated.toString());
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const currentQuote = MOTIVATIONAL_QUOTES[quoteIndex];

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-stone-800">
      <Header completedSessions={completedSessions} />

      <main className="flex-1">
        {/* Welcoming Homepage Hero */}
        <HeroSection
          currentQuote={currentQuote}
          onNextQuote={handleNextQuote}
          onStartStudying={handleStartStudying}
        />

        {/* Study Section (Anchor for "Start Studying") */}
        <div ref={studySectionRef} id="study-workbench" className="max-w-5xl mx-auto px-4 sm:px-6 scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
            {/* Timer Column */}
            <div className="lg:col-span-6">
              <StudyTimer onSessionComplete={handleSessionComplete} />
            </div>

            {/* Task Checklist Column */}
            <div className="lg:col-span-6">
              <TaskChecklist />
            </div>
          </div>

          {/* Productivity Tips */}
          <div className="mb-12">
            <ProductivityTips />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
