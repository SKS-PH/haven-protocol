import { lazy } from "solid-js";

const routes = [
	{
		path: "/",
		component: lazy(() => import("./pages/index")),
	},
	{
		path: "/my/home",
		component: lazy(() => import("./pages/my/home")),
	},
];

export default routes;
