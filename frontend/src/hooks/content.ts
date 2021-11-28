import {createEffect, createSignal} from 'solid-js'
import {Haven, Post, Work} from 'models'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import * as gen from 'mock-data/generators'

type UseHavenParams = {
	address: string
}

export const useHaven = (params: UseHavenParams) => {
	const [haven, setHaven] = createSignal<Haven>()

	createEffect(() => {
		setTimeout(async () => {
			setHaven(gen.haven({
				address: params.address
			}))
		}, 1000)
	})

	return [haven]
}

type UseHavenPostsParams = {
	address: string
}

export const useHavenPosts = (params: UseHavenPostsParams) => {
	const [posts, setPosts] = createSignal<Post[]>()

	createEffect(() => {
		setTimeout(async () => {
			const processedPostsPromise = gen.collection(12, gen.post, 'id').map(async p => {
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
			const [originalPost] = gen.collection(12, gen.post, 'id')
			const postVfile = await unified()
				.use(remarkParse)
				.use(remarkGfm)
				.use(remarkRehype)
				.use(rehypeStringify)
				.process(originalPost.content)

			const processedPostsPromise = originalPost.comments.map(async p => {
				const commentVfile = await unified()
					.use(remarkParse)
					.use(remarkGfm)
					.use(remarkRehype)
					.use(rehypeStringify)
					.process(p.content)

				return ({
					...p,
					content: commentVfile.toString(),
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
			const processedPostsPromise = gen.collection(12, gen.post, 'id').map(async p => {
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
			const processedWorks = gen.collection(12, gen.work, 'id').map(w => ({
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

type UseSingleWorkParams = {
	id: string
}

export const useHavenSingleWork = (params: UseSingleWorkParams) => {
	const [work, setWork] = createSignal<Work>()

	createEffect(() => {
		setTimeout(async () => {
			setWork(gen.work({
				id: params.id,
			}))
		}, 1000)
	})

	return [work]
}
