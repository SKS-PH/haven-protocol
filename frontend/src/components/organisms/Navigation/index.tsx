import { Component } from "solid-js";
import { NavLink } from "components/organisms/NavLink";

export const Navigation: Component = () => {
	return (
		<aside
			className="fixed bottom-0 left-0 w-full h-16 md:w-sidebar md:h-full md:pt-header box-border"
			style={{
				"--color-bg-sidebar": "var(--color-negative-plus-2)",
				"background-color": "var(--color-bg-sidebar)",
			}}
		>
			<div className="absolute pointer-events-none top-0 right-0 w-full h-0.25 md:h-full md:w-0.25 opacity-10 dark:opacity-25 bg-current" />
			<nav>
				<h2 className="sr-only">Navigation</h2>
				<div className="flex md:flex-col md:py-4">
					<NavLink iconName="home" href="/my/home" badge="9+">
						Home
					</NavLink>
					<NavLink iconName="marketplace" href="/marketplace" badge="9+">
						Marketplace
					</NavLink>
					<NavLink iconName="settings" href="/my/settings">
						Settings
					</NavLink>
				</div>
			</nav>
		</aside>
	);
};
