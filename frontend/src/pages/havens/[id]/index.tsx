import {Component} from 'solid-js'
import {HavenPostsTemplate} from 'components/templates/HavenPostsTemplate'
import {useMoralisWallet} from '@haven/solid-moralis'
import * as config from 'haven.config'
import {useHavenPosts} from 'hooks/content'
import {useParams} from 'solid-app-router'

const HavensHomePage: Component = () => {
	const [wallet] = useMoralisWallet({
		appId: config.moralis.appId,
		serverUrl: config.moralis.serverUrl,
	})
	const params = useParams()
	const [posts] = useHavenPosts({ address: params.id })

	return (
		<HavenPostsTemplate
			posts={posts()}
			wallet={wallet()}
		/>
	)
}

export default HavensHomePage
