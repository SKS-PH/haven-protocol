import {Component, For, Show} from 'solid-js'
import {UserLayout} from 'widgets/UserLayout'
import {Post} from 'models'
import {Card} from 'components/molecules/Card'
import {PostContent} from 'components/organisms/PostContent'

type HavenHomeTemplateProps = {
	posts?: Post[]
}

export const HavenHomeTemplate: Component<HavenHomeTemplateProps> = (props) => {
	return (
		<UserLayout>
			<div className="container lg:max-w-container-lg xl:max-w-container-xl 2xl:max-w-container-2xl lg:ml-0 box-border mb-16 lg:mb-0">
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
											<article className="p-4 box-border">
												<PostContent
													id={post.id}
													createdAt={new Date(post.createdAt)}
													content={post.content}
													title={post.title}
													works={post.works}
													tags={post.tags}
													comments={post.comments}
													likes={post.likes}
													tier={post.tier}
													haven={post.haven}
												/>
											</article>
										</Card>
									</div>
								)}
							</For>
						</Show>
					</div>
				</div>
			</div>
		</UserLayout>
	)
}
