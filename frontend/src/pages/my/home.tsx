import {Component} from 'solid-js'
import {HomeTemplate} from 'components/templates/HomeTemplate'
import {useMoralisWallet} from '@haven/solid-moralis'
import * as config from 'haven.config'

const HomePage: Component = () => {
	const [wallet] = useMoralisWallet({
		appId: config.moralis.appId,
		serverUrl: config.moralis.serverUrl,
	})

	return (
		<HomeTemplate
			wallet={wallet()}
		/>
	)
}

export default HomePage
