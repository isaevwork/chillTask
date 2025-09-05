import { Route, Routes } from 'react-router-dom';
import Mounter from 'features/components/Counter/Counter';
import TimeCounter from 'features/components/TimeCounter/TimeCounter';
import React from 'react';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Mounter />} />
      <Route path="/timer" element={<TimeCounter />} />
      <Route path="/calendar" element={<TimeCounter />} />
      {/*<Route  path="/account" element={<TimeCounter />} />*/}
    </Routes>
  );
};
