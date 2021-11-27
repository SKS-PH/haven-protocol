import {createEffect, createSignal} from 'solid-js'
import {Post} from 'models'
import havenPosts from 'mock-data/haven-posts'
import homePosts from 'mock-data/home-posts'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

export const useHavenPosts = () => {
	const [posts, setPosts] = createSignal<Post[]>()

	createEffect(() => (
		setTimeout(async () => {
			const processedPostsPromise = havenPosts.map(async p => {
				const postVfile = await unified()
					.use(remarkParse)
					.use(remarkGfm)
					.use(remarkRehype)
					.use(rehypeStringify)
					.process(p.content)

				return ({
					...p,
					post: postVfile.toString(),
				})
			})
			const processedPosts = await Promise.all(processedPostsPromise)
			setPosts(processedPosts)
		}, 1000)
	))

	return [posts]
}

export const useHomePosts = () => {
	const [posts, setPosts] = createSignal<Post[]>()

	createEffect(() => (
		setTimeout(async () => {
			const processedPostsPromise = homePosts.map(async p => {
				const postVfile = await unified()
					.use(remarkParse)
					.use(remarkGfm)
					.use(remarkRehype)
					.use(rehypeStringify)
					.process(p.content)

				return ({
					...p,
					post: postVfile.toString(),
				})
			})
			const processedPosts = await Promise.all(processedPostsPromise)
			setPosts(processedPosts)
		}, 1000)
	))

	return [posts]
}
