import {Component, For, Show} from 'solid-js'
import {UserLayout} from 'widgets/UserLayout'
import {HavenPostContent} from 'components/organisms/HavenPostContent'
import {Card} from 'components/molecules/Card'
import {HavenLayout, HavenSubsectionId} from 'components/organisms/HavenLayout'
import {Post} from 'models'
import {LockedPostContent} from 'components/organisms/LockedPostContent'
import {Wallet} from '@haven/solid-moralis'

type HavenPostsTemplateProps = {
	posts?: Post[],
	wallet?: Wallet | null,
}

export const HavenPostsTemplate: Component<HavenPostsTemplateProps> = (props) => {
	return (
		<>
			<Show
				when={props.wallet === null}
			>
				<HavenLayout
					id="a"
					activeSubsection={HavenSubsectionId.POSTS}
				>
					<div className="max-w-screen-md mx-auto">
						<div className="px-4 lg:px-6 py-4 md:py-8">
							<Show
								when={Array.isArray(props.posts)}
							>
								<For
									each={props.posts}
								>
									{(post) => (
										<div className="my-4 md:my-8">
											<Card>
												<Show
													when={post.tier === 'Tier 1'}
													fallback={
														<article className="p-8 box-border">
															<LockedPostContent tier={post.tier} title={post.title} />
														</article>
													}
												>
													<article className="p-4 box-border">
														<HavenPostContent
															id={post.id}
															createdAt={new Date(post.createdAt)}
															content={post.content}
															title={post.title}
															works={post.works}
															tags={post.tags}
															comments={post.comments}
															likes={post.likes}
															tier={post.tier}
														/>
													</article>
												</Show>
											</Card>
										</div>
									)}
								</For>
							</Show>
						</div>
					</div>
				</HavenLayout>
			</Show>
			<Show
				when={Boolean(props.wallet)}
			>
				<UserLayout>
					<HavenLayout
						id="a"
						activeSubsection={HavenSubsectionId.POSTS}
					>
						<div className="max-w-screen-md mx-auto">
							<div className="px-4 lg:px-6 py-4 md:py-8">
								<Show
									when={Array.isArray(props.posts)}
								>
									<For
										each={props.posts}
									>
										{(post) => (
											<div className="my-4 md:my-8">
												<Card>
													<Show
														when={post.tier === 'Tier 1'}
														fallback={
															<article className="p-8 box-border">
																<LockedPostContent tier={post.tier} title={post.title} />
															</article>
														}
													>
														<article className="p-4 box-border">
															<HavenPostContent
																id={post.id}
																createdAt={new Date(post.createdAt)}
																content={post.content}
																title={post.title}
																works={post.works}
																tags={post.tags}
																comments={post.comments}
																likes={post.likes}
																tier={post.tier}
															/>
														</article>
													</Show>
												</Card>
											</div>
										)}
									</For>
								</Show>
							</div>
						</div>
					</HavenLayout>
				</UserLayout>
			</Show>
		</>
	)
}
