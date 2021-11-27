import {Post} from 'models'

const havenPosts: Post[] = []

for (let i = 0; i < 12; i += 1) {
	havenPosts.push({
		id: i.toString(),
		createdAt: new Date('2021-11-24T22:09:46.000Z'),
		content: 'Hello. Well, Marty, I\'m almost eighteen-years-old, it\'s not like I\'ve never parked before.\n\nWhoa, this is heavy. My equipment, that reminds me, Marty, you better not hook up to the amplifier. There\'s\n\t\t\t\t\t\t\ta slight possibility for overload. Cause, George, she wants to go to the dance with you, she just doesn\'t\n\t\t\t\t\t\t\tknow it yet. That\'s why we got to show her that you, George McFly, are a fighter. You\'re somebody who\'s\n\t\t\t\t\t\t\tgonna stand up for yourself, someone who\'s gonna protect her.',
		title: 'I am releasing a new album this month',
		works: [],
		tags: ['album', 'release'],
		comments: [],
		likes: [],
		tier: 'Tier 1',
		haven: {
			name: 'Seventh Haven',
			tags: [],
			address: 'ffeeffee',
			description: 'Description',
			owner: {
				address: 'ddeeddee',
				subscriptions: [],
				nickname: 'TheoryOfNekomata',
			},
			subscribers: [],
		}
	})
}

export default havenPosts
