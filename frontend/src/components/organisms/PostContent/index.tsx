import {Component, For, Show} from 'solid-js'
import {Tag} from '@haven/web-components-solid'
import {Link} from 'solid-app-router'
import Post from 'models/Post'

type PostContentProps = {
	[T in keyof Post]: Post[T]
}

export const PostContent: Component<PostContentProps> = (props) => {
	return (
		<article>
			<div>
				<Link
					href={`/posts/${props.id}`}
					className="no-underline"
				>
					<h2
						className="normal-case m-0 inline"
					>
						{props.title}
					</h2>
				</Link>
			</div>
			<div
				className="text-fg mt-4"
			>
				<div>
					{props.post}
				</div>
				<Show
					when={props.tags.length > 0}
				>
					<div className="mt-8">
						<div className="-m-2">
							<For each={props.tags}>
								{(tag) => (
									<div className="p-2 inline-block align-top">
										<Link
											href={`/search?q=${tag}`}
										>
											<Tag>
												{tag}
											</Tag>
										</Link>
									</div>
								)}
							</For>
						</div>
					</div>
				</Show>
			</div>
		</article>
	)
}
