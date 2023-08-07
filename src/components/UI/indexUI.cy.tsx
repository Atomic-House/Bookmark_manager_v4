import React from 'react'
import UI from './index'
import "@/app/globals.css"
describe('<UI />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<UI />)
  })
})
