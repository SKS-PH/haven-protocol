import fastify from 'fastify';
import ceramicService from "./services/ceramic/ceramic.js";
import commentsRoute from './features/comments/comments.js';
import postsRoute from './features/posts/posts.js';
const server = fastify({ logger: true });
await ceramicService.didSetup();
server.register(commentsRoute);
server.register(postsRoute);
// Start your server
server.listen(8080, async (err, address) => {
    if (err) {
        console.error(err);
    }
});
export default server;
