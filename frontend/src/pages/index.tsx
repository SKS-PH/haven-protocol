import { LandingTemplate } from 'components/templates/LandingTemplate'
import {Component} from 'solid-js'
import {useMoralisWallet} from '@haven/solid-moralis'
import * as config from 'haven.config'

const IndexPage: Component = () => {
	const [wallet] = useMoralisWallet({
		appId: config.moralis.appId,
		serverUrl: config.moralis.serverUrl,
	})

	return (
		<LandingTemplate
			wallet={wallet()}
		/>
	)
}

export default IndexPage
