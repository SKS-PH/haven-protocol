import fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

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

const opts: RouteShorthandOptions = {
  schema: {
    body: {
      type: 'object',
      properties: {
        pong: {
          type: 'string'
        }
      }
    }
  }
};

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
}>('/posts', post, (request, reply) => {
  console.log(request.body);
  reply.code(200).send({ post: 'should save to db' });
});


server.get<{
  Querystring: PostQuerystring;
  Params: PostParams;
  Headers: PostHeaders;
}>('/posts', (request, reply) => {
  reply.code(200).send({ posts: 'should return array of posts' });

});

// Start your server
server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
  }
});