import ceramicService from "../../services/ceramic/ceramic.js";
import { TileDocument } from '@ceramicnetwork/stream-tile';
import fp from 'fastify-plugin';
const comment = {
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
const commentsRoute = async (server, options) => {
    server.post('/api/haven/:havenId/posts/:postId/comments', comment, async (request, reply) => {
        var _a, _b, _c, _d;
        const doc = await TileDocument.create(ceramicService.instance, request.body, {
            controllers: [((_b = (_a = ceramicService.instance) === null || _a === void 0 ? void 0 : _a.did) === null || _b === void 0 ? void 0 : _b.id) || ''],
            family: `${request.params.havenId}:${request.params.postId}:comments`,
        }, { pin: true });
        const havenPostComments = await TileDocument.deterministic(ceramicService.instance, {
            controllers: [((_d = (_c = ceramicService.instance) === null || _c === void 0 ? void 0 : _c.did) === null || _d === void 0 ? void 0 : _d.id) || ''],
            family: `${request.params.havenId}:${request.params.postId}:comments`,
            tags: [`${request.params.havenId}:${request.params.postId}:comments`]
        });
        const streamId = doc.id.toString();
        let havenPostCommentsContent = havenPostComments.content;
        let comments = [];
        if (Array.isArray(havenPostCommentsContent.comments)) {
            comments = havenPostCommentsContent.comments;
            comments.push(streamId);
        }
        else {
            comments = [streamId];
        }
        havenPostCommentsContent.comments = comments;
        await havenPostComments.update(havenPostCommentsContent, undefined, { pin: true });
        reply.code(200).send({ streamId: streamId });
    });
    server.get('/api/haven/:havenId/posts/:postId/comments', async (request, reply) => {
        var _a, _b;
        const doc = await TileDocument.deterministic(ceramicService.instance, {
            controllers: [((_b = (_a = ceramicService.instance) === null || _a === void 0 ? void 0 : _a.did) === null || _b === void 0 ? void 0 : _b.id) || ''],
            family: `${request.params.havenId}:${request.params.postId}:comments`,
            tags: [`${request.params.havenId}:${request.params.postId}:comments`]
        }, {
            anchor: false, publish: false
        });
        let havenPostCommentsContent = doc.content;
        let queries = [];
        if (!havenPostCommentsContent.comments) {
            reply.code(200).send([]);
            return;
        }
        havenPostCommentsContent.comments.forEach((streamId) => {
            return queries.push({
                streamId: streamId
            });
        });
        const streamMap = await ceramicService.instance.multiQuery(queries);
        reply.code(200).send(havenPostCommentsContent.comments.map((streamId) => {
            return streamMap[streamId].content;
        }));
    });
    server.post('/api/haven/:havenId/posts/:postId/comment/:commentId/like', like, async (request, reply) => {
        const doc = await TileDocument.load(ceramicService.instance, request.params.commentId);
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
};
export default fp(commentsRoute);
