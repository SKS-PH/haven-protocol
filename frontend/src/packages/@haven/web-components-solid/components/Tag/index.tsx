import {Component} from 'solid-js'

export const Tag: Component = (props) => {
	return (
		<span
			className="inline-block align-middle relative"
		>
			<span
				className="absolute top-0 left-0 w-full h-full bg-current opacity-10"
			/>
			<span className="relative px-2 h-6">
				{props.children}
			</span>
		</span>
	)
}
