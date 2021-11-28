import fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import {Ceramic} from '@ceramicnetwork/core'
import IPFS from 'ipfs-core'
import dagJose from 'dag-jose'
import { convert } from 'blockcodec-to-ipld-format'
import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import ThreeIdProvider from '3id-did-provider'
const dagJoseFormat = convert(dagJose)
import { randomBytes } from '@stablelib/random'
import { DID, DIDOptions } from 'dids'


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

await didSetup()

const server: FastifyInstance<
Server,
IncomingMessage,
ServerResponse
> = fastify({ logger: true })

interface PostQuerystring {}
interface PostParams {
	params?: string;
}
interface PostHeaders {}
interface PostBody {
	post?: object;
}

const post: RouteShorthandOptions = {
	schema: {
		body: {
			type: 'object',
			properties: {
				id: { type: 'string' },
				createdAt: { type: 'string', format: 'date' },
				post: { type: 'string' },
				title: { type: 'string' },
				attachments: { type: 'array', items: { type: 'string' } },
				tags: { type: 'array', items: { type: 'string' } },
				people: { type: 'array', items: { type: 'string' } },
				comments: { type: 'array', items: { type: 'string' } },
				likesAddresses: { type: 'array', items: { type: 'string' } },
			}
		}
	}
}

server.post<{
	Querystring: PostQuerystring;
	Params: PostParams;
	Headers: PostHeaders;
	Body: PostBody;
}>('/haven/:havenId/posts', post, (request, reply) => {
	console.log(request.body)
	console.log(request.params)
	posts.push(request.body)
	// should save to ceramic
	reply.code(200).send({ post: 'should save to ceramic' })
})


server.get<{
	Querystring: PostQuerystring;
	Params: PostParams;
	Headers: PostHeaders;
}>('/haven/:havenId/posts', (request, reply) => {
	// should come from ceramic
	reply.code(200).send(posts)
})

server.get<{
	Querystring: PostQuerystring;
	Params: PostParams;
	Headers: PostHeaders;
}>('/subscriptions', (request, reply) => {
	reply.code(200).send({ posts: 'should return array of havens' })
})


// Start your server
server.listen(8080, async (err, address) => {
	if (err) {
		console.error(err)
	}
})
