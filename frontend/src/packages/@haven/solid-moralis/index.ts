import {createResource, Resource} from 'solid-js'
import {Maybe, MoralisStartParams} from './types'
import type { Wallet } from './types'
import WalletService, {WalletServiceImpl} from './service'

type WalletActions = {
	connect(): Promise<void>,
	disconnect(): Promise<void>,
}

export const useMoralisWallet = (params: MoralisStartParams): [Resource<Maybe<Wallet>>, WalletActions] => {
	const [wallet, walletActions] = createResource<Maybe<Wallet>>(async () => {
		const walletService: WalletService = new WalletServiceImpl(params)
		await walletService.initialize()
		return walletService.getConnectedWallet()
	})

	const connect = async () => {
		const walletService: WalletService = new WalletServiceImpl(params)
		await walletService.initialize()
		const user = await walletService.connect()
		walletActions.mutate(user)
	}

	const disconnect = async () => {
		walletActions.mutate(null)

		const walletService: WalletService = new WalletServiceImpl(params)
		await walletService.initialize()
		await walletService.disconnect()
	}

	const actions = {
		connect,
		disconnect,
	}

	return [wallet, actions]
}

export { Wallet }
