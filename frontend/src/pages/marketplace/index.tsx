import {Component} from 'solid-js'
import {useMoralisWallet} from '@haven/solid-moralis'
import * as config from 'haven.config'
import {MarketplaceTemplate} from 'components/templates/MarketplaceTemplate'
import {useWorks} from 'hooks/content'

const MarketplacePage: Component = () => {
	const [wallet] = useMoralisWallet({
		appId: config.moralis.appId,
		serverUrl: config.moralis.serverUrl,
	})
	const [works] = useWorks()

	return (
		<MarketplaceTemplate
			wallet={wallet()}
			works={works()}
		/>
	)
}

export default MarketplacePage
