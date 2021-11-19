import {Component, JSX} from 'solid-js'
import {Header} from 'components/organisms/Header'
import {Navigation} from 'components/organisms/Navigation'
import {Wallet} from '@haven/solid-moralis'

type UserLayoutProps = {
	wallet?: Wallet | null,
	dropdown?: string,
	onLogout?: JSX.EventHandler<any, any>,
	onLogin?: JSX.EventHandler<any, any>,
}

export const UserLayout: Component<UserLayoutProps> = (props) => {
	return (
		<div className="h-screen flex flex-col">
			<Header
				wallet={props.wallet}
				onLogin={props.onLogin}
				onLogout={props.onLogout}
				dropdown={props.dropdown}
			/>
			<Navigation />
			<main className="lg:pl-sidebar-lg xl:pl-sidebar-xl 2xl:pl-sidebar-2xl pt-header box-border min-h-screen">
				{props.children}
			</main>
		</div>
	)
}
