import { Component } from 'solid-js'
import { HeroSection } from 'components/organisms/HeroSection'
import { RationaleSection } from 'components/organisms/RationaleSection'
import { CtaSection } from 'components/organisms/CtaSection'
import { Footer } from 'components/organisms/Footer'
import { Header } from 'components/organisms/Header'

export const LandingTemplate: Component = () => {
	return (
		<>
			<Header />
			<main>
				<HeroSection />
				<RationaleSection />
				<CtaSection />
			</main>
			<Footer />
		</>
	)
}
