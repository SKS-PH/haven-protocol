import {Component, Show} from 'solid-js'
import {HavenHomeTemplate} from 'components/templates/HavenHomeTemplate'
import {useMoralisWallet} from '@haven/solid-moralis'
import * as config from 'haven.config'
import {Navigate, useLocation} from 'solid-app-router'
import {useHomePosts} from 'hooks/content'
import {Button, ButtonVariant, MultilineInput, TextInput} from '@haven/web-components-solid'

const MyHomePage: Component = () => {
	const [wallet] = useMoralisWallet({
		appId: config.moralis.appId,
		serverUrl: config.moralis.serverUrl,
	})
	const [posts] = useHomePosts({ userAddress: wallet()?.get('ethAddress') })
	const location = useLocation()
	const modal = () => new URLSearchParams(location.search).get('modal') ?? undefined

	return (
		<>
			<Show
				when={Boolean(wallet())}
			>
				<HavenHomeTemplate
					wallet={wallet()}
					posts={posts()}
				/>
				<Show
					when={modal() === 'create-haven'}
				>
					<div className="fixed top-0 left-0 w-full h-full z-40">
						<div
							className="absolute top-0 left-0 w-full h-full opacity-75"
							style={{
								background: 'black',
							}}
						/>
						<div className="relative">
							<div className="max-w-screen-md mx-auto">
								<div className="px-4 my-8">
									<div className="bg-bg shadow-lg rounded overflow-hidden">
										<form className="contents">
											<input
												type="hidden"
												name="owner.address"
												value={wallet()!.get('ethAddress')}
											/>

											<div className="flex h-12 items-center px-4 md:px-6 justify-between">
												<h2>
													Create Haven
												</h2>
											</div>
											<div className="px-4 md:px-6 my-8">
												<div className="grid gap-4">
													<div>
														<TextInput
															name="name"
															block
															placeholder="Name"
														/>
													</div>
													<div>
														<MultilineInput
															name="description"
															block
															placeholder="Description"
														/>
														<div>
															Markdown is supported.
														</div>
													</div>
												</div>

											</div>
											<div className="flex h-20 items-center px-4 md:px-6 justify-end space-x-4">
												<div>
													<Button
														variant={ButtonVariant.FILLED}
														type="submit"
													>
														Submit
													</Button>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Show>
			</Show>
			<Show
				when={wallet() === null}
			>
				<Navigate
					href="/"
				/>
			</Show>
		</>
	)
}

export default MyHomePage
