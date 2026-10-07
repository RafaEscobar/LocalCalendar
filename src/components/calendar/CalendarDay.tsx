import React from 'react';
import type { CalendarDayInfo } from '../../types/event';
import { formatFullDate } from '../../utils/dates';

interface CalendarDayProps {
  dayInfo: CalendarDayInfo;
  isSelected?: boolean;
  eventCount?: number;
  pendingCount?: number;
  completedCount?: number;
  onClick: (dayInfo: CalendarDayInfo) => void;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({
  dayInfo,
  isSelected = false,
  eventCount = 0,
  pendingCount = 0,
  completedCount = 0,
  onClick,
}) => {
  const { dayNumber, isCurrentMonth, isToday } = dayInfo;
  const fullDateLabel = formatFullDate(dayInfo.date);

  return (
    <button
      type="button"
      onClick={() => onClick(dayInfo)}
      aria-label={`${fullDateLabel}${eventCount > 0 ? `, ${eventCount} eventos` : ''}${isToday ? ', Hoy' : ''}`}
      className={`
        relative group min-h-[72px] sm:min-h-[105px] p-1.5 sm:p-2.5 rounded-2xl text-left flex flex-col justify-between
        transition-all duration-150 border cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1
        ${
          isSelected
            ? 'bg-indigo-50/90 dark:bg-indigo-950/60 border-indigo-500 ring-2 ring-indigo-500/20 shadow-sm'
            : isToday
            ? 'bg-amber-50/60 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 shadow-xs hover:border-amber-400'
            : isCurrentMonth
            ? 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-sm hover:bg-slate-50/60 dark:hover:bg-slate-800/60'
            : 'bg-slate-50/50 dark:bg-slate-950/50 border-slate-100 dark:border-slate-900/60 text-slate-400 dark:text-slate-600 hover:bg-slate-100/60 dark:hover:bg-slate-900/60'
        }
      `}
    >
      {/* Top Header of the Day Cell */}
      <div className="flex items-center justify-between w-full">
        <span
          className={`
            inline-flex items-center justify-center font-bold text-xs sm:text-sm rounded-xl transition-colors
            ${
              isToday
                ? 'w-6 h-6 sm:w-7 sm:h-7 bg-amber-500 text-white shadow-xs font-extrabold'
                : isSelected
                ? 'w-6 h-6 sm:w-7 sm:h-7 bg-indigo-600 text-white font-extrabold'
                : isCurrentMonth
                ? 'text-slate-800 dark:text-slate-200'
                : 'text-slate-400 dark:text-slate-600'
            }
          `}
        >
          {dayNumber}
        </span>

        {isToday && (
          <span className="hidden sm:inline-flex px-1.5 py-0.5 rounded-md text-[10px] font-extrabold bg-amber-100 dark:bg-amber-900/80 text-amber-800 dark:text-amber-200 tracking-wider">
            HOY
          </span>
        )}
      </div>

      {/* Events indicator area */}
      <div className="w-full mt-1 sm:mt-2 min-h-[16px] sm:min-h-[22px] flex items-center justify-between">
        {eventCount > 0 ? (
          <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
            {/* Dot & count badge */}
            <span
              className={`
                inline-flex items-center gap-1 px-1.5 py-0.5 rounded-lg text-[10px] sm:text-xs font-semibold
                ${
                  pendingCount > 0
                    ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-900'
                    : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900'
                }
              `}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  pendingCount > 0 ? 'bg-indigo-600 dark:bg-indigo-400' : 'bg-emerald-600 dark:bg-emerald-400'
                }`}
              />
              <span className="font-bold">{eventCount}</span>
              <span className="hidden md:inline text-[10px] font-medium">
                {eventCount === 1 ? 'evento' : 'eventos'}
              </span>
            </span>

            {/* Optional detailed badge breakdown on medium+ screens */}
            {pendingCount > 0 && completedCount > 0 && (
              <span className="hidden lg:inline-flex text-[10px] text-slate-400 dark:text-slate-500">
                ({pendingCount}p/{completedCount}c)
              </span>
            )}
          </div>
        ) : (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-slate-300 dark:text-slate-600 hidden sm:block">
            + Añadir
          </div>
        )}
      </div>
    </button>
  );
};
