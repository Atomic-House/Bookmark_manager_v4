import React from 'react'
import SliderComponent from './Slider'
import "@/app/globals.css"
describe('<SliderComponent />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.viewport('macbook-16')
    cy.mount(<SliderComponent />)
  })
})
