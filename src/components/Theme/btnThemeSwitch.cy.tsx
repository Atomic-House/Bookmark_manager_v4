import React from 'react'
import ThemeSwitch from './btn'
import "@/app/globals.css"
describe('<ThemeSwitch />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ThemeSwitch />)
  })
})
