import type { Component } from 'solid-js'
import {useRoutes, RouteDefinition} from 'solid-app-router'

type Props = {
	routes: RouteDefinition[],
}

const App: Component<Props> = (props) => {
	const Routes = useRoutes(props.routes)
	return (
		<>
			<Routes />
		</>
	)
}

export default App
