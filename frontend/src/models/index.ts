type Address = string

export interface Comment {
	id: string
	author: User
	content: string
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
	primaryImageUrl: string
	coverImageUrl: string
}

export interface Post {
	id: string
	createdAt: Date
	content: string
	title: string
	works: Work[]
	haven: Haven
	tags: string[]
	comments: Comment[]
	likes: User[]
	tier: string
}

export interface Subscription {
	subscriberAddress: Address
	havenAddress: Address
}

export interface User {
	address: Address
	subscriptions: Address[]
	nickname: string
	imageUrl: string
}

export interface Work {
	id: string
	title: string
	description: string
	url: string
	haven: Haven
	tier: string
	imageUrl: string
}
