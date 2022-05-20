import React from 'react'
import { Routes, Route, BrowserRouter, Navigate  } from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {
  return (
    <BrowserRouter>
        <div>
            <Routes>
                <Route path="login" element={<LoginScreen />} />
                <Route path="/" element={<CalendarScreen />} />
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </div>
    </BrowserRouter>
  )
}
