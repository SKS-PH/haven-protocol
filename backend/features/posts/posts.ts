import ceramicService from "../../services/ceramic/ceramic.js";
import { TileDocument } from '@ceramicnetwork/stream-tile';
import { RouteShorthandOptions } from 'fastify'
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyPluginAsync
} from 'fastify';
import fp from 'fastify-plugin';
import ceramic from "../../services/ceramic/ceramic.js";

// Declaration merging
declare module 'fastify' {
  export interface FastifyInstance { }
}

interface PostQuerystring { }
interface PostParams {
  havenId: string,
  postId: string
}
interface PostHeaders { }
interface PostBody {
  id: string,
  createdAt: string,
  post: string,
  title: string,
  attachments: string[],
  tags: string[],
  people: string[],
  comments: string[],
  likesAddresses: string[]
}

interface LikeBody {
  userAddress: string
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

const like: RouteShorthandOptions = {
  schema: {
    body: {
      type: 'object',
      properties: {
        userAddress: { type: 'string' }
      }
    }
  }
}

const postsRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {

  server.post<{
    Querystring: PostQuerystring;
    Params: PostParams;
    Headers: PostHeaders;
    Body: PostBody | any;
  }>('/api/haven/:havenId/posts', post, async (request, reply) => {
    const doc = await TileDocument.create(ceramicService.instance, request.body, {
      controllers: [ceramicService.instance?.did?.id || ''],
      family: `${request.params.havenId}:posts`,
    },
      { pin: true }
    );

    const havenPosts = await TileDocument.deterministic(ceramicService.instance, {
      controllers: [ceramicService.instance?.did?.id || ''],
      family: `${request.params.havenId}:posts`,
      tags: [`${request.params.havenId}:posts`]
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

  
  server.post<{
    Querystring: PostQuerystring;
    Params: PostParams;
    Headers: PostHeaders;
    Body: LikeBody | any;
  }>('/api/haven/:havenId/posts/:postId/like', like, async (request, reply) => {
    const doc = await TileDocument.load(ceramicService.instance, request.params.postId);

    const content: PostBody = doc.content as PostBody
    let likesAddresses: string[] = []
    if (Array.isArray(content.likesAddresses)) {
      likesAddresses = content.likesAddresses
    }
    
    likesAddresses.push(request.body.userAddress)

    content.likesAddresses = likesAddresses
    doc.update(content, undefined, { pin: true })
    reply.code(200).send(true)
  })

  server.get<{
    Querystring: PostQuerystring;
    Params: PostParams;
    Headers: PostHeaders;
  }>('/api/haven/:havenId/posts', async (request, reply) => {
    const doc = await TileDocument.deterministic(ceramicService.instance, {
      controllers: [ceramicService.instance?.did?.id || ''],
      family: `${request.params.havenId}:posts`,
      tags: [`${request.params.havenId}:posts`]
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

    const streamMap = await ceramicService.instance.multiQuery(queries)

    reply.code(200).send(havenPostsContent.posts.map((streamId: string) => {
      return streamMap[streamId].content
    }))
  })
};

export default fp(postsRoute)