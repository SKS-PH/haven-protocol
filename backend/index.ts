import fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import {Ceramic} from '@ceramicnetwork/core'
import IPFS from 'ipfs-core'
import dagJoseDefault from 'dag-jose'
import {BlockCodec, convert} from 'blockcodec-to-ipld-format'
import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import ThreeIdProvider from '3id-did-provider'
import { randomBytes } from '@stablelib/random'
import { DID, DIDOptions } from 'dids'
import { TileDocument } from '@ceramicnetwork/stream-tile';

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

await didSetup()

const server: FastifyInstance<
Server,
IncomingMessage,
ServerResponse
> = fastify({ logger: true })

interface PostQuerystring {}
interface PostParams {
	heavenId?: string;
}
interface PostHeaders {}
interface PostBody {}

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
	Body: PostBody|any;
}>('/haven/:havenId/posts', post, async (request, reply) => {
  const doc = await TileDocument.create(ceramic, request.body, {
      controllers: [ceramic?.did?.id||''],
      family: request.params.heavenId,
    },
    { pin: true }
  );

  const havenPosts = await TileDocument.deterministic(ceramic, {
    controllers: [ceramic?.did?.id||''],
    family: request.params.heavenId,
    tags: [request.params.heavenId||'']
  });

  const streamId = doc.id.toString();

  let havenPostsContent: any = havenPosts.content

  let posts: any[] = []
  if (Array.isArray(havenPostsContent.posts)) {
    posts = havenPostsContent.posts
    posts.push(streamId)
  } else {
    posts = [streamId]
  }
  havenPostsContent.posts = posts
  await havenPosts.update(havenPostsContent, undefined, { pin: true })
	reply.code(200).send({ streamId: streamId })
})


server.get<{
	Querystring: PostQuerystring;
	Params: PostParams;
	Headers: PostHeaders;
}>('/haven/:havenId/posts', async (request, reply) => {
	// should come from ceramic
  
  const doc = await TileDocument.deterministic(ceramic, {
    controllers: [ceramic?.did?.id||''],
    family: request.params.heavenId,
    tags: [request.params.heavenId||'']
  }, { 
    anchor: false, publish: false 
  })

  let havenPostsContent: any = doc.content

  let queries: any[] = []

  if (!havenPostsContent.posts) {
    reply.code(200).send([])
    return
  }

  havenPostsContent.posts.forEach((streamId: string) => {
    return queries.push({
      streamId: streamId
    })
  });

  const streamMap = await ceramic.multiQuery(queries)
  
	reply.code(200).send(havenPostsContent.posts.map((streamId: string) => {
    return streamMap[streamId].content
  }))
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
