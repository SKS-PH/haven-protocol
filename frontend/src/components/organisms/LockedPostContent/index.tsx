import {Component} from 'solid-js'
import Post from 'models/Post'
import {Button, ButtonVariant} from '@haven/web-components-solid'
import {Icon} from '../../molecules/Icon'

type LockedPostContentProps = {
	tier: Post['tier'],
	title: Post['title'],
}

export const LockedPostContent: Component<LockedPostContentProps> = (props) => {
	return (
		<div className="pb-full md:pb-3/4 relative">
			<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
				<div className="text-center">
					<div>
						<Icon name="lock" className="w-16" />
					</div>
					<h2
						className="normal-case m-0 inline font-semibold"
					>
						{props.title}
					</h2>
					<div className="my-6">
						Pledge to unlock this content.
					</div>
					<div>
						<Button
							variant={ButtonVariant.FILLED}
						>
							{props.tier} - 50 $HVN
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
