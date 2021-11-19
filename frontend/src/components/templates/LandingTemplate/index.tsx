import {Component} from 'solid-js'
import { HeroSection } from 'components/organisms/HeroSection'
import { RationaleSection } from 'components/organisms/RationaleSection'
import { CtaSection } from 'components/organisms/CtaSection'
import { Footer } from 'components/organisms/Footer'
import { Header } from 'widgets/Header'
import { Wallet } from '@haven/solid-moralis'

type LandingTemplateProps = {
	wallet?: Wallet | null,
}

export const LandingTemplate: Component<LandingTemplateProps> = (props) => {
	return (
		<>
			<Header />
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
