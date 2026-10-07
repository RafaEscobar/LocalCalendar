import React from 'react';
import { WEEK_DAYS } from '../../utils/calendar';

export const WeekDaysHeader: React.FC = () => {
  return (
    <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
      {WEEK_DAYS.map((day) => {
        const isWeekend = day.index === 0 || day.index === 6;
        return (
          <div
            key={day.short}
            className="text-center py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
          >
            <span className={`inline-block ${isWeekend ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-500 dark:text-slate-400'}`}>
              <span className="sm:hidden">{day.short.slice(0, 1)}</span>
              <span className="hidden sm:inline md:hidden">{day.short}</span>
              <span className="hidden md:inline">{day.long}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
};
