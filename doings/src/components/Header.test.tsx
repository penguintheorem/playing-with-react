import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Header } from './Header'

describe('Header', () => {
  it('Renders the text provided as prop', async () => {
    const text = 'This is a test'
    render(<Header text={'This is a test'} />)

    const appTitle = await screen.findByTestId('app-title')

    expect(appTitle).toBeInTheDocument()
    expect(appTitle.tagName).toBe('H1')
    expect(appTitle).toHaveTextContent(text)
  })
})
