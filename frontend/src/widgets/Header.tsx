import {Header as HeaderBase} from 'components/organisms/Header'
import {useLocation} from 'solid-app-router'
import {useMoralisWallet} from '@haven/solid-moralis'
import * as config from 'haven.config'
import {Component, JSX} from 'solid-js'
import SubmitEvent from 'types/SubmitEvent'

export const Header: Component = () => {
	const location = useLocation()
	const dropdown = () => new URLSearchParams(location.search).get('dropdown') ?? undefined

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
		<HeaderBase
			wallet={wallet()}
			dropdown={dropdown()}
			onLogout={disconnectWallet}
			onLogin={connectWallet}
		/>
	)
}
