import {Component, For, Show} from 'solid-js'
import {Tag} from '@haven/web-components-solid'
import {Link} from 'solid-app-router'
import {Post} from 'models'
import {Icon} from 'components/molecules/Icon'
import {TimeAgo} from 'components/molecules/TimeAgo'

type HavenPostContentProps = {
	[T in keyof Omit<Post, 'haven' | 'comments'>]: Post[T]
} & {
	haven?: Post['haven']
}

export const HavenPostContent: Component<HavenPostContentProps> = (props) => {
	const link = () => props.haven ? `/havens/${props.haven?.address}/posts/${props.id}` : `/posts/${props.id}`

	return (
		<>
			<div
				className="leading-tight"
			>
				<Link
					href={link()}
					className="no-underline"
				>
					<h2
						className="normal-case m-0 inline font-semibold"
					>
						{props.title}
					</h2>
				</Link>
			</div>
			<div
				className="text-sm mt-2 flex space-x-6"
			>
				<div className="inline-flex items-center space-x-2">
					<Icon
						name="time"
						className="w-4"
					/>
					<TimeAgo
						dateTime={props.createdAt}
					/>
				</div>
				<div>
					<Tag>
						Unlocked at {props.tier}
					</Tag>
				</div>
			</div>
			<div
				className="text-fg mt-4"
			>
				<div
					className="leading-normal"
					innerHTML={props.content}
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
											href={`/posts?q=${tag}`}
										>
											<Tag>
												#{tag}
											</Tag>
										</Link>
									</div>
								)}
							</For>
						</div>
					</div>
				</Show>
			</div>
		</>
	)
}
