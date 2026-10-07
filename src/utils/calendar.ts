import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  getDate,
} from 'date-fns';
import type { CalendarDayInfo } from '../types/event';
import { formatDateKey, isCurrentDay, isPastDate } from './dates';

/**
 * Weekday labels starting on Monday (Lunes)
 */
export const WEEK_DAYS = [
  { short: 'Lun', long: 'Lunes', index: 1 },
  { short: 'Mar', long: 'Martes', index: 2 },
  { short: 'Mié', long: 'Miércoles', index: 3 },
  { short: 'Jue', long: 'Jueves', index: 4 },
  { short: 'Vie', long: 'Viernes', index: 5 },
  { short: 'Sáb', long: 'Sábado', index: 6 },
  { short: 'Dom', long: 'Domingo', index: 0 },
];

export const MONTH_NAMES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

/**
 * Generates the full 35 or 42 grid cells for the given month/year
 * with week starting on Monday (weekStartsOn: 1).
 */
export const generateCalendarDays = (currentDate: Date): CalendarDayInfo[] => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);

  // Week starts on Monday (1)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const daysInterval = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  return daysInterval.map((day) => {
    const dateString = formatDateKey(day);
    return {
      date: day,
      dateString,
      dayNumber: getDate(day),
      isCurrentMonth: isSameMonth(day, monthStart),
      isToday: isCurrentDay(day),
      isPast: isPastDate(day),
    };
  });
};
