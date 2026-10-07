export type EventStatus = 'pending' | 'completed';

export interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  description: string;
  status: EventStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CalendarDayInfo {
  date: Date;
  dateString: string; // YYYY-MM-DD
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isPast: boolean;
}
