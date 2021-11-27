import {Component} from 'solid-js'
import {HavenSinglePostTemplate} from 'components/templates/HavenSinglePostTemplate'
import {useMoralisWallet} from '@haven/solid-moralis'
import * as config from 'haven.config'
import {useHavenSinglePost} from 'hooks/content'
import {useParams} from 'solid-app-router'

const HavensHomePage: Component = () => {
	const [wallet] = useMoralisWallet({
		appId: config.moralis.appId,
		serverUrl: config.moralis.serverUrl,
	})
	const params = useParams()
	const [post] = useHavenSinglePost({ address: params.id, id: params.postId })

	return (
		<HavenSinglePostTemplate
			post={post()}
			wallet={wallet()}
		/>
	)
}

export default HavensHomePage
