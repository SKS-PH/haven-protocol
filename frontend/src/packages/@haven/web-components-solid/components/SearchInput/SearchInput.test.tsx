import { SearchInput } from '.'
import { render, screen } from 'solid-testing-library'
import '@testing-library/jest-dom'

describe('SearchInput', () => {
	it('should render a searchbox', () => {
		render(() => (
			<SearchInput />
		))
		const searchbox = screen.getByRole('searchbox')
		expect(searchbox).toBeInTheDocument()
	})
})
