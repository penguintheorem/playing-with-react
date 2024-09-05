import { App } from './App'

/**
 * Test written just for the sake of testing e2e with React and Cypress
 */
describe('App', () => {
  it('Properly display the app title on the screen', () => {
    cy.mount(<App />)

    cy.getByTestId('app-title').contains('Doings')
  })
})
