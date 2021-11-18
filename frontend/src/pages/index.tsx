import { LandingTemplate } from 'components/templates/LandingTemplate'
import {Component, createResource} from 'solid-js'
import {WalletServiceImpl} from 'services/WalletService'
import { Wallet } from 'types/Moralis'
import { useLocation } from 'solid-app-router'

const IndexPage: Component = () => {
	const [wallet, walletActions] = createResource<Wallet | undefined>(async () => {
		const walletService = new WalletServiceImpl()
		await walletService.initialize()
		return walletService.getConnectedWallet()
	})

	const location = useLocation()

	const searchParams = () => {
		return new URLSearchParams(location.search)
	}

	const connectWallet = async (e: Event) => {
		e.preventDefault()
		const walletService = new WalletServiceImpl()
		await walletService.initialize()
		const user = await walletService.connect()
		walletActions.mutate(user)
	}

	const disconnectWallet = async (e: Event) => {
		e.preventDefault()
		walletActions.mutate(undefined)

		const walletService = new WalletServiceImpl()
		await walletService.initialize()
		await walletService.disconnect()
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
