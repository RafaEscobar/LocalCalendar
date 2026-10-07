import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, ChevronRight, Check } from 'lucide-react';
import type { CalendarEvent } from '../../types/event';
import { formatShortDate } from '../../utils/dates';
import { EmptyState } from '../common/EmptyState';
import { Button } from '../common/Button';

interface UpcomingEventsProps {
  events: CalendarEvent[];
  onToggleStatus: (id: string) => void;
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events, onToggleStatus }) => {
  if (events.length === 0) {
    return (
      <EmptyState
        icon={<Calendar className="w-8 h-8 text-indigo-500" />}
        title="No tienes próximos eventos pendientes"
        description="¡Estás al día con tus actividades o aún no has programado eventos futuros!"
      />
    );
  }

  // Display upcoming up to 10
  const displayedEvents = events.slice(0, 10);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-2.5">
        {displayedEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-indigo-200 dark:hover:border-indigo-800 transition-all gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="shrink-0 px-2.5 py-1 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900">
                {formatShortDate(event.date)}
              </span>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {event.title}
                </h4>
                {event.description && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-md">
                    {event.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onToggleStatus(event.id)}
                icon={<Check className="w-3.5 h-3.5 text-emerald-600" />}
                className="hidden sm:inline-flex"
                title="Marcar como completado"
              >
                Completar
              </Button>
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
