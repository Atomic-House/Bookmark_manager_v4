import React from 'react'
import Icon from './Icon'
import "@/app/globals.css"
import { faker } from '@faker-js/faker'
describe('<Icon />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Icon url={'/la;sdjf/asj'} id='sljfdlsakj' icon={faker.internet.avatar()}/>)
  })
})
