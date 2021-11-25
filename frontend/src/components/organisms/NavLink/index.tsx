import { Component, Show } from 'solid-js'
import { Icon, IconName } from 'components/molecules/Icon'
import { Badge } from '@haven/web-components-solid'
import { Link } from 'solid-app-router'

type NavLinkProps = {
	badge?: string;
	iconName: IconName;
	href: string;
	active?: boolean;
}

export const NavLink: Component<NavLinkProps> = (props) => {
	return (
		<Link
			href={props.href}
			className="relative lg:rounded-md overflow-hidden box-border w-0 lg:px-6 flex flex-auto items-center lg:w-full h-16 no-underline"
		>
			<Show
				when={props.active}
			>
				<span
					className="absolute top-0 left-0 w-full h-full bg-current opacity-25"
				/>
			</Show>
			<span className="relative flex flex-auto w-full flex-col lg:flex-row lg:flex-initial justify-center items-center lg:justify-between">
				<span className="lg:contents relative mt-3 lg:mt-0">
					<span className="mr-0 lg:mr-4">
						<Icon name={props.iconName} className="w-6 block" />
					</span>
					<Show
						when={Boolean(props.badge)}
					>
						<span className="absolute -top-3 -right-3 lg:static lg:order-3">
							<Badge>{props.badge}</Badge>
						</span>
					</Show>
				</span>
				<span className="lg:flex-auto lg:order-2 font-bold text-sm lg:text-base relative">{props.children}</span>
			</span>
		</Link>
	)
}
