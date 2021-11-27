import {Component} from 'solid-js'
import {HavenPostsTemplate} from 'components/templates/HavenPostsTemplate'
import {useMoralisWallet} from '@haven/solid-moralis'
import * as config from 'haven.config'
import {useHavenPosts} from 'hooks/posts'

const HavensHomePage: Component = () => {
	const [wallet] = useMoralisWallet({
		appId: config.moralis.appId,
		serverUrl: config.moralis.serverUrl,
	})
	const [posts] = useHavenPosts()

	return (
		<HavenPostsTemplate
			posts={posts()}
			wallet={wallet()}
		/>
	)
}

export default HavensHomePage
