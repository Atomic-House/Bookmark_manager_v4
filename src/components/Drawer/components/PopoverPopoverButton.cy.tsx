import React from 'react'
import PopoverButton from './Popover'

describe('<PopoverButton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PopoverButton />)
  })
})