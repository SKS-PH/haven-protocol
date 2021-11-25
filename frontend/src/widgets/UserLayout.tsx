import {Component, createMemo, JSX} from 'solid-js'
import {UserLayout as UserLayoutBase} from 'components/organisms/UserLayout'
import {useLocation} from 'solid-app-router'
import {useMoralisWallet} from '@haven/solid-moralis'
import * as config from 'haven.config'
import SubmitEvent from 'types/SubmitEvent'
import {NavigationItemId} from 'utils/navigation'

export const UserLayout: Component = (props) => {
	const location = useLocation()
	const dropdown = () => new URLSearchParams(location.search).get('dropdown') ?? undefined

	const activeNavigationId = createMemo(() => {
		if (location.pathname.startsWith('/my/home')) {
			return NavigationItemId.HAVENS
		}

		if (location.pathname.startsWith('/havens')) {
			return NavigationItemId.HAVENS
		}

		if (location.pathname.startsWith('/marketplace')) {
			return NavigationItemId.MARKETPLACE
		}

		if (location.pathname.startsWith('/my/settings')) {
			return NavigationItemId.SETTINGS
		}

		return undefined
	})

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
		<UserLayoutBase
			wallet={wallet()}
			dropdown={dropdown()}
			onLogout={disconnectWallet}
			onLogin={connectWallet}
			activeNavigationId={activeNavigationId()}
		>
			{props.children}
		</UserLayoutBase>
	)
}
