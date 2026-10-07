import React from 'react';
import { Check, RotateCcw, Edit2, Trash2 } from 'lucide-react';
import type { CalendarEvent } from '../../types/event';
import { EventStatusBadge } from './EventStatusBadge';
import { Button } from '../common/Button';

interface EventCardProps {
  event: CalendarEvent;
  onToggleStatus: (id: string) => void;
  onEdit: (event: CalendarEvent) => void;
  onDelete: (event: CalendarEvent) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onToggleStatus,
  onEdit,
  onDelete,
}) => {
  const isCompleted = event.status === 'completed';

  return (
    <div
      className={`
        p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between gap-3 shadow-xs
        ${
          isCompleted
            ? 'bg-slate-50/80 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400'
            : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-sm'
        }
      `}
    >
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <h3
            className={`text-base font-bold tracking-tight ${
              isCompleted
                ? 'text-slate-500 dark:text-slate-400 line-through decoration-slate-400 dark:decoration-slate-600'
                : 'text-slate-900 dark:text-white'
            }`}
          >
            {event.title}
          </h3>
          <EventStatusBadge status={event.status} size="sm" />
        </div>

        {event.description && (
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed whitespace-pre-line">
            {event.description}
          </p>
        )}
      </div>

      {/* Actions toolbar */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 mt-1 flex-wrap gap-2">
        {/* Toggle Status Button */}
        <Button
          variant={isCompleted ? 'secondary' : 'outline'}
          size="sm"
          onClick={() => onToggleStatus(event.id)}
          icon={isCompleted ? <RotateCcw className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
          className={!isCompleted ? 'hover:border-emerald-200 dark:hover:border-emerald-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-700 dark:hover:text-emerald-300' : ''}
        >
          {isCompleted ? 'Marcar pendiente' : 'Marcar completado'}
        </Button>

        {/* Edit & Delete actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(event)}
            icon={<Edit2 className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />}
            title="Editar evento"
            aria-label="Editar evento"
          >
            <span className="hidden sm:inline">Editar</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(event)}
            icon={<Trash2 className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />}
            title="Eliminar evento"
            aria-label="Eliminar evento"
            className="hover:bg-rose-50 dark:hover:bg-rose-950/60 text-rose-600 dark:text-rose-400"
          >
            <span className="hidden sm:inline">Eliminar</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
