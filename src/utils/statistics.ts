import type { CalendarEvent } from '../types/event';
import { formatDateKey } from './dates';

export interface CalendarStatistics {
  total: number;
  upcomingCount: number;
  pastCount: number;
  overdueCount: number;
  completedCount: number;
  pendingCount: number;
  completionRate: number;
  upcomingEvents: CalendarEvent[];
  pastEvents: CalendarEvent[];
  overdueEvents: CalendarEvent[];
  completedEvents: CalendarEvent[];
}

/**
 * Computes all statistical metrics based on standard YYYY-MM-DD comparisons
 */
export const calculateStatistics = (events: CalendarEvent[], referenceDate: Date = new Date()): CalendarStatistics => {
  const todayKey = formatDateKey(referenceDate);

  const total = events.length;
  let upcomingCount = 0;
  let pastCount = 0;
  let overdueCount = 0;
  let completedCount = 0;
  let pendingCount = 0;

  const upcomingEvents: CalendarEvent[] = [];
  const pastEvents: CalendarEvent[] = [];
  const overdueEvents: CalendarEvent[] = [];
  const completedEvents: CalendarEvent[] = [];

  for (const event of events) {
    if (event.status === 'completed') {
      completedCount++;
      completedEvents.push(event);
    } else {
      pendingCount++;
    }

    // Date comparison strictly by YYYY-MM-DD
    if (event.date >= todayKey) {
      if (event.status === 'pending') {
        upcomingCount++;
        upcomingEvents.push(event);
      }
    } else {
      pastCount++;
      pastEvents.push(event);

      if (event.status === 'pending') {
        overdueCount++;
        overdueEvents.push(event);
      }
    }
  }

  // Sort upcoming events: date ascending (soonest first)
  upcomingEvents.sort((a, b) => a.date.localeCompare(b.date));

  // Sort past events: date descending (most recent past first)
  pastEvents.sort((a, b) => b.date.localeCompare(a.date));

  // Sort overdue events: date ascending (longest overdue first)
  overdueEvents.sort((a, b) => a.date.localeCompare(b.date));

  // Sort completed events: updatedAt descending (most recently completed first)
  completedEvents.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const completionRate = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  return {
    total,
    upcomingCount,
    pastCount,
    overdueCount,
    completedCount,
    pendingCount,
    completionRate,
    upcomingEvents,
    pastEvents,
    overdueEvents,
    completedEvents,
  };
};
