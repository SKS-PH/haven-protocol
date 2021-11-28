import ceramicService from "../../services/ceramic/ceramic.js";
import { TileDocument } from '@ceramicnetwork/stream-tile';
import { RouteShorthandOptions } from 'fastify'
import { 
  FastifyInstance, 
  FastifyPluginOptions, 
  FastifyPluginAsync 
} from 'fastify';
import fp from 'fastify-plugin';

// Declaration merging
declare module 'fastify' {
  export interface FastifyInstance {  }
}

interface CommentQS {}
interface CommentParams {
  havenId: string,
  postId: string,
  commentId: string
}
interface CommentHeaders {}
interface CommentBody {
  id: string,
  createdAt: string,
  userAddress: string,
  message: string,
  attachments: string[],
  people: string[],
  likesAddresses: string[]
}

interface LikeBody {
  userAddress: string
}

const comment: RouteShorthandOptions = {
  schema: {
    body: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        userAddress: { type: 'string' },
        message: { type: 'string' },
        attachments: { type: 'array', items: { type: 'string' } },
        people: { type: 'array', items: { type: 'string' } },
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

const commentsRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
  
  server.post<{
    Querystring: CommentQS;
    Params: CommentParams;
    Headers: CommentHeaders;
    Body: CommentBody | any;
  }>('/api/haven/:havenId/posts/:postId/comments', comment, async (request, reply) => {
    const doc = await TileDocument.create(ceramicService.instance, request.body, {
      controllers: [ceramicService.instance?.did?.id || ''],
      family: `${request.params.havenId}:${request.params.postId}:comments`,
    }, { pin: true });

    const havenPostComments = await TileDocument.deterministic(ceramicService.instance, {
      controllers: [ceramicService.instance?.did?.id || ''],
      family: `${request.params.havenId}:${request.params.postId}:comments`,
      tags: [`${request.params.havenId}:${request.params.postId}:comments`]
    });

    const streamId = doc.id.toString();

    let havenPostCommentsContent: any = havenPostComments.content

    let comments: any[] = []
    if (Array.isArray(havenPostCommentsContent.comments)) {
      comments = havenPostCommentsContent.comments
      comments.push(streamId)
    } else {
      comments = [streamId]
    }
    havenPostCommentsContent.comments = comments
    await havenPostComments.update(havenPostCommentsContent, undefined, { pin: true })
    reply.code(200).send({ streamId: streamId })
  })

  server.get<{
    Querystring: CommentQS;
    Params: CommentParams;
    Headers: CommentHeaders;
  }>('/api/haven/:havenId/posts/:postId/comments', async (request, reply) => {
    const doc = await TileDocument.deterministic(ceramicService.instance, {
      controllers: [ceramicService.instance?.did?.id || ''],
      family: `${request.params.havenId}:${request.params.postId}:comments`,
      tags: [`${request.params.havenId}:${request.params.postId}:comments`]
    }, {
      anchor: false, publish: false
    })

    let havenPostCommentsContent: any = doc.content

    let queries: any[] = []

    if (!havenPostCommentsContent.comments) {
      reply.code(200).send([])
      return
    }

    havenPostCommentsContent.comments.forEach((streamId: string) => {
      return queries.push({
        streamId: streamId
      })
    });

    const streamMap = await ceramicService.instance.multiQuery(queries)

    reply.code(200).send(havenPostCommentsContent.comments.map((streamId: string) => {
      return streamMap[streamId].content
    }))  
  })

  server.post<{
    Querystring: CommentQS;
    Params: CommentParams;
    Headers: CommentHeaders;
    Body: LikeBody | any;
  }>('/api/haven/:havenId/posts/:postId/comment/:commentId/like', like, async (request, reply) => {
    const doc = await TileDocument.load(ceramicService.instance, request.params.commentId);

    const content: CommentBody = doc.content as CommentBody
    let likesAddresses: string[] = []
    if (Array.isArray(content.likesAddresses)) {
      likesAddresses = content.likesAddresses
    }
    
    likesAddresses.push(request.body.userAddress)

    content.likesAddresses = likesAddresses
    doc.update(content, undefined, { pin: true })
    reply.code(200).send(true)
  })

};

export default fp(commentsRoute)