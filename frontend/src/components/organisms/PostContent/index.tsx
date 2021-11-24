import {Component, For, Show} from 'solid-js'
import {Tag} from '@haven/web-components-solid'
import {Link} from 'solid-app-router'
import Post from 'models/Post'
import { format } from 'timeago.js'
import {Icon} from '../../molecules/Icon'

type PostContentProps = {
	[T in keyof Post]: Post[T]
}

export const PostContent: Component<PostContentProps> = (props) => {
	return (
		<article>
			<div
				className="leading-tight"
			>
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
				className="text-sm mt-2"
			>
				<div className="inline-flex items-center space-x-2">
					<Icon
						name="time"
						className="w-4"
					/>
					<time
						dateTime={props.createdAt.toISOString()}
					>
						{format(props.createdAt)}
					</time>
				</div>
			</div>
			<div
				className="text-fg mt-4"
			>
				<div
					className="leading-normal"
					innerHTML={props.post}
				/>
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