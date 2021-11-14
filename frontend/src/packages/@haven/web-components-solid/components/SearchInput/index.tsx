import { Component, JSX } from "solid-js";
import { TextControlSize } from "../../utils/textControl";

const SIZE_CLASSES: Record<TextControlSize, string> = {
	[TextControlSize.SMALL]: "h-10 pr-10",
	[TextControlSize.MEDIUM]: "h-12 pr-12",
};

const INDICATOR_CLASSES: Record<TextControlSize, string> = {
	[TextControlSize.SMALL]: "w-10",
	[TextControlSize.MEDIUM]: "w-12",
};

type SearchInputProps = JSX.IntrinsicElements["input"] & {
	size?: TextControlSize;
	block?: boolean;
};

export const SearchInput: Component<SearchInputProps> = (props) => {
	const sizeClassNames = SIZE_CLASSES[props.size ?? TextControlSize.MEDIUM];
	const indicatorClassNames = INDICATOR_CLASSES[props.size ?? TextControlSize.MEDIUM];

	return (
		<div className={`relative ${!props.block && "inline-block align-middle"}`}>
			<input
				{...props}
				className={`w-full disabled:cursor-not-allowed bg-transparent text-inherit focus:outline-none box-border border border-solid rounded-full pl-4 placeholder:uppercase border-primary ${sizeClassNames} relative`}
				type="search"
				placeholder={props.placeholder}
			/>
			<div
				className={`absolute top-0 right-0 h-full pointer-events-none flex justify-center items-center ${indicatorClassNames}`}
			>
				<svg className="w-6" viewBox="0 0 24 24" fill="none">
					<path d="M15.5 15.5L19 19" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
					<path
						d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
		</div>
	);
};
