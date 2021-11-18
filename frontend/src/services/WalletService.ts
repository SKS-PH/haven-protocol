import * as config from 'haven.config'
import Moralis, { Wallet } from 'types/Moralis'

export default interface WalletService {
	initialize(): Promise<void>
	connect(): Promise<Wallet | undefined>
	getConnectedWallet(): Promise<Wallet | undefined>
	disconnect(): Promise<void>
}

export class WalletServiceImpl implements WalletService {
	private readonly moralis: Moralis

	constructor() {
		this.moralis = (window as unknown as Record<string, unknown>).Moralis as Moralis
	}

	async initialize(): Promise<void> {
		await this.moralis.start({
			serverUrl: config.moralis.serverUrl,
			appId: config.moralis.appId,
		})
	}

	async connect(): Promise<Wallet | undefined> {
		let user = this.moralis.User.current()
		if (!user) {
			user = await this.moralis.authenticate({ signingMessage: 'Log in using Moralis' })
		}
		return user
	}

	async getConnectedWallet(): Promise<Wallet | undefined> {
		return this.moralis.User.current()
	}

	async disconnect(): Promise<void> {
		await this.moralis.User.logOut()
	}
}
