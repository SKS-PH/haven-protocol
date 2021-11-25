import Comment from 'models/Comment'
import Address from 'types/scalars/Address'

export default interface Post {
	id: string,
	createdAt: Date,
	post: string,
	title: string,
	attachments: unknown[],
	tags: string[],
	people: Address[],
	comments: Comment[],
	likesAddresses: Address[],
	tier: string,
	havenName: string,
	havenAddress: string,
}
