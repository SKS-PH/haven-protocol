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
		path: '/my/settings',
		component: lazy(() => import('./pages/my/settings')),
	},
	{
		path: '/marketplace',
		component: lazy(() => import('./pages/marketplace')),
	},
	{
		path: '/havens/:id',
		component: lazy(() => import('./pages/havens/[id]')),
	},
	{
		path: '/havens/:id/posts/:postId',
		component: lazy(() => import('./pages/havens/[id]/posts/[postId]')),
	},
	{
		path: '/havens/:id/works',
		component: lazy(() => import('./pages/havens/[id]/works')),
	},
	{
		path: '/havens/:id/works/:workId',
		component: lazy(() => import('./pages/havens/[id]/works/[workId]')),
	},
	{
		path: '/works/:workId',
		component: lazy(() => import('./pages/works/[workId]')),
	},
]

export default routes
