import {Component} from 'solid-js'
import {Work} from 'models'

type HavenWorkPreviewProps = {
	[T in keyof Pick<Work, 'imageUrl' | 'name'>]: Work[T]
}

export const HavenWorkPreview: Component<HavenWorkPreviewProps> = (props) => {
	return (
		<>
			<img src={props.imageUrl} alt={props.name} className="absolute top-0 left-0 w-full h-full object-cover object-center" />
		</>
	)
}
