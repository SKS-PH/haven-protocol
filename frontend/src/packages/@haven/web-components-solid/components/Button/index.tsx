import {Component, JSX, splitProps} from 'solid-js'
import { ButtonSize, ButtonVariant } from '../../utils/button'

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
	[ButtonVariant.OUTLINE]: 'border-primary text-primary no-underline bg-transparent',
	[ButtonVariant.FILLED]: 'border-primary bg-primary text-fg-inverse',
	[ButtonVariant.OUTLINE_INVERSE]: 'border-fg-inverse text-fg-inverse no-underline',
	[ButtonVariant.FILLED_INVERSE]: 'border-fg-inverse border-fg-inverse text-primary-fixed',
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
	[ButtonSize.MEDIUM]: 'h-12',
	[ButtonSize.LARGE]: 'h-16',
}

export type ButtonProps = JSX.IntrinsicElements['button'] & {
	variant?: ButtonVariant;
	size?: ButtonSize;
	block?: boolean;
}

export const Button: Component<ButtonProps> = (props) => {
	const [localProps, etcProps] = splitProps(props, ['variant', 'size', 'block', 'type', 'children'])
	const variantClassName = () => VARIANT_CLASSES[localProps.variant ?? ButtonVariant.OUTLINE]
	const sizeClassName = () => SIZE_CLASSES[localProps.size ?? ButtonSize.MEDIUM]
	const blockClassName = () => localProps.block ? 'w-full flex' : 'inline-flex'
	const type = () => props.type ?? 'button'

	console.log(type())

	return (
		<button
			{...etcProps}
			type={type()}
			className={`leading-none text-center box-border border border-solid cursor-pointer disabled:cursor-not-allowed px-4 ${blockClassName()} justify-center space-x-2 items-center uppercase font-bold rounded-full ${variantClassName()} ${sizeClassName()}`}
		>
			{localProps.children}
		</button>
	)
}
