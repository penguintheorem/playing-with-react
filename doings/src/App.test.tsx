import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from './App'

describe.skip('App', () => {
  it('Properly renders the Header components passing the correct text', async () => {
    render(<App />)

    // TODO: Is this a test that makes sense?
    // If yes, how I can implement this test?
    const appTitle = await screen.findByTestId('app-title')

    expect(appTitle).toBeInTheDocument()
    expect(appTitle.tagName).toBe('H1')
    expect(appTitle).toHaveTextContent('Doings')
  })
})
