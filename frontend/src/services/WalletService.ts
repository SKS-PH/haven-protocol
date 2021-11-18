// import { Moralis } from 'moralis'
// import * as config from 'haven.config'

export default interface WalletService {
	connect(): Promise<unknown>
	disconnect(): Promise<void>
}

export class WalletServiceImpl implements WalletService {
	async connect(): Promise<unknown> {
		// Moralis.start({
		// 	serverUrl: config.moralis.serverUrl,
		// 	appId: config.moralis.appId,
		// })

		// const user = Moralis.User.current()
		// if (!user) {
		// 	user = await Moralis.authenticate({ signingMessage: 'Log in using Moralis' })
		// }
		// return user

		return {}
	}

	async disconnect(): Promise<void> {
		// await Moralis.User.logOut()
	}
}
