import type { CalendarEvent } from '../types/event';

export const STORAGE_KEY_EVENTS = 'calendar_events';

export const eventStorage = {
  /**
   * Retrieves all events from localStorage safely
   */
  getEvents: (): CalendarEvent[] => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return [];
      }
      const raw = localStorage.getItem(STORAGE_KEY_EVENTS);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        console.warn('Almacenamiento local de eventos corrupto, restableciendo a []');
        return [];
      }
      return parsed;
    } catch (error) {
      console.error('Error al leer eventos de localStorage:', error);
      return [];
    }
  },

  /**
   * Saves the complete list of events to localStorage
   */
  saveEvents: (events: CalendarEvent[]): void => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return;
      }
      localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(events));
    } catch (error) {
      console.error('Error al guardar eventos en localStorage:', error);
    }
  },

  /**
   * Clears all events from localStorage
   */
  clearEvents: (): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(STORAGE_KEY_EVENTS);
      }
    } catch (error) {
      console.error('Error al limpiar eventos de localStorage:', error);
    }
  },
};
