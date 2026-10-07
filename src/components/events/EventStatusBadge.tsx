import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';
import type { EventStatus } from '../../types/event';

interface EventStatusBadgeProps {
  status: EventStatus;
  size?: 'sm' | 'md';
}

export const EventStatusBadge: React.FC<EventStatusBadgeProps> = ({
  status,
  size = 'md',
}) => {
  const isCompleted = status === 'completed';

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  return (
    <span
      className={`
        inline-flex items-center font-semibold rounded-full border transition-colors select-none
        ${sizeClasses[size]}
        ${
          isCompleted
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
            : 'bg-amber-50 text-amber-700 border-amber-200/80'
        }
      `}
    >
      {isCompleted ? (
        <>
          <CheckCircle2 className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
          <span>Completado</span>
        </>
      ) : (
        <>
          <Clock className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
          <span>Pendiente</span>
        </>
      )}
    </span>
  );
};
