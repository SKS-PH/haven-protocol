import {Component, Show} from 'solid-js'
import {useMoralisWallet} from '@haven/solid-moralis'
import * as config from 'haven.config'
import {Navigate} from 'solid-app-router'
import {HavenSettingsTemplate} from 'components/templates/HavenSettingsTemplate'

const MySettingsPage: Component = () => {
	const [wallet] = useMoralisWallet({
		appId: config.moralis.appId,
		serverUrl: config.moralis.serverUrl,
	})

	return (
		<>
			<Show
				when={Boolean(wallet())}
			>
				<HavenSettingsTemplate />
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

export default MySettingsPage
