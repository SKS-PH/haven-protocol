import { Badge } from '.'
import { render, screen } from 'solid-testing-library'
import '@testing-library/jest-dom'

describe('Badge', () => {
	it('should render a button', () => {
		render(() => (
			<Badge>
				Hello
			</Badge>
		))
		const badge = screen.getByTestId('main')
		expect(badge).toBeInTheDocument()
	})
})
