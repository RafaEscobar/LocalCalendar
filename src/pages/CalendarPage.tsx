import React from 'react';
import { Calendar } from '../components/calendar/Calendar';
import { CalendarDays, Plus, CheckCircle2, Clock } from 'lucide-react';
import { useEvents } from '../hooks/useEvents';
import { Button } from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { formatDateKey } from '../utils/dates';

export const CalendarPage: React.FC = () => {
  const { events } = useEvents();
  const navigate = useNavigate();

  const todayStr = formatDateKey(new Date());
  const pendingTotal = events.filter((e) => e.status === 'pending').length;
  const completedTotal = events.filter((e) => e.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Header section with quick summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <CalendarDays className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            Calendario de Eventos
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Selecciona cualquier día para ver, crear o administrar tus eventos personales.
          </p>
        </div>

        {/* Quick summary badges and Quick Add for Today */}
        <div className="flex items-center gap-2 flex-wrap">
          {events.length > 0 && (
            <div className="flex items-center gap-2 mr-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/70 dark:border-amber-900">
                <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                {pendingTotal} pendientes
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-900">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {completedTotal} completados
              </span>
            </div>
          )}

          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => navigate(`/day/${todayStr}`)}
          >
            Evento para Hoy
          </Button>
        </div>
      </div>

      {/* Main Calendar with reactive events */}
      <Calendar events={events} />
    </div>
  );
};
