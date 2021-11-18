import Moralis, {MoralisStartParams, Wallet} from './types'

export default interface WalletService {
	initialize(): Promise<void>
	connect(): Promise<Wallet | undefined>
	getConnectedWallet(): Promise<Wallet | undefined>
	disconnect(): Promise<void>
}

export class WalletServiceImpl implements WalletService {
	private readonly moralis: Moralis

	constructor(private readonly params: MoralisStartParams) {
		this.moralis = (window as unknown as Record<string, unknown>).Moralis as Moralis
	}

	async initialize(): Promise<void> {
		await this.moralis.start({
			serverUrl: this.params.serverUrl,
			appId: this.params.appId,
		})
	}

	async connect(): Promise<Wallet | undefined> {
		if (!this.moralis) {
			return
		}

		let user = this.moralis.User.current()
		if (!user) {
			user = await this.moralis.authenticate({ signingMessage: 'Log in using Moralis' })
		}
		return user
	}

	async getConnectedWallet(): Promise<Wallet | undefined> {
		if (!this.moralis) {
			return undefined
		}

		return this.moralis.User.current()
	}

	async disconnect(): Promise<void> {
		if (!this.moralis) {
			return
		}

		await this.moralis.User.logOut()
	}
}
