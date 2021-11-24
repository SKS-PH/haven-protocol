import {Component, For} from 'solid-js'
import {Link} from 'solid-app-router'
import {Button, ButtonSize, ButtonVariant, SearchInput, TextControlSize} from '@haven/web-components-solid'
import {Icon, IconName} from 'components/molecules/Icon'

export enum HavenSubsectionId {
	POSTS = 'posts',
	MARKETPLACE = 'marketplace',
}

type HavenSubsection = {
	id: HavenSubsectionId,
	url: (havenId: string) => string,
	label: string,
	iconName: IconName,
}

const HAVEN_SUBSECTIONS: HavenSubsection[] = [
	{
		id: HavenSubsectionId.POSTS,
		url: (id) => `/havens/${id}`,
		label: 'Posts',
		iconName: 'posts',
	},
	{
		id: HavenSubsectionId.MARKETPLACE,
		url: (id) => `/havens/${id}/marketplace`,
		label: 'Marketplace',
		iconName: 'marketplace',
	},
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
						<div className="flex justify-between items-center box-border h-16 lg:space-x-8 relative">
							<div className="md:text-3xl md:font-normal font-bold flex-auto">Haven Name</div>
							<div className="h-full flex items-center space-x-6 ml-4 lg:ml-0">
								<For each={HAVEN_SUBSECTIONS}>
									{(s) => {
										const activeClassName = (subsection: HavenSubsection) => subsection.id === props.activeSubsection && 'font-bold'
										return (
											<Link
												href={s.url(props.id)}
												className={`relative h-full space-x-2 flex items-center no-underline ${activeClassName(s)}`}
											>
												<span>
													<Icon name={s.iconName} className="w-6 h-6 block" />
												</span>
												<span
													className="sr-only lg:not-sr-only"
												>
													{s.label}
												</span>
											</Link>
										)
									}}
								</For>
							</div>
							<form
								className="w-10 ml-6 lg:ml-0 flex bg-bg z-10 items-center focus-within:absolute focus-within:top-0 focus-within:left-0 focus-within:w-full focus-within:h-full focus-within:ml-0 lg:focus-within:static lg:focus-within:w-auto lg:focus-within:h-auto lg:w-auto"
							>
								<div className="flex-auto">
									<SearchInput
										size={TextControlSize.SMALL}
										name="q"
										placeholder="Search posts, attachments..."
										block
										resizeButton="lg"
									/>
								</div>
							</form>
							<form
								className="ml-6 lg:ml-0 w-10 lg:w-auto"
							>
								{/*<Select*/}
								{/*	name="sort"*/}
								{/*	size={TextControlSize.SMALL}*/}
								{/*	block*/}
								{/*	resizeButton="lg"*/}
								{/*	resizeButtonIcon={*/}
								{/*		<Icon*/}
								{/*			name="time"*/}
								{/*			className="w-6 block"*/}
								{/*		/>*/}
								{/*	}*/}
								{/*	options={[*/}
								{/*		{*/}
								{/*			label: 'Recent',*/}
								{/*			value: 'recent',*/}
								{/*		},*/}
								{/*		{*/}
								{/*			label: 'Popular',*/}
								{/*			value: 'popular',*/}
								{/*		}*/}
								{/*	]}*/}
								{/*/>*/}
								<Button
									size={ButtonSize.SMALL}
									variant={ButtonVariant.FILLED}
									compact="md"
									block
								>
									<div className="flex items-center space-x-4">
										<span>
											<Icon name="subscribe" className="w-6" />
										</span>
										<span
											className="sr-only lg:not-sr-only"
										>
											Subscribe
										</span>
									</div>
								</Button>
							</form>
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
