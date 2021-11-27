import { Component, For } from 'solid-js'
import { NavLink } from 'components/organisms/NavLink'
import {NAVIGATION_ITEMS, NavigationItemId} from 'utils/navigation'

type NavigationProps = {
	activeNavigationId?: NavigationItemId
}

export const Navigation: Component<NavigationProps> = (props) => {
	return (
		<aside
			className="fixed z-20 bottom-0 left-0 w-full h-16 lg:w-sidebar-lg xl:w-sidebar-xl 2xl:w-sidebar-2xl lg:h-full lg:pt-header box-border"
			style={{
				'--color-bg-sidebar': 'var(--color-negative-plus-2)',
				'background-color': 'var(--color-bg-sidebar)',
			}}
		>
			<div className="absolute pointer-events-none top-0 right-0 w-full h-0.25 lg:h-full lg:w-0.25 opacity-10 dark:opacity-25 bg-current" />
			<nav className="container px-0 lg:max-w-screen-xs ml-auto mr-auto lg:mr-0">
				<h2 className="sr-only">Navigation</h2>
				<div className="flex lg:flex-col lg:py-4 lg:pr-4">
					<For each={NAVIGATION_ITEMS}>
						{(item) => {
							return (
								<NavLink iconName={item.iconName} href={item.href} active={item.id === props.activeNavigationId} badge="9+">
									{item.label}
								</NavLink>
							)
						}}
					</For>
				</div>
			</nav>
		</aside>
	)
}
