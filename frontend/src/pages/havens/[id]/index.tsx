import {Component, Show} from 'solid-js'
import {HavenPostsTemplate} from 'components/templates/HavenPostsTemplate'
import {useMoralisWallet} from '@haven/solid-moralis'
import * as config from 'haven.config'
import {Navigate} from 'solid-app-router'
import {useHavenPosts} from 'hooks/posts'

const HavensHomePage: Component = () => {
	const [wallet] = useMoralisWallet({
		appId: config.moralis.appId,
		serverUrl: config.moralis.serverUrl,
	})
	const [posts] = useHavenPosts()

	return (
		<>
			<Show
				when={Boolean(wallet())}
			>
				<HavenPostsTemplate
					posts={posts()}
				/>
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

export default HavensHomePage
