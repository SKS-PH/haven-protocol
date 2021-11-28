import {Ceramic} from '@ceramicnetwork/core'
import IPFS from 'ipfs-core'
import dagJoseDefault from 'dag-jose'
import {BlockCodec, convert} from 'blockcodec-to-ipld-format'
import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import ThreeIdProvider from '3id-did-provider'
import { randomBytes } from '@stablelib/random'
import { DID, DIDOptions } from 'dids'

type DagJoseDefaultExport = BlockCodec<unknown, unknown> & {
	default?: BlockCodec<unknown, unknown>,
}

const dagJoseModule = dagJoseDefault as unknown as DagJoseDefaultExport
const dagJose: DagJoseDefaultExport = dagJoseModule['default'] ?? dagJoseDefault
const dagJoseFormat = convert(dagJose as BlockCodec<unknown, unknown>)

const CERAMIC_API_URL = 'http://localhost:7007'

const ipfs = await IPFS.create({ ipld: { formats: [dagJoseFormat] } })

const ceramic = await Ceramic.create(ipfs)

type ThreeIdProviderDefaultExport = {
	default?: {
		create(...args: unknown[]): Promise<ThreeIdProvider>,
	}
	create(...args: unknown[]): Promise<ThreeIdProvider>,
}

const resolver = {
	...KeyDidResolver.getResolver(),
	...ThreeIdResolver.getResolver(ceramic),
}
const did = new DID({ resolver })
ceramic.did = did
const posts: any = []

const didSetup = async () => {
	const authId = 'myAuthenticationMethod' // a name of the auth method
	const authSecret = randomBytes(32)
	const getPermission = async (request: {
		type: string;
		origin?: string | null;
		payload: Record<string, any>;
	}) => {
		return request.payload.paths
	}

	const ThreeIdProviderModule = ThreeIdProvider as unknown as ThreeIdProviderDefaultExport
	const ThreeIdProviderClass: ThreeIdProviderDefaultExport = ThreeIdProviderModule['default'] ?? ThreeIdProvider
	const threeId = await ThreeIdProviderClass.create({
		authId: 'genesis',
		authSecret,
		getPermission,
		ceramic
	})

	const resolver: any = {
		...KeyDidResolver.getResolver(),
		...ThreeIdResolver.getResolver(ceramic)
	}
	const provider: any = threeId.getDidProvider()
	const did = new DID({ resolver })
	did.setProvider(provider)
	ceramic.did = did
	ceramic.did.authenticate()

}

const instance = ceramic

export default {
  didSetup,
  instance
}