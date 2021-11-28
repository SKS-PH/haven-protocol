import {Component, Show, For} from 'solid-js'
import {UserLayout} from 'widgets/UserLayout'
import {HavenLayout, HavenSubsectionId} from 'components/organisms/HavenLayout'
import {Wallet} from '@haven/solid-moralis'
import {Haven, Work} from 'models'
import {Card} from 'components/molecules/Card'
import {HavenWorkPreview} from 'components/organisms/HavenWorkPreview'
import { Link } from 'solid-app-router'

type HavenMarketplaceTemplateProps = {
	works?: Work[],
	haven?: Haven,
	wallet?: Wallet | null,
}

export const HavenMarketplaceTemplate: Component<HavenMarketplaceTemplateProps> = (props) => {
	return (
		<UserLayout
			wallet={props.wallet}
		>
			<HavenLayout
				haven={props.haven}
				wallet={props.wallet}
				activeSubsection={HavenSubsectionId.WORKS}
			>
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
										href={`/havens/${props.haven?.address}/works/${work.id}`}
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
			</HavenLayout>
		</UserLayout>
	)
}
