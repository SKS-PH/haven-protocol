import {Comment, Haven, Post, User, Work} from 'models'

export const collection = <T>(count: number, generator: (a: Partial<T>) => T, idAttr: string) => (
	new Array(count)
		.fill(null)
		.map((_, i) => generator({
			[idAttr]: i.toString(),
		} as unknown as Partial<T>))
)

type Generator<T> = (data?: Partial<T>) => T

const imageUrl = () => {
	const width = Math.floor(Math.random() * 100) + 500
	const height = Math.floor(Math.random() * 100) + 500
	return `https://source.unsplash.com/random/${width}x${height}`
}

export const user: Generator<User> = (data = {}) => {
	return {
		imageUrl: imageUrl(),
		address: 'cceeccee',
		nickname: 'TheoryOfNekomata',
		subscriptions: [],
		...data,
	}
}

export const haven: Generator<Haven> = (data = {}) => {
	return {
		name: 'Seventh Haven',
		tags: [],
		address: 'ffeeffee',
		description: 'Description',
		owner: user(),
		subscribers: [],
		primaryImageUrl: imageUrl(),
		coverImageUrl: imageUrl(),
		...data,
	}
}

export const comment: Generator<Comment> = (data = {}) => {
	return {
		id: '1',
		createdAt: new Date('2021-11-24T22:09:46.000Z'),
		likes: collection(5, user, 'address'),
		author: user(),
		content: 'Hello. Well, Marty, I\'m almost eighteen-years-old, it\'s not like I\'ve never parked before.\n\nWhoa, this is heavy. My equipment, that reminds me, Marty, you better not hook up to the amplifier. There\'s\n\t\t\t\t\t\t\ta slight possibility for overload. Cause, George, she wants to go to the dance with you, she just doesn\'t\n\t\t\t\t\t\t\tknow it yet. That\'s why we got to show her that you, George McFly, are a fighter. You\'re somebody who\'s\n\t\t\t\t\t\t\tgonna stand up for yourself, someone who\'s gonna protect her.',
		...data,
	}
}

export const post: Generator<Post> = (data = {}) => {
	return {
		id: '1',
		createdAt: new Date('2021-11-24T22:09:46.000Z'),
		content: `Hello folks, stay tuned for the album I'm uploading this month. I assure you, this new content is a real banger!

Share the word to your friends so they can listen to the hard work I've been making for these past few months.

Oh, and also for the Tier 2 subscribers and higher, hang on for a while because I will send extra merch to this haven. **More reasons** to get the higher tiers!`,
		title: 'I am releasing a new album this month',
		works: collection(2, work, 'id'),
		tags: ['album', 'release'],
		comments: collection(12, comment, 'id'),
		likes: collection(5, user, 'address'),
		tier: 'Tier 1',
		haven: haven(),
		...data,
	}
}

export const work: Generator<Work> = (data = {}) => {
	return {
		id: 'work',
		title: 'Rebirth',
		description: `Share the word to your friends so they can listen to the hard work I've been making for these past few months.

Oh, and also for the Tier 2 subscribers and higher, hang on for a while because I will send extra merch to this haven. **More reasons** to get the higher tiers!`,
		imageUrl: imageUrl(),
		haven: haven(),
		tier: 'Tier 1',
		url: 'https://localhost:8080',
		...data,
	}
}
