import React from 'react'
import List from './index'
import "@/app/globals.css"
import { fakeBookmarks } from '@/functions/fakedata'
describe('<List />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<List bookmarks={fakeBookmarks(10)} name={"Social Media"} id='lasjfdlaskjf'/>)
  })
})


