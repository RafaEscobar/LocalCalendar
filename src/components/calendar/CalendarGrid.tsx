import React from 'react';
import type { CalendarDayInfo, CalendarEvent } from '../../types/event';
import { CalendarDay } from './CalendarDay';

interface CalendarGridProps {
  days: CalendarDayInfo[];
  selectedDateString?: string;
  events?: CalendarEvent[];
  onSelectDay: (dayInfo: CalendarDayInfo) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  days,
  selectedDateString,
  events = [],
  onSelectDay,
}) => {
  // Map events per date for fast O(1) lookup
  const eventsByDate = React.useMemo(() => {
    const map = new Map<string, { total: number; pending: number; completed: number }>();
    for (const ev of events) {
      const current = map.get(ev.date) || { total: 0, pending: 0, completed: 0 };
      current.total += 1;
      if (ev.status === 'pending') {
        current.pending += 1;
      } else {
        current.completed += 1;
      }
      map.set(ev.date, current);
    }
    return map;
  }, [events]);

  return (
    <div className="grid grid-cols-7 gap-1 sm:gap-2">
      {days.map((dayInfo) => {
        const stats = eventsByDate.get(dayInfo.dateString);
        return (
          <CalendarDay
            key={dayInfo.dateString}
            dayInfo={dayInfo}
            isSelected={selectedDateString === dayInfo.dateString}
            eventCount={stats?.total ?? 0}
            pendingCount={stats?.pending ?? 0}
            completedCount={stats?.completed ?? 0}
            onClick={onSelectDay}
          />
        );
      })}
    </div>
  );
};
