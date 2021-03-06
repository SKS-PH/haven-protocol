import {JSX, Show, splitProps} from 'solid-js'
import { ValidConstructor } from '../../utils/types'
import { ButtonSize, ButtonVariant } from '../../utils/button'

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
	[ButtonVariant.OUTLINE]: 'border-primary text-primary no-underline bg-transparent',
	[ButtonVariant.FILLED]: 'border-primary bg-primary text-fg-inverse',
	[ButtonVariant.OUTLINE_INVERSE]: 'border-fg-inverse text-fg-inverse no-underline',
	[ButtonVariant.FILLED_INVERSE]: 'border-fg-inverse bg-fg-inverse text-primary-fixed',
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
	[ButtonSize.SMALL]: 'h-10',
	[ButtonSize.MEDIUM]: 'h-12',
	[ButtonSize.LARGE]: 'h-16',
}

export type LinkButtonProps<T extends ValidConstructor = 'a'> = JSX.IntrinsicElements['a'] & {
	variant?: ButtonVariant;
	size?: ButtonSize;
	component?: any; // FIXME
	href?: string;
	block?: boolean;
	compact?: string;
}

export const LinkButton = <T extends ValidConstructor = 'a'>(props: LinkButtonProps<T>) => {
	const [localProps, etcProps] = splitProps(props, ['variant', 'size', 'component', 'href', 'block', 'children', 'compact'])
	const sizeClassName = () => SIZE_CLASSES[localProps.size ?? ButtonSize.MEDIUM]
	const variantClassName = () => VARIANT_CLASSES[localProps.variant ?? ButtonVariant.OUTLINE]
	const blockClassName = () => localProps.block ? 'w-full flex' : 'inline-flex'
	const RenderedComponent = localProps.component ?? 'a'
	const compactClassName = () => !localProps.compact ? 'px-4' : `${localProps.compact}:px-4`

	// FIXME
	return (
		<>
			<Show
				when={RenderedComponent !== 'a'}
				fallback={
					<a
						{...etcProps}
						href={localProps.href}
						className={`no-underline leading-none text-center box-border border border-solid cursor-pointer ${compactClassName()} space-x-2 justify-center items-center uppercase font-bold rounded-full ${blockClassName()} ${variantClassName()} ${sizeClassName()}`}
					>
						{localProps.children}
					</a>
				}
			>
				<RenderedComponent
					{...etcProps}
					href={localProps.href}
					className={`no-underline leading-none text-center box-border border border-solid cursor-pointer ${compactClassName()} space-x-2 justify-center items-center uppercase font-bold rounded-full ${blockClassName()} ${variantClassName()} ${sizeClassName()}`}
				>
					{localProps.children}
				</RenderedComponent>
			</Show>
		</>
	)
}
