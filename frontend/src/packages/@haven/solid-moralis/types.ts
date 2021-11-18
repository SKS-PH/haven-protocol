export interface MoralisStartParams {
	serverUrl?: string,
	appId?: string,
}

export interface MoralisAuthenticateParams {
	signingMessage: string
}

export interface Wallet {
	get(param: string): string
}

export default interface Moralis {
	start(params: MoralisStartParams): Promise<unknown>
	authenticate(params: MoralisAuthenticateParams): Promise<Wallet | undefined>
	User: {
		current(): Wallet | undefined
		logOut(): Promise<unknown>
	}
}
