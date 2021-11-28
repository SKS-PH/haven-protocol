import fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import ceramicService from "./services/ceramic/ceramic.js"
import { TileDocument } from '@ceramicnetwork/stream-tile'
import commentsRoute from './features/comments/comments.js'
import postsRoute from './features/posts/posts.js'

const server: FastifyInstance<
Server,
IncomingMessage,
ServerResponse
> = fastify({ logger: true })

await ceramicService.didSetup()

server.register(commentsRoute)
server.register(postsRoute)

// Start your server
server.listen(8080, async (err, address) => {
	if (err) {
		console.error(err)
	}
})


export default server