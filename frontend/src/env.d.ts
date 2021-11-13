/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
	readonly VITE_REPO_URL: string;
	readonly VITE_FOUNDATION_URL: string;
	readonly VITE_DEV_NAME: string;
	readonly VITE_APP_NAME: string;
	readonly VITE_APP_TAGLINE: string;
	readonly VITE_APP_YEAR: string;
}
