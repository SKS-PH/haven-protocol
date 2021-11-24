import {Component} from 'solid-js'
import {UserLayout} from 'widgets/UserLayout'
import {HavenLayout, HavenSubsectionId} from 'components/organisms/HavenLayout'

export const HavenMarketplaceTemplate: Component = () => {
	return (
		<UserLayout>
			<HavenLayout
				id="a"
				activeSubsection={HavenSubsectionId.MARKETPLACE}
			>
				Marketplace
			</HavenLayout>
		</UserLayout>
	)
}
