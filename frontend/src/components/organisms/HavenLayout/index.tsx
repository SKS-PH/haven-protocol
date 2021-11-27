import {Component, For} from 'solid-js'
import {Link} from 'solid-app-router'
import {Button, ButtonSize, ButtonVariant, SearchInput, TextControlSize} from '@haven/web-components-solid'
import {Icon, IconName} from 'components/molecules/Icon'
import {Wallet} from '@haven/solid-moralis'

export enum HavenSubsectionId {
	POSTS = 'posts',
	WORKS = 'marketplace',
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
		id: HavenSubsectionId.WORKS,
		url: (id) => `/havens/${id}/marketplace`,
		label: 'Works',
		iconName: 'works',
	},
]

type HavenLayoutProps = {
	id: string,
	activeSubsection?: HavenSubsectionId,
	wallet?: Wallet | null,
}

export const HavenLayout: Component<HavenLayoutProps> = (props) => {
	const containerClassName = () => props.wallet ? 'lg:ml-0' : ''

	return (
		<div className="relative">
			<div
				className="sticky top-header md:-top-0 z-20 pointer-events-none"
			>
				<div
					className="absolute -top-24 md:-top-8 left-0 w-full h-24 md:h-48 bg-no-repeat bg-cover bg-bottom"
					style={{
						'--color-bg-sidebar': 'var(--color-negative-plus-2)',
						'background-color': 'var(--color-bg-sidebar)',
					}}
				/>
				<div
					className="absolute -top-24 md:-top-8 left-0 w-full h-24 md:h-48 bg-no-repeat bg-cover bg-bottom opacity-50"
					style={{
						'background-image': 'url(http://picsum.photos/240)'
					}}
				/>
				<div className={`container lg:max-w-container-lg xl:max-w-container-xl 2xl:max-w-container-2xl ${containerClassName()} box-border relative`}>
					<div className="bg-bg md:bg-transparent px-4 mt-24 md:mt-8 lg:px-6 box-border flex md:flex-col flex-row justify-center items-center space-x-4 md:space-x-0 md:items-start">
						<div>
							<img src="http://picsum.photos/250" className="h-12 md:h-24 rounded-full block" alt="Seventh Haven" />
						</div>
						<div className="md:text-3xl md:font-normal font-bold flex-auto h-16 flex items-center">
							Seventh Haven
						</div>
					</div>
				</div>
			</div>
			<div className="sticky top-header z-20">
				<div className="absolute pointer-events-none bottom-0 left-0 w-full h-0.25 dark:opacity-25 opacity-10 bg-current z-30" />

				<div className={`container lg:max-w-container-lg xl:max-w-container-xl 2xl:max-w-container-2xl box-border ${containerClassName()}`}>
					<div className="px-4 lg:px-6 box-border">
						<div className="flex ml-auto justify-between items-center box-border h-16 2xl:space-x-8 relative">
							<div className="md:flex-auto w-12 md:w-auto" />
							<div className="bg-bg md:bg-transparent h-full flex items-center space-x-6 ml-4 2xl:ml-0 relative z-20 pointer-events-auto">
								<For each={HAVEN_SUBSECTIONS}>
									{(s) => {
										const activeClassName = (subsection: HavenSubsection) => (
											subsection.id === props.activeSubsection
												? 'font-bold border-current'
												: 'border-transparent'
										)
										return (
											<Link
												href={s.url(props.id)}
												className={`box-border relative h-full space-x-2 flex items-center no-underline border-solid border-t-0 border-l-0 border-r-0 border-b-4 ${activeClassName(s)}`}
											>
												<span>
													<Icon name={s.iconName} className="w-6 h-6 block" />
												</span>
												<span
													className="sr-only 2xl:not-sr-only"
												>
													{s.label}
												</span>
											</Link>
										)
									}}
								</For>
							</div>
							<form
								className="bg-bg md:bg-transparent pointer-events-auto h-full w-10 pl-6 2xl:pl-0 flex z-20 items-center focus-within:absolute focus-within:top-0 focus-within:left-0 focus-within:w-full focus-within:h-full focus-within:pl-0 2xl:focus-within:static 2xl:focus-within:w-auto 2xl:focus-within:h-auto 2xl:w-auto"
							>
								<div className="flex-auto w-full rounded-full md:focus-within:bg-bg">
									<SearchInput
										size={TextControlSize.SMALL}
										name="q"
										placeholder="Search posts, attachments..."
										block
										resizeButton="2xl"
									/>
								</div>
							</form>
							<form
								className="bg-bg md:bg-transparent pl-6 2xl:pl-0 w-20 h-full flex items-center xl:w-auto pointer-events-auto flex-auto md:flex-initial"
							>
								{/*<Select*/}
								{/*	name="sort"*/}
								{/*	size={TextControlSize.SMALL}*/}
								{/*	block*/}
								{/*	resizeButton="2xl"*/}
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
									compact="xl"
									block
								>
									<div className="flex items-center space-x-4">
										<span>
											<Icon name="subscribe" className="w-6" />
										</span>
										<span
											className="sr-only xl:not-sr-only"
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

			<div className={`container lg:max-w-container-lg xl:max-w-container-xl 2xl:max-w-container-2xl ${containerClassName()} box-border mb-16 lg:mb-0`}>
				{props.children}
			</div>
		</div>
	)
}
