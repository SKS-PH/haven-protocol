import {Component, For, Show} from 'solid-js'
import {UserLayout} from 'widgets/UserLayout'
import {Wallet} from '@haven/solid-moralis'
import {Work} from 'models'
import {Link} from 'solid-app-router'
import {Card} from '../../molecules/Card'
import {HavenWorkPreview} from '../../organisms/HavenWorkPreview'

type MarketplaceTemplateProps = {
	works?: Work[]
	wallet?: Wallet | null,
}

export const MarketplaceTemplate: Component<MarketplaceTemplateProps> = (props) => {
	return (
		<UserLayout
			wallet={props.wallet}
		>
			<div className="container lg:max-w-container-lg xl:max-w-container-xl 2xl:max-w-container-2xl lg:ml-0 box-border mb-16 lg:mb-0">
				<div className="px-4 lg:px-6 py-4 md:py-8">
					<Show
						when={Array.isArray(props.works)}
					>
						<div className="my-4 md:my-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
							<For
								each={props.works}
							>
								{(work) => (
									<Link
										href={`/works/${work.id}`}
									>
										<Card>
											<article className="w-full pb-full relative">
												<HavenWorkPreview
													title={work.title}
													imageUrl={work.imageUrl}
												/>
											</article>
										</Card>
									</Link>
								)}
							</For>
						</div>
					</Show>
				</div>
			</div>
		</UserLayout>
	)
}
