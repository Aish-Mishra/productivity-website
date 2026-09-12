import React from 'react';
import { Sparkles, ArrowDown, RefreshCw, Quote as QuoteIcon, BookOpen } from 'lucide-react';
import { Quote } from '../types';

interface HeroSectionProps {
  currentQuote: Quote;
  onNextQuote: () => void;
  onStartStudying: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentQuote,
  onNextQuote,
  onStartStudying,
}) => {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 max-w-5xl mx-auto text-center">
      {/* Decorative soft ambient glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[320px] bg-emerald-100/50 rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      {/* Gentle welcome tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs sm:text-sm font-medium mb-6 shadow-xs">
        <Sparkles className="w-4 h-4 text-emerald-600" />
        <span>Your Friendly Study Space</span>
      </div>

      {/* Primary Welcoming Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-stone-900 font-['Outfit',sans-serif] mb-6 leading-tight">
        You Can <span className="text-emerald-600 underline decoration-emerald-300 decoration-wavy decoration-2 underline-offset-8">Do It!</span>
      </h1>

      {/* Motivational Quote Box */}
      <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-xs border border-stone-200/80 rounded-2xl p-6 sm:p-8 shadow-sm mb-10 transition-all">
        <div className="flex justify-center mb-3">
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <QuoteIcon className="w-5 h-5 fill-emerald-100 text-emerald-600" />
          </div>
        </div>

        <blockquote className="text-lg sm:text-xl font-medium text-stone-800 italic leading-relaxed mb-4">
          “{currentQuote.text}”
        </blockquote>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-stone-100 text-sm">
          <div className="text-stone-500 font-medium text-center sm:text-left">
            — <span className="text-stone-700 font-semibold">{currentQuote.author}</span>
            {currentQuote.context && (
              <span className="hidden sm:inline text-stone-400 ml-2">({currentQuote.context})</span>
            )}
          </div>

          <button
            id="btn-next-quote"
            onClick={onNextQuote}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 hover:text-emerald-800 bg-emerald-50/70 hover:bg-emerald-100/70 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            title="Read another motivating thought"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Another Quote</span>
          </button>
        </div>
      </div>

      {/* Primary Call to Action */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          id="btn-start-studying"
          onClick={onStartStudying}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white text-base sm:text-lg font-semibold shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/25 transition-all cursor-pointer group text-center"
        >
          <BookOpen className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" />
          <span>You can study how much you want, just be focused</span>
          <ArrowDown className="w-5 h-5 shrink-0 text-emerald-200 transition-transform group-hover:translate-y-0.5" />
        </button>
      </div>

      {/* Small reassuring subtext */}
      <p className="text-stone-500 text-xs sm:text-sm mt-4 font-normal">
        No complicated setup. Just pick a task, set the timer, and take it one step at a time.
      </p>
    </section>
  );
};
