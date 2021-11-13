import { Component } from "solid-js";
import { Icon, IconName } from "components/molecules/Icon";
import { Badge } from "@haven/web-components-solid";
import { Link } from "solid-app-router";

type NavLinkProps = {
	badge?: string;
	iconName: IconName;
	href: string;
};

export const NavLink: Component<NavLinkProps> = (props) => {
	return (
		<Link
			href={props.href}
			className="box-border w-0 px-4 flex-col md:flex-row flex-auto md:w-full md:flex-initial flex justify-center items-center md:justify-between h-16 no-underline relative"
		>
			<span className="md:contents relative mt-3 md:mt-0">
				<span className="mr-0 md:mr-4">
					<Icon name={props.iconName} className="w-6 block" />
				</span>
				{props.badge && (
					<span className="absolute -top-3 -right-3 md:static md:order-3">
						<Badge>{props.badge}</Badge>
					</span>
				)}
			</span>
			<span className="md:flex-auto md:order-2 font-bold text-sm md:text-base">{props.children}</span>
		</Link>
	);
};
