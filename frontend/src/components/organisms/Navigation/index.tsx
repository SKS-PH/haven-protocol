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
			<nav>
				<h2 className="sr-only">Navigation</h2>
				<div className="flex md:flex-col">
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
