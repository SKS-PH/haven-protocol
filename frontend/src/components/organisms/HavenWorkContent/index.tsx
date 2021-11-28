import {Component, Show} from 'solid-js'
import {Link} from 'solid-app-router'
import {Work} from 'models'
import {ButtonVariant, LinkButton, Tag} from '@haven/web-components-solid'

type HavenWorkContentProps = {
	[T in keyof Omit<Work, 'haven'>]: Work[T]
} & {
	haven?: Work['haven']
}

export const HavenWorkContent: Component<HavenWorkContentProps> = (props) => {
	return (
		<Show
			when={Boolean(props.haven)}
		>
			<div className="lg:grid lg:grid-cols-7">
				<div className="h-48 lg:h-auto lg:col-span-3 relative">
					<img src={props.imageUrl} alt={props.title} className="absolute top-0 left-0 w-full h-full object-cover object-right-bottom block" />
				</div>
				<div className="col-span-4 p-4 lg:p-8 box-border flex flex-col space-y-8">
					<div className="text-sm">
						<Tag>
							Unlocked at {props.tier}
						</Tag>
					</div>
					<div className="flex items-center lg:items-start lg:flex-col flex-auto">
						<div>
							<Link
								href={`/havens/${props.haven?.address}`}
								className="no-underline font-bold"
							>
								<span
									className="inline-block align-top w-24 h-24 rounded-md overflow-hidden relative"
								>
									<span className="absolute top-0 left-0 w-full h-full bg-current opacity-25" />
									<img
										src={props.haven?.primaryImageUrl}
										alt={props.haven?.name}
										className="block w-full h-full object-cover object-center relative"
									/>
								</span>
							</Link>
						</div>
						<div
							className="leading-tight flex-auto lg:mt-4 ml-4 lg:ml-0"
						>
							<h2
								className="normal-case m-0 inline font-semibold"
							>
								{props.title}
							</h2>
							<div className="mt-4">
								<div className="h-full inline-flex align-top items-center space-x-4">
									<div>
										<Link
											href={`/havens/${props.haven?.address}`}
											className="no-underline font-bold"
										>
											<span>
												{props.haven?.name}
											</span>
										</Link>
										<br />
										<Link
											href={`/havens/${props.haven?.address}`}
											className="no-underline font-medium"
										>
											<small>
												{props.haven?.address}
											</small>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-4">
						<LinkButton
							variant={ButtonVariant.FILLED}
							block
							href={props.url}
						>
							Download
						</LinkButton>
					</div>
				</div>
			</div>
		</Show>
	)
}
