import { MainPage } from 'pages/home';

const enum AppRouter {
  MAIN = 'main',
  TIMER = 'timer',
  ABOUT = 'about',
}

export const routePath: Record<AppRouter, string> = {
  [AppRouter.MAIN]: '/',
  [AppRouter.TIMER]: '/timer',
  [AppRouter.ABOUT]: '/about',
};

export const routeConfig = {
  [AppRouter.MAIN]: {
    path: routePath.main,
    element: <MainPage />,
  },
};
