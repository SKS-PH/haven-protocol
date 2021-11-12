import { lazy } from 'solid-js';

const routes = [
  {
    path: '/',
    component: lazy(() => import('./pages/index'))
  }
];

export default routes;

