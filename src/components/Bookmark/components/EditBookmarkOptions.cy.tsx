import React from 'react'
import EditBookmarkOptions from './EditBookmarkOptions'
import "@/app/globals.css"
import ThemeProvider from '@/components/Theme/themeProvider'
import { FiEdit } from '@react-icons/all-files/fi/FiEdit'
describe('<EditBookmarkOptions />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <div>
        <ThemeProvider />
        <EditBookmarkOptions  trigger={<FiEdit/>}/>
      </div>
    )
  })
})
