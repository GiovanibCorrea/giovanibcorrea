import React from 'react'
import { view } from 'react-easy-state'
import Main from './feat/Main'
import Header from './feat/Header'

export default view( () => {
  return (
      <div>
        <Header />
        <Main />
      </div>
  )
})
