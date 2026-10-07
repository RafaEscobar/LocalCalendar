import React from 'react';
import { NavLink } from 'react-router-dom';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import type { CalendarEvent } from '../../types/event';
import { formatShortDate } from '../../utils/dates';
import { EmptyState } from '../common/EmptyState';

interface CompletedEventsProps {
  events: CalendarEvent[];
}

export const CompletedEvents: React.FC<CompletedEventsProps> = ({ events }) => {
  if (events.length === 0) {
    return (
      <EmptyState
        icon={<CheckCircle2 className="w-8 h-8 text-emerald-500" />}
        title="Todavía no has completado ningún evento"
        description="Cuando finalices una actividad o compromiso, márcala como completada para verla aquí."
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
            className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-emerald-200 dark:hover:border-emerald-900 transition-all gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="shrink-0 px-2.5 py-1 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800">
                {formatShortDate(event.date)}
              </span>
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-300 line-through decoration-slate-400 truncate">
                  {event.title}
                </h4>
                {event.description && (
                  <p className="text-xs text-slate-400 truncate max-w-md">
                    {event.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Listo
              </span>
              <NavLink
                to={`/day/${event.date}`}
                className="p-1.5 rounded-xl text-slate-400 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
