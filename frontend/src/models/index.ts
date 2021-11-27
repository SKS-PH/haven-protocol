type Address = string

export interface Comment {
	id: string
	author: User
	message: string
	createdAt: Date
	likes: User[]
}

export interface Haven {
	name: string
	description: string
	address: Address
	owner: User
	tags: string[]
	subscribers: User[]
}

export interface Post {
	id: string,
	createdAt: Date,
	content: string,
	title: string,
	works: Work[],
	haven: Haven,
	tags: string[],
	comments: Comment[],
	likes: User[],
	tier: string,
}

export interface Subscription {
	subscriberAddress: Address
	havenAddress: Address
}

export interface User {
	subscriptions: Address[]
	nickname: string
}

export interface Work {
	name: string;
	description: string;
	url: string;
	havenAddress: string;
}