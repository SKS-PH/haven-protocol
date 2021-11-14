import { Component } from 'solid-js'

export const Badge: Component = (props) => {
	return (
		<span className="inline-flex items-center justify-center align-middle rounded-full text-xs font-bold px-1 box-border min-w-6 min-h-6 bg-primary text-fg-inverse">
			{props.children}
		</span>
	)
}
