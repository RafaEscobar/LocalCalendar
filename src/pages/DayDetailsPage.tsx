import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Calendar as CalendarIcon } from 'lucide-react';
import { formatFullDate, parseDateKey } from '../utils/dates';
import { Button } from '../components/common/Button';
import { EventList } from '../components/events/EventList';
import { EventForm } from '../components/events/EventForm';
import { Modal } from '../components/common/Modal';
import { DeleteEventDialog } from '../components/events/DeleteEventDialog';
import { useEvents } from '../hooks/useEvents';
import type { CalendarEvent, EventStatus } from '../types/event';

export const DayDetailsPage: React.FC = () => {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const { getEventsByDate, addEvent, updateEvent, deleteEvent, toggleEventStatus } = useEvents();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<CalendarEvent | null>(null);

  const targetDate = date || new Date().toISOString().split('T')[0];

  const formattedDate = React.useMemo(() => {
    try {
      const parsed = parseDateKey(targetDate);
      if (isNaN(parsed.getTime())) return targetDate;
      return formatFullDate(parsed);
    } catch {
      return targetDate;
    }
  }, [targetDate]);

  const dayEvents = getEventsByDate(targetDate);

  const handleOpenCreate = () => {
    setEditingEvent(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (event: CalendarEvent) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: { title: string; description: string; status: EventStatus; date: string }) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, {
        title: data.title,
        description: data.description,
        status: data.status,
        date: data.date,
      });
      if (data.date !== targetDate) {
        navigate(`/day/${data.date}`);
      }
    } else {
      addEvent({
        title: data.title,
        description: data.description,
        status: data.status,
        date: data.date,
      });
      if (data.date !== targetDate) {
        navigate(`/day/${data.date}`);
      }
    }
    setIsFormOpen(false);
    setEditingEvent(null);
  };

  const handleDeleteConfirm = () => {
    if (deletingEvent) {
      deleteEvent(deletingEvent.id);
      setDeletingEvent(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
            icon={<ArrowLeft className="w-4 h-4" />}
            aria-label="Volver al calendario"
          >
            Calendario
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Detalle del Día
              </span>
              {dayEvents.length > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {dayEvents.length} {dayEvents.length === 1 ? 'evento' : 'eventos'}
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2 mt-0.5">
              <CalendarIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              {formattedDate}
            </h1>
          </div>
        </div>

        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={handleOpenCreate}
        >
          Nuevo Evento
        </Button>
      </div>

      {/* Events List */}
      <EventList
        events={dayEvents}
        onToggleStatus={toggleEventStatus}
        onEdit={handleOpenEdit}
        onDelete={(ev) => setDeletingEvent(ev)}
        onCreateNew={handleOpenCreate}
      />

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingEvent(null);
        }}
        title={editingEvent ? 'Editar Evento' : 'Crear Nuevo Evento'}
      >
        <EventForm
          initialDate={targetDate}
          initialEvent={editingEvent}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingEvent(null);
          }}
        />
      </Modal>

      {/* Delete Confirmation Dialog */}
      <DeleteEventDialog
        isOpen={!!deletingEvent}
        event={deletingEvent}
        onClose={() => setDeletingEvent(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};
