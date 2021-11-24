import {createEffect, createSignal} from 'solid-js'
import Post from 'models/Post'
import mockData from 'mock-data/haven-posts.json'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

export const usePosts = () => {
	const [posts, setPosts] = createSignal<Post[]>()

	createEffect(() => (
		setTimeout(async () => {
			const thePosts = (mockData as unknown as Post[])
			const processedPostsPromise = thePosts.map(async p => {
				const postVfile = await unified()
					.use(remarkParse)
					.use(remarkGfm)
					.use(remarkRehype)
					.use(rehypeStringify)
					.process(p.post)

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
