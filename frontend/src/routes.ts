import { lazy } from 'solid-js'

const routes = [
	{
		path: '/',
		component: lazy(() => import('./pages/index')),
	},
	{
		path: '/my/home',
		component: lazy(() => import('./pages/my/home')),
	},
	{
		path: '/havens/:id',
		component: lazy(() => import('./pages/havens/[id]')),
	},
	{
		path: '/havens/:id/marketplace',
		component: lazy(() => import('./pages/havens/[id]/marketplace')),
	},
]

export default routes
