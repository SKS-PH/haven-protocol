import {Component, For, Show} from 'solid-js'
import {Link} from 'solid-app-router'
import {Button, ButtonSize, ButtonVariant, SearchInput, TextControlSize} from '@haven/web-components-solid'
import {Icon, IconName} from 'components/molecules/Icon'
import {Wallet} from '@haven/solid-moralis'
import {Haven} from 'models'

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
		url: (id) => `/havens/${id}/works`,
		label: 'Works',
		iconName: 'works',
	},
]

type HavenLayoutProps = {
	activeSubsection?: HavenSubsectionId,
	wallet?: Wallet | null,
	haven?: Haven | null,
}

export const HavenLayout: Component<HavenLayoutProps> = (props) => {
	const containerClassName = () => props.wallet ? 'lg:ml-0' : ''

	return (
		<div className="relative">
			<Show
				when={Boolean(props.haven)}
			>
				<>
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
								'background-image': `url(${props.haven!.coverImageUrl})`
							}}
						/>
						<div className={`container lg:max-w-container-lg xl:max-w-container-xl 2xl:max-w-container-2xl ${containerClassName()} box-border relative`}>
							<div className="bg-bg md:bg-transparent px-4 mt-24 md:mt-8 lg:px-6 box-border flex md:flex-col flex-row justify-center items-center space-x-4 md:space-x-0 md:items-start">
								<div>
									<img src={props.haven!.primaryImageUrl} className="h-12 md:h-24 rounded-lg block" alt={props.haven!.name} />
								</div>
								<div className="md:text-3xl md:font-normal font-bold flex-auto h-16 flex items-center">
									{props.haven!.name}
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
														href={s.url(props.haven!.address)}
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
				</>
			</Show>
			<div className={`container lg:max-w-container-lg xl:max-w-container-xl 2xl:max-w-container-2xl ${containerClassName()} box-border mb-16 lg:mb-0`}>
				{props.children}
			</div>
		</div>
	)
}
