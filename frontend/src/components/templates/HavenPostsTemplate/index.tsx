import {Component, For} from 'solid-js'
import {UserLayout} from 'widgets/UserLayout'
import {PostContent} from 'components/organisms/PostContent'
import {Card} from 'components/molecules/Card'
import {HavenLayout, HavenSubsectionId} from 'components/organisms/HavenLayout'

export const HavenPostsTemplate: Component = () => {
	return (
		<UserLayout>
			<HavenLayout
				id="a"
				activeSubsection={HavenSubsectionId.POSTS}
			>
				<div className="max-w-screen-md mx-auto">
					<div className="px-4 lg:px-6 py-4">
						<For
							each={['1', '2', '3', '4', '5', '6']}
						>
							{(id: string) => (
								<div className="my-4">
									<Card>
										<div className="p-4 box-border">
											<PostContent
												id={id}
												createdAt={new Date()}
												post="Hello"
												title="I am releasing a new album this month"
												attachments={[]}
												tags={['album', 'release']}
												people={[]}
												comments={[]}
												likesAddresses={[]}
											/>
										</div>
									</Card>
								</div>
							)}
						</For>
					</div>
				</div>
			</HavenLayout>
		</UserLayout>
	)
}
