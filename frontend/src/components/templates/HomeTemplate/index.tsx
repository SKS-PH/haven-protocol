import {Component, Show, For} from 'solid-js'
import {Link, Navigate} from 'solid-app-router'
import {UserLayout} from 'widgets/UserLayout'
import {Wallet} from '@haven/solid-moralis'
import {Select, TextControlSize} from '@haven/web-components-solid'
import {PostContent} from 'components/organisms/PostContent'
import {Card} from 'components/molecules/Card'

type HomeTemplateProps = {
	wallet?: Wallet | null
}

export const HomeTemplate: Component<HomeTemplateProps> = (props) => {
	return (
		<>
			<Show
				when={Boolean(props.wallet)}
			>
				<UserLayout>
					<div className="bg-bg">
						<div className="pt-8 box-border lg:-mb-4 relative z-20">
							<div className="container lg:w-full lg:max-w-none box-border flex items-center">
								<img src="http://placehold.it/250" className="h-24 rounded-full" alt="Haven Name" />
							</div>
						</div>
						<div className="bg-bg sticky top-header left-0 lg:pt-2 z-10">
							<div className="absolute pointer-events-none bottom-0 left-0 w-full h-0.25 dark:opacity-25 opacity-10 bg-current" />
							<div className="container lg:max-w-container-lg xl:max-w-container-xl 2xl:max-w-container-2xl lg:ml-0 box-border">
								<div className="flex justify-between items-center box-border h-16 space-x-8">
									<div className="md:text-3xl font-light flex-auto">Haven Name</div>
									<div className="h-full flex items-center space-x-4">
										<Link
											href="/havens/a/"
											className="relative h-full flex items-center no-underline font-bold"
										>
											Posts
										</Link>
										<Link
											href="/havens/a/marketplace"
											className="relative h-full flex items-center no-underline"
										>
											Marketplace
										</Link>
									</div>
									<div>
										<Select
											size={TextControlSize.SMALL}
											block
											options={[
												{
													label: 'Recent',
													value: 'recent',
												},
												{
													label: 'Popular',
													value: 'popular',
												}
											]}
										/>
									</div>
								</div>
							</div>
						</div>
						<div>
							<div className="container lg:max-w-container-lg xl:max-w-container-xl 2xl:max-w-container-2xl lg:ml-0 box-border">
								<div className="my-8">
									<For
										each={['1', '2', '3', '4', '5']}
									>
										{(id: string) => (
											<div className="my-4">
												<Link
													href={`posts/${id}`}
													className="no-underline"
												>
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
												</Link>
											</div>
										)}
									</For>
								</div>
							</div>
						</div>
					</div>
				</UserLayout>
			</Show>
			<Show
				when={props.wallet === null}
			>
				<Navigate
					href="/"
				/>
			</Show>
		</>
	)
}
