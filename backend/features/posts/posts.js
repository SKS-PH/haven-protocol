import ceramicService from "../../services/ceramic/ceramic.js";
import { TileDocument } from '@ceramicnetwork/stream-tile';
import fp from 'fastify-plugin';
const post = {
    schema: {
        body: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
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
};
const like = {
    schema: {
        body: {
            type: 'object',
            properties: {
                userAddress: { type: 'string' }
            }
        }
    }
};
const postsRoute = async (server, options) => {
    server.post('/api/haven/:havenId/posts', post, async (request, reply) => {
        var _a, _b, _c, _d;
        const doc = await TileDocument.create(ceramicService.instance, request.body, {
            controllers: [((_b = (_a = ceramicService.instance) === null || _a === void 0 ? void 0 : _a.did) === null || _b === void 0 ? void 0 : _b.id) || ''],
            family: `${request.params.havenId}:posts`,
        }, { pin: true });
        const havenPosts = await TileDocument.deterministic(ceramicService.instance, {
            controllers: [((_d = (_c = ceramicService.instance) === null || _c === void 0 ? void 0 : _c.did) === null || _d === void 0 ? void 0 : _d.id) || ''],
            family: `${request.params.havenId}:posts`,
            tags: [`${request.params.havenId}:posts`]
        });
        const streamId = doc.id.toString();
        let havenPostsContent = havenPosts.content;
        let posts = [];
        if (Array.isArray(havenPostsContent.posts)) {
            posts = havenPostsContent.posts;
            posts.push(streamId);
        }
        else {
            posts = [streamId];
        }
        havenPostsContent.posts = posts;
        await havenPosts.update(havenPostsContent, undefined, { pin: true });
        reply.code(200).send({ streamId: streamId });
    });
    server.post('/api/haven/:havenId/posts/:postId/like', like, async (request, reply) => {
        const doc = await TileDocument.load(ceramicService.instance, request.params.postId);
        const content = doc.content;
        let likesAddresses = [];
        if (Array.isArray(content.likesAddresses)) {
            likesAddresses = content.likesAddresses;
        }
        likesAddresses.push(request.body.userAddress);
        content.likesAddresses = likesAddresses;
        doc.update(content, undefined, { pin: true });
        reply.code(200).send(true);
    });
    server.get('/api/haven/:havenId/posts', async (request, reply) => {
        var _a, _b;
        const doc = await TileDocument.deterministic(ceramicService.instance, {
            controllers: [((_b = (_a = ceramicService.instance) === null || _a === void 0 ? void 0 : _a.did) === null || _b === void 0 ? void 0 : _b.id) || ''],
            family: `${request.params.havenId}:posts`,
            tags: [`${request.params.havenId}:posts`]
        }, {
            anchor: false, publish: false
        });
        let havenPostsContent = doc.content;
        let queries = [];
        if (!havenPostsContent.posts) {
            reply.code(200).send([]);
            return;
        }
        havenPostsContent.posts.forEach((streamId) => {
            return queries.push({
                streamId: streamId
            });
        });
        const streamMap = await ceramicService.instance.multiQuery(queries);
        reply.code(200).send(havenPostsContent.posts.map((streamId) => {
            return streamMap[streamId].content;
        }));
    });
};
export default fp(postsRoute);
