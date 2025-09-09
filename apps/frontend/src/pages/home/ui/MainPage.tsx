import cn from 'classnames';
import cls from './MainPage.module.scss';
import { Header } from '@/widgets/header';
import { Navbar } from '@/widgets/navbar';
import { AppRouter } from '@/app/providers/router';

export const MainPage = () => {
  return (
    <section className={cn(cls.mainPage)}>
      <Navbar />
      <div className={cn(cls.centerArea)}>
        <Header />
        <AppRouter />
      </div>
    </section>
  );
};
