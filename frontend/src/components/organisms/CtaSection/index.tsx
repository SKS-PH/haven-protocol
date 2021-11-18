import {Component, Show} from 'solid-js'
import {Button, ButtonVariant, LinkButton, SearchInput} from '@haven/web-components-solid'
import { Icon } from 'components/molecules/Icon'
import {Wallet} from 'types/Moralis'

type CtaSectionProps = {
	wallet?: Wallet
}

export const CtaSection: Component<CtaSectionProps> = (props) => {
	const connected = () => Boolean(props.wallet)

	return (
		<section>
			<div className="container mx-auto py-16 lg:flex items-center space-y-8 lg:space-y-0 lg:space-x-16 box-border text-center lg:text-left">
				<div className="flex-auto">
					<h3 className="font-light text-5xl mt-0">Sounds good?</h3>
					<p className="text-2xl m-0">Get started by exploring havens or creating your own.</p>
				</div>
				<div className="lg:w-96">
					<form>
						<SearchInput placeholder="Search for havens, users..." block />
					</form>
				</div>
				<div>or</div>
				<div>
					<Show
						when={connected()}
						fallback={
							<form>
								<Button block variant={ButtonVariant.FILLED_INVERSE}>
									<Icon name="wallet" className="h-8" />
									<span>Connect Wallet</span>
								</Button>
							</form>
						}
					>
						<LinkButton
							block
							variant={ButtonVariant.FILLED}
						>
							Create Haven
						</LinkButton>
					</Show>
				</div>
			</div>
		</section>
	)
}
