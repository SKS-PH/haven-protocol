import Moralis, {Maybe, MoralisStartParams, Wallet} from './types'

export default interface WalletService {
	initialize(): Promise<void>
	connect(): Promise<Maybe<Wallet>>
	getConnectedWallet(): Promise<Maybe<Wallet>>
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

	async connect(): Promise<Maybe<Wallet>> {
		if (!this.moralis) {
			return undefined
		}

		let user = this.moralis.User.current()
		if (!user) {
			user = await this.moralis.authenticate({ signingMessage: 'Log in using Moralis' })
		}
		return user
	}

	async getConnectedWallet(): Promise<Maybe<Wallet>> {
		if (!this.moralis) {
			return undefined
		}

		return this.moralis.User.current() ?? null
	}

	async disconnect(): Promise<void> {
		if (!this.moralis) {
			return
		}

		await this.moralis.User.logOut()
	}
}
