import React, { useState } from 'react';
import { BarChart3, ArrowLeft, Calendar, History, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';
import { calculateStatistics } from '../utils/statistics';
import { Button } from '../components/common/Button';
import { StatisticsCards } from '../components/statistics/StatisticsCards';
import { UpcomingEvents } from '../components/statistics/UpcomingEvents';
import { PastEvents } from '../components/statistics/PastEvents';
import { CompletedEvents } from '../components/statistics/CompletedEvents';

type StatTab = 'upcoming' | 'overdue' | 'past' | 'completed';

export const StatisticsPage: React.FC = () => {
  const navigate = useNavigate();
  const { events, toggleEventStatus } = useEvents();
  const [activeTab, setActiveTab] = useState<StatTab>('upcoming');

  const stats = React.useMemo(() => {
    return calculateStatistics(events);
  }, [events]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <BarChart3 className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            Estadísticas y Resumen
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Métricas clave, compromisos pendientes, eventos pasados y registro de cumplimiento.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/')}
          icon={<ArrowLeft className="w-4 h-4" />}
        >
          Volver al Calendario
        </Button>
      </div>

      {/* Summary KPI Cards */}
      <StatisticsCards stats={stats} />

      {/* Tab Selector for Event Lists */}
      <div className="pt-2">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-px">
          <button
            type="button"
            onClick={() => setActiveTab('upcoming')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'upcoming'
                ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Próximos ({stats.upcomingCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('overdue')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'overdue'
                ? 'border-rose-500 text-rose-600 dark:border-rose-400 dark:text-rose-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            <span>Vencidos ({stats.overdueCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('completed')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'completed'
                ? 'border-emerald-500 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Completados ({stats.completedCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('past')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'past'
                ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Historial Pasado ({stats.pastCount})</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="pt-4">
          {activeTab === 'upcoming' && (
            <UpcomingEvents events={stats.upcomingEvents} onToggleStatus={toggleEventStatus} />
          )}
          {activeTab === 'overdue' && (
            <PastEvents events={stats.overdueEvents} />
          )}
          {activeTab === 'completed' && (
            <CompletedEvents events={stats.completedEvents} />
          )}
          {activeTab === 'past' && (
            <PastEvents events={stats.pastEvents} />
          )}
        </div>
      </div>
    </div>
  );
};
