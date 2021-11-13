import { Component } from "solid-js";
import { Link } from "solid-app-router";
import { Logo, LogoSize } from "components/molecules/Logo";
import { ButtonVariant, LinkButton, Button } from "@haven/web-components-solid";
import { Icon } from "components/molecules/Icon";
import * as config from "haven.config";

export const HeroSection: Component = () => {
	return (
		<div className="h-screen box-border flex justify-center items-center relative text-fg-inverse overflow-hidden pt-header">
			<div className="absolute bg-fg opacity-50 w-full h-full top-0 left-0" />
			<div className="absolute bg-primary opacity-50 w-full h-full top-0 left-0" />
			<div className="relative max-w-160 w-full">
				<div className="border opacity-25 border-dotted w-16 h-16 absolute -top-16 left-16 box-border" />
				<div className="border opacity-25 border-dotted w-32 h-32 absolute -top-32 left-48 box-border" />
				<div className="border opacity-25 border-dotted w-16 h-16 absolute -top-16 left-80 box-border" />
				<div className="border opacity-25 border-dotted w-16 h-16 absolute -top-16 left-112 box-border" />
				<div className="border opacity-25 border-dotted w-16 h-16 absolute top-16 -left-16 box-border" />
				<div className="border opacity-25 border-dotted w-32 h-32 absolute top-32 -left-32 box-border" />
				<div className="border opacity-25 border-dotted w-16 h-16 absolute top-80 -left-16 box-border" />
				<div className="border opacity-25 border-dotted w-16 h-16 absolute -bottom-16 left-16 box-border" />
				<div className="border opacity-25 border-dotted w-32 h-32 absolute -bottom-32 left-64 box-border" />
				<div className="border opacity-25 border-dotted w-16 h-16 absolute -bottom-16 left-96 box-border" />
				<div className="border opacity-25 border-dotted w-16 h-16 absolute top-16 -right-16 box-border" />
				<div className="border opacity-25 border-dotted w-16 h-16 absolute top-64 -right-16 box-border" />

				<div className="p-8 sm:p-12 h-96 w-full max-w-160 border border-dotted flex flex-col justify-center relative box-border">
					<div className="flex items-center space-x-8 sm:space-x-12">
						<div>
							<Logo size={LogoSize.LARGE} />
						</div>
						<div>
							<p className="lowercase text-6xl m-0 font-light">{config.meta.appName}</p>
							<p className="lowercase text-5xl m-0 font-light">{config.meta.appTagline}</p>
						</div>
					</div>
					<div className="sm:flex space-y-4 sm:space-y-0 w-full sm:space-x-4 mt-8 sm:mt-12">
						<div className="sm:w-0 flex-auto">
							<LinkButton block component={Link} href="#what-is-haven" variant={ButtonVariant.OUTLINE_INVERSE}>
								Learn More
							</LinkButton>
						</div>
						<div className="sm:w-0 flex-auto">
							<form>
								<Button block variant={ButtonVariant.FILLED_INVERSE}>
									<Icon name="metamask" className="h-8" />
									<span>Connect Wallet</span>
								</Button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};