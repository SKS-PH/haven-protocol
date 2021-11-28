import {Component, JSX, splitProps} from 'solid-js'
import { TextControlSize } from '../../utils/textControl'

const SIZE_CLASSES: Record<TextControlSize, string> = {
	[TextControlSize.SMALL]: 'min-h-10',
	[TextControlSize.MEDIUM]: 'min-h-12',
}

type MultilineInputProps = JSX.IntrinsicElements['textarea'] & {
	size?: TextControlSize;
	block?: boolean;
	resizeButton?: string;
}

export const MultilineInput: Component<MultilineInputProps> = (props) => {
	const [localProps, etcProps] = splitProps(props, ['size', 'block', 'resizeButton'])
	const sizeClassName = () => SIZE_CLASSES[localProps.size ?? TextControlSize.MEDIUM]
	const blockClassName = () => !localProps.block ? 'inline-block align-middle' : 'w-full block'

	return (
		<div className={`relative ${blockClassName()}`}>
			<textarea
				{...etcProps}
				className={`block py-0 px-1 w-full resize-y disabled:cursor-not-allowed bg-transparent text-inherit focus:outline-none box-border border border-solid rounded placeholder:uppercase border-primary relative ${sizeClassName()}`}
			/>
		</div>
	)
}
