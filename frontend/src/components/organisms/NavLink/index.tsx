import { Component } from 'solid-js'
import { Icon, IconName } from 'components/molecules/Icon'
import { Badge } from '@haven/web-components-solid'
import { Link } from 'solid-app-router'

type NavLinkProps = {
	badge?: string;
	iconName: IconName;
	href: string;
}

export const NavLink: Component<NavLinkProps> = (props) => {
	return (
		<Link
			href={props.href}
			className="box-border w-0 lg:px-4 flex-col lg:flex-row flex-auto lg:w-full lg:flex-initial flex justify-center items-center lg:justify-between h-16 no-underline relative"
		>
			<span className="lg:contents relative mt-3 lg:mt-0">
				<span className="mr-0 lg:mr-4">
					<Icon name={props.iconName} className="w-6 block" />
				</span>
				{props.badge && (
					<span className="absolute -top-3 -right-3 lg:static lg:order-3">
						<Badge>{props.badge}</Badge>
					</span>
				)}
			</span>
			<span className="lg:flex-auto lg:order-2 font-bold text-sm lg:text-base">{props.children}</span>
		</Link>
	)
}
