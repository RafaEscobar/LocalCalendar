import {
  format,
  parse,
  isToday as isTodayFns,
  isSameDay,
  isLeapYear,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  addYears,
  subYears,
  setMonth,
  setYear,
  eachDayOfInterval,
  isBefore,
  startOfDay,
} from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Format a Date object to YYYY-MM-DD
 */
export const formatDateKey = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

/**
 * Parse a YYYY-MM-DD string into a local Date object (at midnight)
 */
export const parseDateKey = (dateStr: string): Date => {
  return parse(dateStr, 'yyyy-MM-dd', new Date());
};

/**
 * Check if a date string or Date is today
 */
export const isCurrentDay = (date: Date | string): boolean => {
  const d = typeof date === 'string' ? parseDateKey(date) : date;
  return isTodayFns(d);
};

/**
 * Get human friendly month and year, e.g. "Octubre 2026"
 */
export const formatMonthYear = (date: Date): string => {
  const str = format(date, 'MMMM yyyy', { locale: es });
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Format date for friendly display, e.g. "Miércoles, 7 de octubre de 2026"
 */
export const formatFullDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? parseDateKey(date) : date;
  const formatted = format(d, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es });
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

/**
 * Format short date, e.g. "7 Oct 2026"
 */
export const formatShortDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? parseDateKey(date) : date;
  return format(d, "d MMM yyyy", { locale: es });
};

/**
 * Check if a given year is a leap year
 */
export const checkIsLeapYear = (yearOrDate: number | Date): boolean => {
  if (typeof yearOrDate === 'number') {
    return isLeapYear(new Date(yearOrDate, 0, 1));
  }
  return isLeapYear(yearOrDate);
};

/**
 * Check if a date is before today (comparing strictly by day, ignoring time)
 */
export const isPastDate = (date: Date | string): boolean => {
  const d = typeof date === 'string' ? parseDateKey(date) : date;
  const today = startOfDay(new Date());
  return isBefore(startOfDay(d), today);
};

export {
  format,
  parse,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  addYears,
  subYears,
  setMonth,
  setYear,
  eachDayOfInterval,
  es,
};
