import {Work} from 'models'

const havenWorks: Work[] = []

for (let i = 0; i < 24; i += 1) {
	const width = Math.floor(Math.random() * 100) + 500
	const height = Math.floor(Math.random() * 100) + 500
	havenWorks.push({
		id: 'work',
		name: 'Rebirth',
		description: 'My first album',
		imageUrl: `https://source.unsplash.com/random/${width}x${height}`,
		haven: {
			name: 'Seventh Haven',
			tags: [],
			address: 'ffeeffee',
			description: 'The haven next to the Sixth Haven',
			owner: {
				imageUrl: `https://source.unsplash.com/random/${width}x${height}`,
				address: 'ddeeddee',
				nickname: 'TheoryOfNekomata',
				subscriptions: [],
			},
			subscribers: [],
		},
		tier: 'Tier 1',
		url: 'https://localhost:8080',
	})
}

export default havenWorks
