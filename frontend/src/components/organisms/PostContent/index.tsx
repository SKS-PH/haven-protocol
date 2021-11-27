import {Component, splitProps} from 'solid-js'
import {Post} from 'models'
import {HavenPostContent} from 'components/organisms/HavenPostContent'
import {Link} from 'solid-app-router'
import {ButtonSize, LinkButton} from '@haven/web-components-solid'

type PostContentProps = {
	[T in keyof Post]: Post[T]
}

export const PostContent: Component<PostContentProps> = (props) => {
	const [localProps, etcProps] = splitProps(props, ['haven'])
	return (
		<>
			<div
				className="space-y-4 md:space-y-0 md:flex items-center justify-between"
			>
				<div className="h-full inline-flex align-top items-center space-x-4">
					<Link
						href={`/havens/${localProps.haven.address}`}
						className="no-underline font-bold"
					>
						<img
							src="http://placehold.it/48"
							alt={localProps.haven.name}
							className="rounded-full block"
						/>
					</Link>
					<div>
						<Link
							href={`/havens/${localProps.haven.address}`}
							className="no-underline font-bold"
						>
							<span>
								{localProps.haven.name}
							</span>
						</Link>
						<br />
						<Link
							href={`/havens/${localProps.haven.address}`}
							className="no-underline font-medium"
						>
							<small>
								{localProps.haven.address}
							</small>
						</Link>
					</div>
				</div>
				<div className="text-right">
					<LinkButton
						href={`/havens/${localProps.haven.address}/marketplace`}
						size={ButtonSize.SMALL}
					>
						View Marketplace
					</LinkButton>
				</div>
			</div>
			<hr
				className="h-0.25 border-0 my-4 p-0 bg-current opacity-25"
			/>
			<HavenPostContent
				{...etcProps}
			/>
		</>
	)
}
