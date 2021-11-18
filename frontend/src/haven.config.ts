export namespace meta {
	export const repoUrl = import.meta.env.VITE_REPO_URL
	export const foundationUrl = import.meta.env.VITE_FOUNDATION_URL
	export const developerName = import.meta.env.VITE_DEV_NAME
	export const appName = import.meta.env.VITE_APP_NAME
	export const appTagline = import.meta.env.VITE_APP_TAGLINE
	export const appYear = import.meta.env.VITE_APP_YEAR
}

export namespace moralis {
	export const serverUrl = import.meta.env.VITE_MORALIS_SERVER_URL
	export const appId = import.meta.env.VITE_MORALIS_APP_ID
}
