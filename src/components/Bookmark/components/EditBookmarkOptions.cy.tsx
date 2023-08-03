import React from 'react'
import EditBookmarkOptions from './EditBookmarkOptions'

describe('<EditBookmarkOptions />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<EditBookmarkOptions />)
  })
})