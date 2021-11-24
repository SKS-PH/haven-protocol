import {Component, For, Show} from 'solid-js'
import {UserLayout} from 'widgets/UserLayout'
import {PostContent} from 'components/organisms/PostContent'
import {Card} from 'components/molecules/Card'
import {HavenLayout, HavenSubsectionId} from 'components/organisms/HavenLayout'
import Post from 'models/Post'

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
					<div className="px-4 lg:px-6 py-4">
						<Show
							when={Array.isArray(props.posts)}
						>
							<For
								each={props.posts}
							>
								{(post) => (
									<div className="my-4">
										<Card>
											<div className="p-4 box-border">
												<PostContent
													id={post.id}
													createdAt={new Date(post.createdAt)}
													post={post.post}
													title={post.title}
													attachments={post.attachments}
													tags={post.tags}
													people={post.people}
													comments={post.comments}
													likesAddresses={post.likesAddresses}
												/>
											</div>
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
