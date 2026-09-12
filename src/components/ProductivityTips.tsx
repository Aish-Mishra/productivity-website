import React from 'react';
import { Lightbulb, Flame, Coffee, Target } from 'lucide-react';

export const ProductivityTips: React.FC = () => {
  const tips = [
    {
      icon: <Flame className="w-4 h-4 text-amber-600" />,
      title: 'The 5-Minute Rule',
      description: 'If you feel stuck or procrastinating, commit to studying for just 5 minutes. Getting started is the hardest part.',
    },
    {
      icon: <Target className="w-4 h-4 text-emerald-600" />,
      title: 'One Thing at a Time',
      description: 'Avoid multi-tasking. Put your phone in another room or turn on do-not-disturb while the timer is running.',
    },
    {
      icon: <Coffee className="w-4 h-4 text-stone-600" />,
      title: 'Real Rest Matters',
      description: 'When the timer says break time, actually step away! Stand up, stretch, grab water, and let your brain absorb what you learned.',
    },
  ];

  return (
    <div id="productivity-tips-section" className="bg-stone-50 border border-stone-200/80 rounded-2xl p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-amber-500" />
        <h3 className="text-lg font-bold text-stone-900 font-['Outfit',sans-serif]">Quick Tips for Smooth Studying</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tips.map((tip, index) => (
          <div key={index} className="bg-white border border-stone-200/60 rounded-xl p-4 shadow-2xs">
            <div className="flex items-center gap-2 font-semibold text-stone-800 text-sm mb-1.5">
              {tip.icon}
              <span>{tip.title}</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {tip.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
