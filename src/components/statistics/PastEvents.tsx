import React from 'react';
import { NavLink } from 'react-router-dom';
import { History, ChevronRight } from 'lucide-react';
import type { CalendarEvent } from '../../types/event';
import { formatShortDate } from '../../utils/dates';
import { EmptyState } from '../common/EmptyState';
import { EventStatusBadge } from '../events/EventStatusBadge';

interface PastEventsProps {
  events: CalendarEvent[];
}

export const PastEvents: React.FC<PastEventsProps> = ({ events }) => {
  if (events.length === 0) {
    return (
      <EmptyState
        icon={<History className="w-8 h-8 text-slate-400" />}
        title="Sin historial de eventos pasados"
        description="No hay eventos en fechas anteriores a hoy."
      />
    );
  }

  const displayedEvents = events.slice(0, 10);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-2.5">
        {displayedEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="shrink-0 px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                {formatShortDate(event.date)}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {event.title}
                  </h4>
                </div>
                {event.description && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-md">
                    {event.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <EventStatusBadge status={event.status} size="sm" />
              <NavLink
                to={`/day/${event.date}`}
                className="p-1.5 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Ver detalle del día"
              >
                <ChevronRight className="w-5 h-5" />
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
