import {Logo} from 'components/molecules/Logo'
import {Icon} from 'components/molecules/Icon'
import {Button, ButtonVariant, LinkButton, SearchInput} from '@haven/web-components-solid'
import {Link} from 'solid-app-router'
import {Component, JSX, Show} from 'solid-js'
import {Wallet} from '@haven/solid-moralis'


type HeaderProps = {
	wallet?: Wallet | null,
	dropdown?: string,
	onLogout?: JSX.EventHandler<any, any>,
	onLogin?: JSX.EventHandler<any, any>,
}

export const Header: Component<HeaderProps> = (props) => {
	const ethAddress = () => {
		if (props.wallet) {
			return props.wallet.get('ethAddress')
		}
		return undefined
	}

	const displayEthAddress = () => {
		if (props.wallet) {
			const baseAddress = props.wallet.get('ethAddress')
			return `0x${baseAddress.slice(2, 6).toUpperCase()}...${baseAddress.slice(-4).toUpperCase()}`
		}
		return undefined
	}

	const connected = () => Boolean(props.wallet)

	const createHavenButtonVariant = () => connected() ? ButtonVariant.FILLED_INVERSE : ButtonVariant.OUTLINE

	return (
		<header
			className="h-header bg-header fixed top-0 left-0 w-full z-30"
			style={{
				'--color-bg-header': 'var(--color-negative-plus-3)',
			}}
		>
			<div className="absolute pointer-events-none bottom-0 left-0 w-full h-0.25 dark:opacity-25 opacity-10 bg-current" />
			<div className="container h-full box-border relative">
				<div className="flex justify-between items-center h-full">
					<div className="mr-4">
						<Link href="/" className="no-underline">
							<h1 className="sr-only">Haven</h1>
							<Logo />
						</Link>
					</div>
					<div className="mr-4">
						<form className="lg:w-120">
							<SearchInput name="q" placeholder="Search for havens, users..." block />
							<button className="sr-only">Search</button>
						</form>
					</div>
					<div>
						<div className="flex space-x-4">
							<div>
								<LinkButton
									type="submit"
									variant={createHavenButtonVariant()}
									component={Link}
									href="/create-haven"
								>
									<span>
										<span className="sr-only md:not-sr-only">Create Haven</span>
										<span className="md:hidden">
											<Icon name="plus" className="w-6" />
										</span>
									</span>
								</LinkButton>
							</div>
							<div>
								<Show
									when={connected()}
									fallback={
										<form
											onSubmit={props.onLogin}
										>
											<Button
												type="submit"
												variant={ButtonVariant.FILLED}
											>
												<span>
													<Icon name="wallet" className="w-6" />
												</span>
												<span className="sr-only md:not-sr-only">Connect</span>
											</Button>
										</form>
									}
								>
									<div className="relative">
										<LinkButton
											variant={ButtonVariant.OUTLINE}
											title={ethAddress()}
											href="?dropdown=wallet"
											component={Link}
										>
											<span className="block bg-primary text-fg-inverse w-8 h-8 flex items-center justify-center -ml-2 -mr-2 md:mr-0 rounded-full">
												<Icon name="wallet" className="w-6" />
											</span>
											<span className="sr-only md:not-sr-only normal-case">{displayEthAddress()}</span>
										</LinkButton>
										<Show
											when={props.dropdown === 'wallet'}
										>
											<div
												className="absolute top-full right-0"
											>
												<div className="bg-bg mt-3 rounded overflow-hidden">
													<form
														onSubmit={props.onLogout}
													>
														<button
															className="text-fg bg-bg border-0 px-4 py-0 h-12"
														>
															Disconnect
														</button>
													</form>
												</div>
											</div>
										</Show>
									</div>
								</Show>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
