import {Component, createEffect, createSignal, JSX, splitProps} from 'solid-js'
import {format} from 'timeago.js'

type TimeAgoProps = Omit<JSX.IntrinsicElements['time'], 'dateTime'> & {
	dateTime: Date;
	live?: boolean;
	updateInterval?: number
}

export const TimeAgo: Component<TimeAgoProps> = (props) => {
	const [localProps, etcProps] = splitProps(props, ['dateTime', 'live', 'updateInterval'])
	const [formatted, setFormatted] = createSignal(format(props.dateTime))

	createEffect(() => {
		if (!localProps.live) {
			return
		}

		setTimeout(() => {
			setFormatted((oldFormatted) => {
				const newFormatted = format(localProps.dateTime)

				if (oldFormatted === newFormatted) {
					return oldFormatted
				}

				return newFormatted
			})
		}, localProps.updateInterval)
	})

	return (
		<time
			{...etcProps}
			title={localProps.dateTime.toString()}
			dateTime={localProps.dateTime.toISOString()}
		>
			{formatted()}
		</time>
	)
}
