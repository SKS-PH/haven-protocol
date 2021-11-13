import { JSX } from "solid-js";
import { ValidConstructor } from "../../utils/types";
import { ButtonSize, ButtonVariant } from "../../utils/button";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
	[ButtonVariant.OUTLINE]: "border-primary text-primary no-underline",
	[ButtonVariant.FILLED]: "border-primary bg-primary text-fg-inverse",
	[ButtonVariant.OUTLINE_INVERSE]: "border-fg-inverse text-fg-inverse no-underline",
	[ButtonVariant.FILLED_INVERSE]: "border-fg-inverse border-fg-inverse text-primary",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
	[ButtonSize.MEDIUM]: "h-12",
	[ButtonSize.LARGE]: "h-16",
};

export type LinkButtonProps<T extends ValidConstructor = "a"> = JSX.HTMLAttributes<HTMLAnchorElement> & {
	variant?: ButtonVariant;
	size?: ButtonSize;
	component?: T; // FIXME
	href?: string;
	block?: boolean;
};

export const LinkButton = <T extends ValidConstructor = "a">(props: LinkButtonProps<T>) => {
	const variantClassName = VARIANT_CLASSES[props.variant ?? ButtonVariant.OUTLINE];
	const sizeClassName = SIZE_CLASSES[props.size ?? ButtonSize.MEDIUM];
	const RenderedComponent = props.component ?? "a";

	// FIXME
	return (
		<>
			<Show
				when={RenderedComponent !== "a"}
				fallback={
					<a
						{...props}
						href={props.href}
						className={`leading-none text-center box-border border border-solid cursor-pointer px-4 space-x-2 ${
							props.block ? "w-full flex" : "inline-flex"
						} justify-center items-center uppercase font-bold rounded-full ${variantClassName} ${sizeClassName}`}
					>
						{props.children}
					</a>
				}
			>
				<RenderedComponent
					{...props}
					href={props.href}
					className={`leading-none text-center box-border border border-solid cursor-pointer px-4 space-x-2 ${
						props.block ? "w-full flex" : "inline-flex"
					} justify-center items-center uppercase font-bold rounded-full ${variantClassName} ${sizeClassName}`}
				>
					{props.children}
				</RenderedComponent>
			</Show>
		</>
	);
};
