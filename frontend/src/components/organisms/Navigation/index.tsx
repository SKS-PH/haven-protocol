import { Component } from "solid-js";
import { NavLink } from "components/organisms/NavLink";

export const Navigation: Component = () => {
	return (
		<aside
			className="fixed bottom-0 left-0 w-full h-16 lg:w-sidebar-lg xl:w-sidebar-xl 2xl:w-sidebar-2xl lg:h-full lg:pt-header box-border"
			style={{
				"--color-bg-sidebar": "var(--color-negative-plus-2)",
				"background-color": "var(--color-bg-sidebar)",
			}}
		>
			<div className="absolute pointer-events-none top-0 right-0 w-full h-0.25 lg:h-full lg:w-0.25 opacity-10 dark:opacity-25 bg-current" />
			<nav className="container px-0 lg:max-w-screen-xs ml-auto mr-auto lg:mr-0">
				<h2 className="sr-only">Navigation</h2>
				<div className="flex lg:flex-col lg:py-2 lg:pr-2">
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
