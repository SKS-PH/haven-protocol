import {Component, JSX} from 'solid-js'
import { HeroSection } from 'components/organisms/HeroSection'
import { RationaleSection } from 'components/organisms/RationaleSection'
import { CtaSection } from 'components/organisms/CtaSection'
import { Footer } from 'components/organisms/Footer'
import { Header } from 'components/organisms/Header'
import { Wallet } from 'types/Moralis'

type LandingTemplateProps = {
	wallet?: Wallet,
	searchParams?: URLSearchParams,
	onLogout?: JSX.EventHandler<any, any>,
	onLogin?: JSX.EventHandler<any, any>,
}

export const LandingTemplate: Component<LandingTemplateProps> = (props) => {
	const dropdown = () => props.searchParams?.get('dropdown') ?? undefined

	return (
		<>
			<Header
				wallet={props.wallet}
				dropdown={dropdown()}
				onLogout={props.onLogout}
				onLogin={props.onLogin}
			/>
			<main>
				<HeroSection
					wallet={props.wallet}
				/>
				<RationaleSection />
				<CtaSection
					wallet={props.wallet}
				/>
			</main>
			<Footer />
		</>
	)
}
