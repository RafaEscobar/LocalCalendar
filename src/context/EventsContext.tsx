import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { CalendarEvent, EventStatus } from '../types/event';
import { eventStorage } from '../services/eventStorage';

export interface NewEventInput {
  date: string;
  title: string;
  description?: string;
  status?: EventStatus;
}

export interface UpdateEventInput {
  title?: string;
  description?: string;
  status?: EventStatus;
  date?: string;
}

export interface EventsContextType {
  events: CalendarEvent[];
  addEvent: (input: NewEventInput) => CalendarEvent;
  updateEvent: (id: string, input: UpdateEventInput) => void;
  deleteEvent: (id: string) => void;
  toggleEventStatus: (id: string) => void;
  getEventsByDate: (date: string) => CalendarEvent[];
  getEventById: (id: string) => CalendarEvent | undefined;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    return eventStorage.getEvents();
  });

  // Keep localStorage synchronized whenever events state changes
  useEffect(() => {
    eventStorage.saveEvents(events);
  }, [events]);

  const addEvent = useCallback((input: NewEventInput): CalendarEvent => {
    const now = new Date().toISOString();
    const newEvent: CalendarEvent = {
      id: crypto.randomUUID ? crypto.randomUUID() : `ev_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      date: input.date,
      title: input.title.trim(),
      description: input.description ? input.description.trim() : '',
      status: input.status || 'pending',
      createdAt: now,
      updatedAt: now,
    };

    setEvents((prev) => [newEvent, ...prev]);
    return newEvent;
  }, []);

  const updateEvent = useCallback((id: string, input: UpdateEventInput) => {
    const now = new Date().toISOString();
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id !== id) return ev;
        return {
          ...ev,
          title: input.title !== undefined ? input.title.trim() : ev.title,
          description: input.description !== undefined ? input.description.trim() : ev.description,
          status: input.status !== undefined ? input.status : ev.status,
          date: input.date !== undefined ? input.date : ev.date,
          updatedAt: now,
        };
      })
    );
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  }, []);

  const toggleEventStatus = useCallback((id: string) => {
    const now = new Date().toISOString();
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id !== id) return ev;
        const newStatus: EventStatus = ev.status === 'pending' ? 'completed' : 'pending';
        return {
          ...ev,
          status: newStatus,
          updatedAt: now,
        };
      })
    );
  }, []);

  const getEventsByDate = useCallback(
    (date: string): CalendarEvent[] => {
      const dayEvents = events.filter((ev) => ev.date === date);
      // Sort: pending first, then completed. Then by createdAt desc
      return dayEvents.sort((a, b) => {
        if (a.status === b.status) {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return a.status === 'pending' ? -1 : 1;
      });
    },
    [events]
  );

  const getEventById = useCallback(
    (id: string): CalendarEvent | undefined => {
      return events.find((ev) => ev.id === id);
    },
    [events]
  );

  return (
    <EventsContext.Provider
      value={{
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        toggleEventStatus,
        getEventsByDate,
        getEventById,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = (): EventsContextType => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents debe utilizarse dentro de un EventsProvider');
  }
  return context;
};
