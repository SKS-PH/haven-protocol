import {Component} from 'solid-js'
import {Work} from 'models'

type HavenWorkPreviewProps = {
	[T in keyof Pick<Work, 'imageUrl' | 'title'>]: Work[T]
}

export const HavenWorkPreview: Component<HavenWorkPreviewProps> = (props) => {
	return (
		<>
			<div className="absolute top-0 left-0 w-full h-full bg-fg opacity-10" />
			<img src={props.imageUrl} alt={props.title} className="absolute top-0 left-0 w-full h-full object-cover object-center" />
		</>
	)
}
