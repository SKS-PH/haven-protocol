/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, unknown>> {
	readonly VITE_REPO_URL: string
	readonly VITE_FOUNDATION_URL: string
	readonly VITE_DEV_NAME: string
	readonly VITE_APP_NAME: string
	readonly VITE_APP_TAGLINE: string
	readonly VITE_APP_YEAR: string
	readonly VITE_MORALIS_SERVER_URL: string
	readonly VITE_MORALIS_APP_ID: string
}

interface HavenWindow extends Window {
	Moralis: unknown
}
