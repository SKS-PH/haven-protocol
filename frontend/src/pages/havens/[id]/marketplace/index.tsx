import {Component} from 'solid-js'
import {useMoralisWallet} from '@haven/solid-moralis'
import * as config from 'haven.config'
import {HavenMarketplaceTemplate} from 'components/templates/HavenMarketplaceTemplate'

const HavensMarketplacePage: Component = () => {
	const [wallet] = useMoralisWallet({
		appId: config.moralis.appId,
		serverUrl: config.moralis.serverUrl,
	})

	return (
		<HavenMarketplaceTemplate
			wallet={wallet()}
		/>
	)
}

export default HavensMarketplacePage
