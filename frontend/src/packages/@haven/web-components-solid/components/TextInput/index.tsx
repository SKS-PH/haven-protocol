import {Component, JSX, splitProps} from 'solid-js'
import { TextControlSize } from '../../utils/textControl'

const SIZE_CLASSES: Record<TextControlSize, string> = {
	[TextControlSize.SMALL]: 'h-10',
	[TextControlSize.MEDIUM]: 'h-12',
}

type TextInputProps = JSX.IntrinsicElements['input'] & {
	size?: TextControlSize;
	block?: boolean;
}

export const TextInput: Component<TextInputProps> = (props) => {
	const [localProps, etcProps] = splitProps(props, ['size', 'block'])
	const sizeClassName = () => SIZE_CLASSES[localProps.size ?? TextControlSize.MEDIUM]
	const blockClassName = () => !localProps.block ? 'inline-block align-middle' : 'w-full block'

	return (
		<div className={`relative ${blockClassName()}`}>
			<input
				{...etcProps}
				className={`block px-4 py-0 w-full disabled:cursor-not-allowed bg-transparent text-inherit focus:outline-none box-border border border-solid rounded-full placeholder:uppercase border-primary relative ${sizeClassName()}`}
				type="search"
			/>
		</div>
	)
}
