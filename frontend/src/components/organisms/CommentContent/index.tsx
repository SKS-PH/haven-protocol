import {Component} from 'solid-js'
import {Link} from 'solid-app-router'
import {TimeAgo} from 'components/molecules/TimeAgo'
import {Comment} from 'models'

type CommentContentProps = {
	[T in keyof Comment]: Comment[T]
}

export const CommentContent: Component<CommentContentProps> = (c) => {
	return (
		<>
			<div className="flex h-8 items-center space-x-2">
				<Link
					href={`/users/${c.author.address}`}
					className="no-underline font-bold"
				>
					<div
						className="relative h-8 w-8 rounded-full overflow-hidden"
					>
						<div className="absolute top-0 left-0 w-full h-full bg-fg opacity-10" />
						<img src={c.author.imageUrl} alt={c.author.nickname} className="h-full w-full object-cover object-center block absolute" />
					</div>
				</Link>
				<div className="leading-none">
					<div>
						<Link
							href={`/users/${c.author.address}`}
							className="no-underline font-bold"
						>
							{c.author.nickname}
						</Link>
					</div>
					<div>
						<small>
							<TimeAgo dateTime={c.createdAt} />
						</small>
					</div>
				</div>
			</div>
			<div className="mt-4 leading-normal" innerHTML={c.content} />
		</>
	)
}
