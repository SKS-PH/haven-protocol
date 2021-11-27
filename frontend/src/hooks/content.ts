import {createEffect, createSignal} from 'solid-js'
import {Post, Work} from 'models'
import havenPosts from 'mock-data/haven-posts'
import homePosts from 'mock-data/home-posts'
import havenWorks from 'mock-data/haven-works'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

type UseHavenPostsParams = {
	address: string
}

export const useHavenPosts = (params: UseHavenPostsParams) => {
	const [posts, setPosts] = createSignal<Post[]>()

	createEffect(() => {
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
					content: postVfile.toString(),
				})
			})
			const processedPosts = await Promise.all(processedPostsPromise)
			setPosts(
				processedPosts.map(p => ({
					...p,
					haven: {
						...p.haven,
						address: params.address,
					},
				}))
			)
		}, 1000)
	})

	return [posts]
}

type UseHavenSinglePostParams = {
	address: string
	id: string
}

export const useHavenSinglePost = (params: UseHavenSinglePostParams) => {
	const [post, setPost] = createSignal<Post>()

	createEffect(() => {
		setTimeout(async () => {
			const [originalPost] = havenPosts
			const postVfile = await unified()
				.use(remarkParse)
				.use(remarkGfm)
				.use(remarkRehype)
				.use(rehypeStringify)
				.process(originalPost.content)

			const processedPostsPromise = originalPost.comments.map(async p => {
				const postVfile = await unified()
					.use(remarkParse)
					.use(remarkGfm)
					.use(remarkRehype)
					.use(rehypeStringify)
					.process(p.content)

				return ({
					...p,
					content: postVfile.toString(),
				})
			})

			const processedComments = await Promise.all(processedPostsPromise)

			const processedPost: Post = {
				...originalPost,
				content: postVfile.toString(),
				haven: {
					...originalPost.haven,
					address: params.address,
				},
				comments: processedComments,
			}

			setPost(processedPost)
		}, 1000)
	})

	return [post]
}

type UseHomePostsParams = {
	userAddress?: string
}

export const useHomePosts = (params: UseHomePostsParams) => {
	const [posts, setPosts] = createSignal<Post[]>()

	createEffect(() => {
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
					content: postVfile.toString(),
				})
			})
			const processedPosts = await Promise.all(processedPostsPromise)
			setPosts(processedPosts)
		}, 1000)
	})

	return [posts]
}

type UseHavenWorksParams = {
	address: string
}

export const useHavenWorks = (params: UseHavenWorksParams) => {
	const [works, setWorks] = createSignal<Work[]>()

	createEffect(() => {
		setTimeout(() => {
			const processedWorks = havenWorks.map(w => ({
				...w,
				haven: {
					...w.haven,
					address: params.address,
				},
			}))

			setWorks(processedWorks)
		}, 1000)
	})

	return [works]
}
