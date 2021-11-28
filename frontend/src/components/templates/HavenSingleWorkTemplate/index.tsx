import {Component, Show} from 'solid-js'
import {UserLayout} from 'widgets/UserLayout'
import {Card} from 'components/molecules/Card'
import {HavenLayout, HavenSubsectionId} from 'components/organisms/HavenLayout'
import {Haven, Work} from 'models'
import {LockedPostContent} from 'components/organisms/LockedPostContent'
import {Wallet} from '@haven/solid-moralis'
import {HavenWorkContent} from 'components/organisms/HavenWorkContent'

type HavenSingleWorkTemplateProps = {
	work?: Work,
	haven?: Haven,
	wallet?: Wallet | null,
}

export const HavenSingleWorkTemplate: Component<HavenSingleWorkTemplateProps> = (props) => {
	return (
		<UserLayout
			wallet={props.wallet}
		>
			<HavenLayout
				wallet={props.wallet}
				haven={props.haven}
				activeSubsection={HavenSubsectionId.POSTS}
			>
				<div className="max-w-screen-md mx-auto">
					<div className="px-4 lg:px-6 py-4 md:py-8">
						<Show
							when={Boolean(props.work)}
						>
							<div className="my-4 md:my-8">
								<Card>
									<Show
										when={props.work!.tier === 'Tier 1'}
										fallback={
											<article className="p-8 box-border">
												<LockedPostContent tier={props.work!.tier} title={props.work!.title} />
											</article>
										}
									>
										<article>
											<HavenWorkContent
												haven={props.work!.haven}
												id={props.work!.id}
												title={props.work!.title}
												tier={props.work!.tier}
												imageUrl={props.work!.imageUrl}
												url={props.work!.url}
												description={props.work!.description}
											/>
										</article>
									</Show>
								</Card>
							</div>
						</Show>
					</div>
				</div>
			</HavenLayout>
		</UserLayout>
	)
}
