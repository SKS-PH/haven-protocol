import fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { CeramicClient } from '@ceramicnetwork/http-client'
import KeyDidResolver from '@ceramicnetwork/key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import ThreeIdProvider from '3id-did-provider'
import GetPermissionFn from '3id-did-provider'
import { randomBytes } from '@stablelib/random'
import { DID, DIDOptions, ResolverRegistry } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { TileDocument } from '@ceramicnetwork/stream-tile'

const CERAMIC_API_URL = 'http://localhost:7007'
const ceramic = new CeramicClient(CERAMIC_API_URL)

let posts: any = []

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

  const threeId = await ThreeIdProvider.create({ 
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

// didSetup()

const server: FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify({ logger: true });

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
  console.log(request.body);
  console.log(request.params);
  posts.push(request.body)
  // should save to ceramic
  reply.code(200).send({ post: 'should save to ceramic' });
});


server.get<{
  Querystring: PostQuerystring;
  Params: PostParams;
  Headers: PostHeaders;
}>('/haven/:havenId/posts', (request, reply) => {
  // should come from ceramic
  reply.code(200).send(posts);
});

server.get<{
  Querystring: PostQuerystring;
  Params: PostParams;
  Headers: PostHeaders;
}>('/subscriptions', (request, reply) => {
  reply.code(200).send({ posts: 'should return array of havens' });
});


// Start your server
server.listen(8080, async (err, address) => {
  if (err) {
    console.error(err);
  }
});