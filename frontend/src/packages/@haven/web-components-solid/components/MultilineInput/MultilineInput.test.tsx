import { MultilineInput } from '.'
import { render, screen } from 'solid-testing-library'
import '@testing-library/jest-dom'

describe('MultilineInput', () => {
	it('should render a textbox', () => {
		render(() => (
			<MultilineInput />
		))
		const textbox = screen.getByRole('textbox')
		expect(textbox).toBeInTheDocument()
	})
})
