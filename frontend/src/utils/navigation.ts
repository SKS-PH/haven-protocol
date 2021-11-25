import {IconName} from 'components/molecules/Icon'

export enum NavigationItemId {
	HAVENS = 'havens',
	MARKETPLACE = 'marketplace',
	SETTINGS = 'settings',
}

type NavigationItem = {
	id: NavigationItemId,
	iconName: IconName,
	href: string,
	label: string,
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
	{
		iconName: 'home',
		href: '/my/home',
		label: 'Havens',
		id: NavigationItemId.HAVENS,
	},
	{
		iconName: 'marketplace',
		href: '/marketplace',
		label: 'Marketplace',
		id: NavigationItemId.MARKETPLACE,
	},
	{
		iconName: 'settings',
		href: '/my/settings',
		label: 'Settings',
		id: NavigationItemId.SETTINGS,
	},
]
