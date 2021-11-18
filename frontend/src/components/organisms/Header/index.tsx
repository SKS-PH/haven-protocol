import { Logo } from 'components/molecules/Logo'
import { Icon } from 'components/molecules/Icon'
import {SearchInput, ButtonVariant, Button, LinkButton} from '@haven/web-components-solid'
import { Link } from 'solid-app-router'
import {WalletServiceImpl} from 'services/WalletService'

const connectWallet = async (e: Event) => {
	e.preventDefault()
	const walletService = new WalletServiceImpl()
	await walletService.connect()
}

export const Header = () => {
	return (
		<header
			className="h-header bg-header fixed top-0 left-0 w-full z-20"
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
									variant={ButtonVariant.OUTLINE}
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
								<form
									onSubmit={connectWallet}
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
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
