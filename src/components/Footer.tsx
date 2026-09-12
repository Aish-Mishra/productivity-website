import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-stone-200/80 py-8 mt-16 text-center text-xs text-stone-500">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="flex items-center justify-center gap-1">
          Made for students striving for growth <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
        </p>
        <p className="text-stone-400">
          “You can do it — one small step at a time.”
        </p>
      </div>
    </footer>
  );
};
