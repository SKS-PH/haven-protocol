import {Component, splitProps} from 'solid-js'
import {Work} from 'models'
import {Link} from 'solid-app-router'
import {ButtonSize, LinkButton} from '@haven/web-components-solid'
import {HavenWorkContent} from 'components/organisms/HavenWorkContent'

type WorkContentProps = {
	[T in keyof Work]: Work[T]
}

export const WorkContent: Component<WorkContentProps> = (props) => {
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
						<span
							className="block w-12 h-12 rounded-md overflow-hidden relative"
						>
							<span className="absolute top-0 left-0 w-full h-full bg-current opacity-25" />
							<img
								src={localProps.haven.primaryImageUrl}
								alt={localProps.haven.name}
								className="block w-full h-full object-cover object-center relative"
							/>
						</span>
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
						href={`/havens/${localProps.haven.address}/works`}
						size={ButtonSize.SMALL}
					>
						View Works
					</LinkButton>
				</div>
			</div>
			<hr
				className="h-0.25 border-0 my-4 p-0 bg-current opacity-25"
			/>
			<HavenWorkContent
				{...etcProps}
				haven={localProps.haven}
			/>
		</>
	)
}
