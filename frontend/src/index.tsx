import { render } from 'solid-js/web'
import { Router } from 'solid-app-router'

import App from 'App'
import routes from 'routes'

import 'tailwindcss/components.css'
import 'tailwindcss/utilities.css'
import 'global.css'

const mountRoot = window.document.getElementById('root') as HTMLElement

render(
	() => (
		<Router>
			<App routes={routes} />
		</Router>
	),
	mountRoot
)
