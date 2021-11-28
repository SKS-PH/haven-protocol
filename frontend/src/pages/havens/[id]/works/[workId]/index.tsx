import {Component} from 'solid-js'
import {useMoralisWallet} from '@haven/solid-moralis'
import * as config from 'haven.config'
import {useHaven, useHavenSingleWork} from 'hooks/content'
import {useParams} from 'solid-app-router'
import {HavenSingleWorkTemplate} from 'components/templates/HavenSingleWorkTemplate'

const HavensHomePage: Component = () => {
	const [wallet] = useMoralisWallet({
		appId: config.moralis.appId,
		serverUrl: config.moralis.serverUrl,
	})
	const params = useParams()
	const [work] = useHavenSingleWork({ id: params.workId })
	const [haven] = useHaven({ address: params.id })

	return (
		<HavenSingleWorkTemplate
			work={work()}
			haven={haven()}
			wallet={wallet()}
		/>
	)
}

export default HavensHomePage
