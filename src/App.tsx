import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { EventsProvider } from './context/EventsContext';
import { Layout } from './components/layout/Layout';
import { CalendarPage } from './pages/CalendarPage';
import { DayDetailsPage } from './pages/DayDetailsPage';
import { StatisticsPage } from './pages/StatisticsPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <EventsProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<CalendarPage />} />
              <Route path="day/:date" element={<DayDetailsPage />} />
              <Route path="statistics" element={<StatisticsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </HashRouter>
      </EventsProvider>
    </ThemeProvider>
  );
};

export default App;
