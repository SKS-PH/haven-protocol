import { TextInput } from '.'
import { render, screen } from 'solid-testing-library'
import '@testing-library/jest-dom'

describe('TextInput', () => {
	it('should render a textbox', () => {
		render(() => (
			<TextInput />
		))
		const textbox = screen.getByRole('textbox')
		expect(textbox).toBeInTheDocument()
	})
})
