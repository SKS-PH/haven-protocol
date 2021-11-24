import {Component, For} from 'solid-js'
import {Link} from 'solid-app-router'
import {Select, TextControlSize} from '@haven/web-components-solid'

export enum HavenSubsectionId {
	POSTS = 'posts',
	MARKETPLACE = 'marketplace',
}

type HavenSubsection = {
	id: HavenSubsectionId,
	url: (havenId: string) => string,
	label: string,
}

const HAVEN_SUBSECTIONS: HavenSubsection[] = [
	{
		id: HavenSubsectionId.POSTS,
		url: (id) => `/havens/${id}`,
		label: 'Posts',
	},
	{
		id: HavenSubsectionId.MARKETPLACE,
		url: (id) => `/havens/${id}/marketplace`,
		label: 'Marketplace',
	}
]

type HavenLayoutProps = {
	id: string,
	activeSubsection?: HavenSubsectionId,
}

export const HavenLayout: Component<HavenLayoutProps> = (props) => {

	return (
		<div>
			<div className="pt-8 box-border lg:-mb-4 relative z-20">
				<div className="container lg:max-w-container-lg xl:max-w-container-xl 2xl:max-w-container-2xl lg:ml-0 box-border">
					<div className="px-4 lg:px-6 box-border flex items-center">
						<img src="http://placehold.it/250" className="h-24 rounded-full" alt="Haven Name" />
					</div>
				</div>
			</div>
			<div className="bg-bg sticky top-header left-0 lg:pt-2 z-10">
				<div className="absolute pointer-events-none bottom-0 left-0 w-full h-0.25 dark:opacity-25 opacity-10 bg-current" />
				<div className="container lg:max-w-container-lg xl:max-w-container-xl 2xl:max-w-container-2xl lg:ml-0 box-border">
					<div className="px-4 lg:px-6 box-border">
						<div className="flex justify-between items-center box-border h-16 space-x-8">
							<div className="md:text-3xl font-light flex-auto">Haven Name</div>
							<div className="h-full flex items-center space-x-4">
								<For each={HAVEN_SUBSECTIONS}>
									{(s) => {
										const activeClassName = (subsection: HavenSubsection) => subsection.id === props.activeSubsection && 'font-bold'
										return (
											<Link
												href={s.url(props.id)}
												className={`relative h-full flex items-center no-underline ${activeClassName(s)}`}
											>
												{s.label}
											</Link>
										)
									}}
								</For>
							</div>
							<div>
								<Select
									size={TextControlSize.SMALL}
									block
									options={[
										{
											label: 'Recent',
											value: 'recent',
										},
										{
											label: 'Popular',
											value: 'popular',
										}
									]}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div className="container lg:max-w-container-lg xl:max-w-container-xl 2xl:max-w-container-2xl lg:ml-0 box-border mb-16 lg:mb-0">
					{props.children}
				</div>
			</div>
		</div>
	)
}
