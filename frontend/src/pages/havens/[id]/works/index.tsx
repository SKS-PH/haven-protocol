import {Component} from 'solid-js'
import {useMoralisWallet} from '@haven/solid-moralis'
import * as config from 'haven.config'
import {HavenMarketplaceTemplate} from 'components/templates/HavenMarketplaceTemplate'
import {useParams} from 'solid-app-router'
import {useHavenWorks} from '../../../../hooks/content'

const HavensMarketplacePage: Component = () => {
	const [wallet] = useMoralisWallet({
		appId: config.moralis.appId,
		serverUrl: config.moralis.serverUrl,
	})
	const params = useParams()
	const [works] = useHavenWorks({ address: params.id })

	return (
		<HavenMarketplaceTemplate
			works={works()}
			wallet={wallet()}
		/>
	)
}

export default HavensMarketplacePage
