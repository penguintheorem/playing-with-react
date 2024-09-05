import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from './App'

describe('App', () => {
  it('Properly renders the app title within an h1 element', async () => {
    render(<App />)

    const appTitle = await screen.findByTestId('app-title')

    expect(appTitle).toBeInTheDocument()
    expect(appTitle.tagName).toBe('H1')
    expect(appTitle).toHaveTextContent('Doings')
  })
})
