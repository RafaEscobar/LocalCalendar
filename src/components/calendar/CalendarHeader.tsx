import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Calendar as CalendarIcon,
} from 'lucide-react';
import { Button } from '../common/Button';
import { checkIsLeapYear } from '../../utils/dates';
import { MONTH_NAMES } from '../../utils/calendar';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onPrevYear: () => void;
  onNextYear: () => void;
  onToday: () => void;
  onSelectMonth: (monthIndex: number) => void;
  onSelectYear: (year: number) => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onPrevYear,
  onNextYear,
  onToday,
  onSelectMonth,
  onSelectYear,
}) => {
  const currentYear = currentDate.getFullYear();
  const currentMonthIndex = currentDate.getMonth();
  const isLeap = checkIsLeapYear(currentYear);

  // Generate range of selectable years
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs mb-6 transition-colors">
      {/* Month & Year Title with Selectors */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <select
            value={currentMonthIndex}
            aria-label="Seleccionar mes"
            onChange={(e) => onSelectMonth(Number(e.target.value))}
            className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl px-2 py-1 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {MONTH_NAMES.map((name, idx) => (
              <option key={name} value={idx} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                {name}
              </option>
            ))}
          </select>

          <select
            value={currentYear}
            aria-label="Seleccionar año"
            onChange={(e) => onSelectYear(Number(e.target.value))}
            className="text-lg sm:text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl px-2 py-1 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {years.map((y) => (
              <option key={y} value={y} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                {y}
              </option>
            ))}
          </select>
        </div>

        {isLeap && currentMonthIndex === 1 && (
          <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800">
            Bisiesto (29 días)
          </span>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-2">
        {/* Quick Return to Today */}
        <Button
          variant="outline"
          size="sm"
          onClick={onToday}
          icon={<CalendarIcon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
          className="font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800"
          aria-label="Ir al día de hoy"
        >
          Hoy
        </Button>

        <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

        {/* Year & Month Navigation Buttons */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onPrevYear}
            title="Año anterior"
            aria-label="Año anterior"
            className="p-2 h-9 w-9 rounded-xl"
          >
            <ChevronsLeft className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onPrevMonth}
            title="Mes anterior"
            aria-label="Mes anterior"
            className="p-2 h-9 w-9 rounded-xl"
          >
            <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onNextMonth}
            title="Mes siguiente"
            aria-label="Mes siguiente"
            className="p-2 h-9 w-9 rounded-xl"
          >
            <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onNextYear}
            title="Año siguiente"
            aria-label="Año siguiente"
            className="p-2 h-9 w-9 rounded-xl"
          >
            <ChevronsRight className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </Button>
        </div>
      </div>
    </div>
  );
};
