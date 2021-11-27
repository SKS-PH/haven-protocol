import {Component} from 'solid-js'
import {UserLayout} from 'widgets/UserLayout'
import {HavenLayout, HavenSubsectionId} from 'components/organisms/HavenLayout'
import {Wallet} from '@haven/solid-moralis'

type HavenMarketplaceTemplateProps = {
	wallet?: Wallet | null,
}

export const HavenMarketplaceTemplate: Component<HavenMarketplaceTemplateProps> = (props) => {
	return (
		<UserLayout
			wallet={props.wallet}
		>
			<HavenLayout
				id="a"
				activeSubsection={HavenSubsectionId.MARKETPLACE}
			>
				Marketplace
			</HavenLayout>
		</UserLayout>
	)
}
