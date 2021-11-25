import {Component, Show} from 'solid-js'
import {HavenHomeTemplate} from 'components/templates/HavenHomeTemplate'
import {useMoralisWallet} from '@haven/solid-moralis'
import * as config from 'haven.config'
import {Navigate} from 'solid-app-router'

const MyHomePage: Component = () => {
	const [wallet] = useMoralisWallet({
		appId: config.moralis.appId,
		serverUrl: config.moralis.serverUrl,
	})

	return (
		<>
			<Show
				when={Boolean(wallet())}
			>
				<HavenHomeTemplate />
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
