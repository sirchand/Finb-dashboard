import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import CalendarTracker from './pages/CalendarTracker';
import Budget from './pages/Budget';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
         <Route path="/reports" element={<Reports />} />
         <Route path="/calendar" element={<CalendarTracker />} />
         <Route path="/budget" element={<Budget />} />

      </Routes>
    </BrowserRouter>
  );
}
