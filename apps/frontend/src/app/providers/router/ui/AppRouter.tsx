import { Route, Routes } from 'react-router-dom';
import Counter from '@/features/Counter/Counter';
import TimeCounter from '@/features/TimeCounter/TimeCounter';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Counter />} />
      <Route path="/timer" element={<TimeCounter />} />
      <Route path="/calendar" element={<TimeCounter />} />
      {/*<Route  path="/account" element={<TimeCounter />} />*/}
    </Routes>
  );
};
