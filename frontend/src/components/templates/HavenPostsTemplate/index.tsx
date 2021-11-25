import {Component, For, Show} from 'solid-js'
import {UserLayout} from 'widgets/UserLayout'
import {HavenPostContent} from 'components/organisms/HavenPostContent'
import {Card} from 'components/molecules/Card'
import {HavenLayout, HavenSubsectionId} from 'components/organisms/HavenLayout'
import Post from 'models/Post'
import {LockedPostContent} from '../../organisms/LockedPostContent'

type HavenPostsTemplateProps = {
	posts?: Post[]
}

export const HavenPostsTemplate: Component<HavenPostsTemplateProps> = (props) => {
	return (
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
														post={post.post}
														title={post.title}
														attachments={post.attachments}
														tags={post.tags}
														people={post.people}
														comments={post.comments}
														likesAddresses={post.likesAddresses}
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
	)
}
