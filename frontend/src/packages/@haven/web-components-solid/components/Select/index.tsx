import {Component, JSX, Show, For, splitProps} from 'solid-js'
import { TextControlSize } from '../../utils/textControl'

const SIZE_CLASSES: Record<TextControlSize, string> = {
	[TextControlSize.SMALL]: 'h-10 pr-10',
	[TextControlSize.MEDIUM]: 'h-12 pr-12',
}

const INDICATOR_CLASSES: Record<TextControlSize, string> = {
	[TextControlSize.SMALL]: 'w-10',
	[TextControlSize.MEDIUM]: 'w-12',
}

type Option = {
	label: string;
	options?: Option[];
	value?: string;
}

export type SelectProps = JSX.IntrinsicElements['select'] & {
	size?: TextControlSize;
	block?: boolean;
	options?: Option[];
}

const RenderOptions: Component<Option> = (props) => {
	return (
		<Show when={(props.options?.length ?? 0) > 0} fallback={<option value={props.value}>{props.label}</option>}>
			<optgroup label={props.label}>
				<RenderOptions label={props.label}>{props.children}</RenderOptions>
			</optgroup>
		</Show>
	)
}

export const Select: Component<SelectProps> = (props) => {
	const [localProps, etcProps] = splitProps(props, ['size', 'block', 'options'])
	const indicatorClassName = () => INDICATOR_CLASSES[localProps.size ?? TextControlSize.MEDIUM]
	const sizeClassName = () => SIZE_CLASSES[localProps.size ?? TextControlSize.MEDIUM]
	const blockClassName = () => !localProps.block ? 'inline-block align-middle' : 'block'

	return (
		<span className={`relative ${blockClassName()}`}>
			<select
				{...etcProps}
				className={`w-full bg-bg text-inherit cursor-pointer disabled:cursor-not-allowed appearance-none focus:outline-none box-border border border-solid rounded-full pl-4 placeholder:uppercase border-primary relative ${sizeClassName()}`}
			>
				<For each={localProps.options} fallback={<></>}>
					{(child: Option) => <RenderOptions label={child.label} options={child.options} value={child.value} />}
				</For>
			</select>
			<span
				className={`absolute top-0 right-0 h-full pointer-events-none flex justify-center items-center ${indicatorClassName()}`}
			>
				<svg className="w-6" stroke="currentColor" viewBox="0 0 24 24" fill="none">
					<polyline points="6 9 12 15 18 9" />
				</svg>
			</span>
		</span>
	)
}
