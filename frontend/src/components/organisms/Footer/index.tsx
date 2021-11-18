import { Component } from 'solid-js'
import { Icon } from 'components/molecules/Icon'
import * as config from 'haven.config'

export const Footer: Component = () => {
	const yearDisplay = () => {
		const thisYear = new Date().getFullYear().toString()
		const appYear = config.meta.appYear.toString()
		return thisYear === appYear ? thisYear : `${appYear}-${thisYear}`
	}

	return (
		<footer className="bg-bg-inverse text-fg-inverse">
			<div className="container mx-auto py-16 box-border">
				<div className="text-center space-y-8">
					<div>
						<p className="font-light text-5xl lowercase m-0">{config.meta.appName}</p>
						<p className="text-2xl lowercase m-0">{config.meta.appTagline}</p>
					</div>
					<p>
						Copyright &copy; {config.meta.developerName} {yearDisplay()}
					</p>
					<div className="inline-flex space-x-4">
						<a href={config.meta.repoUrl}>
							<Icon name="github" className="w-6" />
						</a>{' '}
						<a href={config.meta.foundationUrl}>
							<Icon name="link" className="w-6" />
						</a>
					</div>
				</div>
			</div>
		</footer>
	)
}
