import { LandingTemplate } from 'components/templates/LandingTemplate'
import {Component, JSX} from 'solid-js'
import { useLocation } from 'solid-app-router'
import SubmitEvent from 'types/SubmitEvent'
import {useMoralisWallet} from '@haven/solid-moralis'
import * as config from 'haven.config'

const IndexPage: Component = () => {
	const location = useLocation()
	const searchParams = () => new URLSearchParams(location.search)
	const [wallet, walletActions] = useMoralisWallet({
		appId: config.moralis.appId,
		serverUrl: config.moralis.serverUrl,
	})

	const connectWallet: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (e) => {
		e.preventDefault()
		await walletActions.connect()
	}

	const disconnectWallet: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (e) => {
		e.preventDefault()
		await walletActions.disconnect()
	}

	return (
		<LandingTemplate
			wallet={wallet()}
			searchParams={searchParams()}
			onLogout={disconnectWallet}
			onLogin={connectWallet}
		/>
	)
}

export default IndexPage
