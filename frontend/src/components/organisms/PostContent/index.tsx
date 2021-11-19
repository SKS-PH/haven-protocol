import {Component} from 'solid-js'
import Post from 'models/Post'

type PostContentProps = {
	[T in keyof Post]: Post[T]
}

export const PostContent: Component<PostContentProps> = (props) => {
	return (
		<article>
			<h2
				className="normal-case m-0"
			>
				{props.title}
			</h2>
			<div
				className="text-fg"
			>
				<div>
					{props.post}
				</div>
				<div>
					{props.tags}
				</div>
			</div>
		</article>
	)
}
