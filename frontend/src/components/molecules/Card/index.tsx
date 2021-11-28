import {Component} from 'solid-js'

export const Card: Component = (props) => {
	return (
		<div
			className="shadow-md rounded-md relative overflow-hidden"
			style={{
				'--color-bg-card': 'var(--color-negative-plus-3)',
				'background-color': 'var(--color-bg-card)',
			}}
		>
			<div
				className="absolute pointer-events-none bottom-0 left-0 w-full h-full dark:opacity-25 opacity-10 border border-solid box-border z-10 border-fg"
				style={{
					'border-radius': 'inherit',
				}}
			/>
			<div className="relative">
				{props.children}
			</div>
		</div>
	)
}
