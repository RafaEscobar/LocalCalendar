import React, { useState, useEffect } from 'react';
import type { CalendarEvent, EventStatus } from '../../types/event';
import { Button } from '../common/Button';

interface EventFormProps {
  initialDate: string;
  initialEvent?: CalendarEvent | null;
  onSubmit: (data: { title: string; description: string; status: EventStatus; date: string }) => void;
  onCancel: () => void;
}

export const EventForm: React.FC<EventFormProps> = ({
  initialDate,
  initialEvent,
  onSubmit,
  onCancel,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<EventStatus>('pending');
  const [date, setDate] = useState(initialDate);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  useEffect(() => {
    if (initialEvent) {
      setTitle(initialEvent.title);
      setDescription(initialEvent.description || '');
      setStatus(initialEvent.status);
      setDate(initialEvent.date);
    } else {
      setTitle('');
      setDescription('');
      setStatus('pending');
      setDate(initialDate);
    }
    setErrors({});
  }, [initialEvent, initialDate]);

  const validate = () => {
    const errs: { title?: string; description?: string } = {};
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      errs.title = 'El título es obligatorio.';
    } else if (trimmedTitle.length > 100) {
      errs.title = 'El título no puede superar los 100 caracteres.';
    }

    if (description.length > 500) {
      errs.description = 'La descripción no puede superar los 500 caracteres.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      status,
      date,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Date Field */}
      <div>
        <label htmlFor="event-date" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
          Fecha del Evento
        </label>
        <input
          type="date"
          id="event-date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
        />
      </div>

      {/* Title Field */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="event-title" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Título <span className="text-rose-500">*</span>
          </label>
          <span className={`text-[11px] ${title.length > 90 ? 'text-amber-600 dark:text-amber-400 font-semibold' : 'text-slate-400'}`}>
            {title.length}/100
          </span>
        </div>
        <input
          type="text"
          id="event-title"
          placeholder="Ej: Reunión de avance del proyecto"
          value={title}
          maxLength={100}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
          }}
          autoFocus
          className={`w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 transition-colors ${
            errors.title
              ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500'
              : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500 focus:border-indigo-500'
          }`}
        />
        {errors.title && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.title}</p>}
      </div>

      {/* Description Field */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="event-description" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Descripción <span className="text-slate-400 font-normal lowercase">(opcional)</span>
          </label>
          <span className={`text-[11px] ${description.length > 450 ? 'text-amber-600 dark:text-amber-400 font-semibold' : 'text-slate-400'}`}>
            {description.length}/500
          </span>
        </div>
        <textarea
          id="event-description"
          rows={3}
          placeholder="Añade notas o detalles adicionales..."
          value={description}
          maxLength={500}
          onChange={(e) => {
            setDescription(e.target.value);
            if (errors.description) setErrors((prev) => ({ ...prev, description: undefined }));
          }}
          className={`w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 transition-colors resize-none ${
            errors.description
              ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500'
              : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500 focus:border-indigo-500'
          }`}
        />
        {errors.description && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.description}</p>}
      </div>

      {/* Status Field */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
          Estado Inicial
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setStatus('pending')}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
              status === 'pending'
                ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 shadow-xs ring-2 ring-amber-400/20'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-750'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Pendiente
          </button>

          <button
            type="button"
            onClick={() => setStatus('completed')}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
              status === 'completed'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 shadow-xs ring-2 ring-emerald-400/20'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-750'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Completado
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit">
          {initialEvent ? 'Guardar Cambios' : 'Crear Evento'}
        </Button>
      </div>
    </form>
  );
};
