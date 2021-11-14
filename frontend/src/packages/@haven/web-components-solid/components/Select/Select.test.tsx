import { Select } from '.'
import { render, screen } from 'solid-testing-library'
import '@testing-library/jest-dom'

describe('Select', () => {
	it('should render a combobox', () => {
		render(() => (
			<Select />
		))
		const combobox = screen.getByRole('combobox')
		expect(combobox).toBeInTheDocument()
	})
})
