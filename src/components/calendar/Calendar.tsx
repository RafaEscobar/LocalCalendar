import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  addMonths,
  subMonths,
  addYears,
  subYears,
  setMonth,
  setYear,
} from 'date-fns';
import type { CalendarDayInfo, CalendarEvent } from '../../types/event';
import { generateCalendarDays } from '../../utils/calendar';
import { CalendarHeader } from './CalendarHeader';
import { WeekDaysHeader } from './WeekDaysHeader';
import { CalendarGrid } from './CalendarGrid';

interface CalendarProps {
  initialDate?: Date;
  selectedDateString?: string;
  events?: CalendarEvent[];
  onDayClick?: (dayInfo: CalendarDayInfo) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  initialDate = new Date(),
  selectedDateString,
  events = [],
  onDayClick,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const navigate = useNavigate();

  const days = React.useMemo(() => {
    return generateCalendarDays(currentDate);
  }, [currentDate]);

  const handlePrevMonth = () => setCurrentDate((prev) => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentDate((prev) => addMonths(prev, 1));
  const handlePrevYear = () => setCurrentDate((prev) => subYears(prev, 1));
  const handleNextYear = () => setCurrentDate((prev) => addYears(prev, 1));
  const handleToday = () => setCurrentDate(new Date());

  const handleSelectMonth = (monthIndex: number) => {
    setCurrentDate((prev) => setMonth(prev, monthIndex));
  };

  const handleSelectYear = (year: number) => {
    setCurrentDate((prev) => setYear(prev, year));
  };

  const handleDaySelect = (dayInfo: CalendarDayInfo) => {
    // If clicked on day of adjacent month, move to that month
    if (!dayInfo.isCurrentMonth) {
      setCurrentDate(dayInfo.date);
    }

    if (onDayClick) {
      onDayClick(dayInfo);
    } else {
      navigate(`/day/${dayInfo.dateString}`);
    }
  };

  return (
    <div className="w-full">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onPrevYear={handlePrevYear}
        onNextYear={handleNextYear}
        onToday={handleToday}
        onSelectMonth={handleSelectMonth}
        onSelectYear={handleSelectYear}
      />

      <div className="bg-white dark:bg-slate-900 p-3 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
        <WeekDaysHeader />
        <CalendarGrid
          days={days}
          selectedDateString={selectedDateString}
          events={events}
          onSelectDay={handleDaySelect}
        />
      </div>
    </div>
  );
};
