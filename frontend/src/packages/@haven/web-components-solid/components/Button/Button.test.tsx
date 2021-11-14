import { Button } from '.'
import { render, screen } from 'solid-testing-library'
import '@testing-library/jest-dom'

describe('Button', () => {
	it('should render a button', () => {
		render(() => (
			<Button>
		 		Hello
		 	</Button>
		))
		const button = screen.getByRole('button')
		expect(button).toBeInTheDocument()
	})
})
