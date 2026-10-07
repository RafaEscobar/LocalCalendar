import React from 'react';
import type { CalendarEvent } from '../../types/event';
import { EventCard } from './EventCard';
import { EmptyState } from '../common/EmptyState';
import { CalendarIcon, Plus } from 'lucide-react';
import { Button } from '../common/Button';

interface EventListProps {
  events: CalendarEvent[];
  onToggleStatus: (id: string) => void;
  onEdit: (event: CalendarEvent) => void;
  onDelete: (event: CalendarEvent) => void;
  onCreateNew: () => void;
}

export const EventList: React.FC<EventListProps> = ({
  events,
  onToggleStatus,
  onEdit,
  onDelete,
  onCreateNew,
}) => {
  if (events.length === 0) {
    return (
      <EmptyState
        icon={<CalendarIcon className="w-8 h-8 text-indigo-500" />}
        title="No hay eventos registrados para este día"
        description="Agrega un evento o recordatorio personal para mantener tus actividades organizadas."
        action={
          <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={onCreateNew}>
            Crear primer evento
          </Button>
        }
      />
    );
  }

  const pendingEvents = events.filter((e) => e.status === 'pending');
  const completedEvents = events.filter((e) => e.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Pending Events Section */}
      {pendingEvents.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Pendientes ({pendingEvents.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {pendingEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onToggleStatus={onToggleStatus}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Events Section */}
      {completedEvents.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Completados ({completedEvents.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {completedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onToggleStatus={onToggleStatus}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
