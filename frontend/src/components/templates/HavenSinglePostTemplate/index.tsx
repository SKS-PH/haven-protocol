import {Component, For, Show} from 'solid-js'
import {UserLayout} from 'widgets/UserLayout'
import {HavenPostContent} from 'components/organisms/HavenPostContent'
import {Card} from 'components/molecules/Card'
import {HavenLayout, HavenSubsectionId} from 'components/organisms/HavenLayout'
import {Haven, Post} from 'models'
import {LockedPostContent} from 'components/organisms/LockedPostContent'
import {Wallet} from '@haven/solid-moralis'
import {TimeAgo} from 'components/molecules/TimeAgo'
import {Button, ButtonSize, ButtonVariant, MultilineInput} from '@haven/web-components-solid'
import { Link } from 'solid-app-router'

type HavenSinglePostTemplateProps = {
	post?: Post,
	haven?: Haven,
	wallet?: Wallet | null,
}

export const HavenSinglePostTemplate: Component<HavenSinglePostTemplateProps> = (props) => {
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
							when={Boolean(props.post)}
						>
							<div className="my-4 md:my-8">
								<Card>
									<Show
										when={props.post!.tier === 'Tier 1'}
										fallback={
											<article className="p-8 box-border">
												<LockedPostContent tier={props.post!.tier} title={props.post!.title} />
											</article>
										}
									>
										<article className="p-4 box-border">
											<HavenPostContent
												haven={props.post!.haven}
												id={props.post!.id}
												createdAt={props.post!.createdAt}
												content={props.post!.content}
												title={props.post!.title}
												works={props.post!.works}
												tags={props.post!.tags}
												likes={props.post!.likes}
												tier={props.post!.tier}
											/>
											<hr
												className="h-0.25 border-0 my-8 p-0 bg-current opacity-25"
											/>
											<Show
												when={Array.isArray(props.post!.comments)}
											>
												<div>
													<div className="mb-8">
														<h3 className="m-0">
															Comments
														</h3>
														<p className="m-0">
															Markdown is supported.
														</p>
													</div>
													<form>
														<MultilineInput
															block
															rows={10}
														/>
														<div className="text-right mt-4">
															<Button
																size={ButtonSize.SMALL}
																variant={ButtonVariant.FILLED}
															>
																Post
															</Button>
														</div>
													</form>
													<For
														each={props.post!.comments}
													>
														{(c) => (
															<div className="my-8">
																<div className="flex h-8 items-center space-x-4">
																	<Link
																		href={`/users/${c.author.address}`}
																		className="no-underline font-bold"
																	>
																		<img src={c.author.imageUrl} alt={c.author.nickname} className="h-8 w-8 object-cover object-center rounded-full block" />
																	</Link>
																	<div className="leading-none">
																		<div>
																			<Link
																				href={`/users/${c.author.address}`}
																				className="no-underline font-bold"
																			>
																				{c.author.nickname}
																			</Link>
																		</div>
																		<div>
																			<small>
																				<TimeAgo dateTime={c.createdAt} />
																			</small>
																		</div>
																	</div>
																</div>
																<div className="mt-4" innerHTML={c.content} />
															</div>
														)}
													</For>
												</div>
											</Show>
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
