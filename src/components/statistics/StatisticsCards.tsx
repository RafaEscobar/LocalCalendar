import React from 'react';
import { Calendar, CheckCircle2, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import type { CalendarStatistics } from '../../utils/statistics';

interface StatisticsCardsProps {
  stats: CalendarStatistics;
}

export const StatisticsCards: React.FC<StatisticsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Próximos eventos */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Próximos
          </p>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {stats.upcomingCount}
          </p>
          <p className="text-[11px] text-slate-400">Hoy o fechas futuras</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 shadow-xs">
          <Calendar className="w-6 h-6" />
        </div>
      </div>

      {/* Completados */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Completados
          </p>
          <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {stats.completedCount}
          </p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>{stats.completionRate}% del total</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
          <CheckCircle2 className="w-6 h-6" />
        </div>
      </div>

      {/* Pendientes */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Pendientes Totales
          </p>
          <p className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">
            {stats.pendingCount}
          </p>
          <p className="text-[11px] text-slate-400">En todas las fechas</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-xs">
          <Clock className="w-6 h-6" />
        </div>
      </div>

      {/* Vencidos */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Vencidos
          </p>
          <p className={`text-3xl font-extrabold ${stats.overdueCount > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-white'}`}>
            {stats.overdueCount}
          </p>
          <p className="text-[11px] text-slate-400">Pendientes anteriores a hoy</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 shadow-xs">
          <AlertTriangle className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
